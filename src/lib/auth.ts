import { verifyToken } from './jwt';

export function extractTokenFromRequest(req: Request): string | null {
  const cookieHeader = req.headers.get('cookie') || '';
  const tokenFromCookie = cookieHeader.split('sn_token=')[1]?.split(';')[0] || null;
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization') || '';
  const tokenFromHeader = authHeader && authHeader.toLowerCase().startsWith('bearer ') ? authHeader.slice(7).trim() : null;

  // DEV-only: allow ?token=... or x-test-token header to ease local testing without cookies
  if (process.env.NODE_ENV !== 'production') {
    try {
      const url = new URL(req.url);
      const tokenFromQuery = url.searchParams.get('token');
      const testHeader = req.headers.get('x-test-token');
      return tokenFromQuery || testHeader || tokenFromHeader || tokenFromCookie;
    } catch (e) {
      return tokenFromHeader || tokenFromCookie;
    }
  }

  return tokenFromHeader || tokenFromCookie;
}

export function getTokenPayload(req: Request): any | null {
  const token = extractTokenFromRequest(req);
  if (!token) return null;
  return verifyToken(token);
}
