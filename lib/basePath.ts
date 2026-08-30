// Prepends "/portfolio" to a root-relative public asset path when running
// in production (i.e. the deployed GitHub Pages build), and leaves the
// path untouched during local development.
//
// Needed because next/image's `unoptimized: true` mode bypasses Next's
// normal loader, which is what would otherwise auto-prefix basePath.
// Use this for any raw string path pointing at a file in /public --
// next/image src props, <a href> links to PDFs, etc.
//
// Hardcoded (rather than derived from GITHUB_REPOSITORY) because the
// NEXT_PUBLIC_BASE_PATH env-inlining approach proved unreliable on the
// GitHub Actions Linux runner despite matching local builds exactly.
// NODE_ENV is a core Next.js/webpack value that's always correctly set,
// making this the more robust choice.
export function withBasePath(path: string): string {
  const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";
  return `${basePath}${path}`;
}