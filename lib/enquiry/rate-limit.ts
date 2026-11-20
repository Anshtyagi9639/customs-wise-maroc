/**
 * Simple fixed-window rate limit: 5 enquiries per 10 minutes per IP.
 *
 * In-memory, so it applies per server instance (on Vercel each warm function
 * instance keeps its own counter). It is a spam brake, not a security control.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 5;
const hits = new Map<string, { count: number; start: number }>();

export function isRateLimited(key: string, now = Date.now()) {
  // Opportunistic cleanup so the map cannot grow without bound
  if (hits.size > 1000) {
    for (const [k, v] of hits) if (now - v.start > WINDOW_MS) hits.delete(k);
  }
  const entry = hits.get(key);
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(key, { count: 1, start: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX;
}
