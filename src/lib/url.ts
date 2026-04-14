const base = import.meta.env.BASE_URL;

/** Prefix an app-relative path with the configured site base. */
export function path(p: string): string {
  if (!p.startsWith('/')) return p;
  if (p === '/') return base;
  return base.replace(/\/$/, '') + p;
}
