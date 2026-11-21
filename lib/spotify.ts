// Build-time Spotify helpers. The site is a static export, so these run during
// `next build` (and on each request in `npm run dev`); the result is baked
// into the HTML. No API keys needed:
//   1. the playlist's public embed page lists its tracks (title, artist, uri)
//   2. Spotify's oEmbed endpoint gives each track's cover art
// The embed page is not an official API, so everything fails soft: on any
// error this returns [] and the page falls back to the plain playlist link.

export type PlaylistTrack = {
  title: string;
  artist: string;
  url: string;
  cover: string;
};

type EmbedTrack = { uri: string; title: string; subtitle: string };

const USER_AGENT = "Mozilla/5.0 (portfolio build)";

async function getTrackList(playlistId: string): Promise<EmbedTrack[]> {
  const res = await fetch(`https://open.spotify.com/embed/playlist/${playlistId}`, {
    headers: { "User-Agent": USER_AGENT },
  });
  if (!res.ok) throw new Error(`playlist embed ${res.status}`);
  const html = await res.text();
  const json = html.match(
    /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/
  )?.[1];
  if (!json) throw new Error("playlist embed: no data");
  const tracks = JSON.parse(json)?.props?.pageProps?.state?.data?.entity?.trackList;
  if (!Array.isArray(tracks)) throw new Error("playlist embed: no trackList");
  return tracks.filter((t: EmbedTrack) => t?.uri?.startsWith("spotify:track:"));
}

async function getCover(trackUrl: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://open.spotify.com/oembed?url=${encodeURIComponent(trackUrl)}`,
      { headers: { "User-Agent": USER_AGENT } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.thumbnail_url === "string" ? data.thumbnail_url : null;
  } catch {
    return null;
  }
}

export async function getPlaylistTracks(playlistId: string): Promise<PlaylistTrack[]> {
  try {
    const list = await getTrackList(playlistId);
    const tracks = await Promise.all(
      list.map(async (t) => {
        const url = `https://open.spotify.com/track/${t.uri.split(":").pop()}`;
        const cover = await getCover(url);
        return cover ? { title: t.title, artist: t.subtitle, url, cover } : null;
      })
    );

    // One tile per album: several songs from the same record share a cover
    const seen = new Set<string>();
    return tracks.filter((t): t is PlaylistTrack => {
      if (!t || seen.has(t.cover)) return false;
      seen.add(t.cover);
      return true;
    });
  } catch (err) {
    console.warn("[spotify] playlist covers unavailable:", (err as Error).message);
    return [];
  }
}
