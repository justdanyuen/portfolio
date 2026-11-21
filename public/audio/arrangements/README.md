Demo recordings for the Music page's arrangements list go here.

1. Add an audio file, e.g. public/audio/arrangements/merry-christmas-darling.mp3
   - .mp3 (or .m4a) plays in every browser; keep files small (128–192 kbps is plenty)
   - use lowercase-with-dashes filenames
2. In app/music/content.ts, set `demo` on that arrangement:
     demo: "/audio/arrangements/merry-christmas-darling.mp3",
3. A play button appears next to it on the Music page.

Keep original .wav masters out of here or they stay local only: .wav files under
public/audio/ are in .gitignore (GitHub rejects files over 100 MB).
