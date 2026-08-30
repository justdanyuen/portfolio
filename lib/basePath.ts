// Prepends the deployment's basePath (e.g. "/portfolio" on GitHub Pages,
// empty string locally) to a root-relative public asset path.
//
// Needed because next/image's `unoptimized: true` mode bypasses Next's
// normal loader, which is what would otherwise auto-prefix basePath.
// Use this for any raw string path pointing at a file in /public --
// next/image src props, <a href> links to PDFs, etc.
export function withBasePath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${basePath}${path}`;
}
