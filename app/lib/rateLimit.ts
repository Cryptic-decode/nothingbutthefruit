import type { NextRequest } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitOptions {
  key: string;
  scope: string;
  maxRequests?: number;
  windowMs?: number;
}

const entries = new Map<string, RateLimitEntry>();
const DEFAULT_WINDOW_MS = 15 * 60 * 1000;
const DEFAULT_MAX_REQUESTS = 3;

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0]?.trim() || realIp || 'unknown';
}

export function isRateLimited({
  key,
  scope,
  maxRequests = DEFAULT_MAX_REQUESTS,
  windowMs = DEFAULT_WINDOW_MS,
}: RateLimitOptions): boolean {
  const now = Date.now();
  const entryKey = `${scope}:${key}`;
  const entry = entries.get(entryKey);

  if (!entry || now > entry.resetTime) {
    entries.set(entryKey, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (entry.count >= maxRequests) return true;

  entry.count += 1;
  return false;
}
