const store = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(ip: string, limit = 30, windowMs = 60 * 1000) {
  const now = Date.now();
  const entry = store.get(ip) || { count: 0, resetAt: now + windowMs };
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + windowMs;
  }
  entry.count += 1;
  store.set(ip, entry);
  const remaining = Math.max(0, limit - entry.count);
  const resetAfter = Math.max(0, Math.ceil((entry.resetAt - now) / 1000));
  return { allowed: entry.count <= limit, remaining, resetAfter };
}
