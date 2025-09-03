export function isEmail(v: any) {
  return typeof v === 'string' && /\S+@\S+\.\S+/.test(v);
}

export function isNonEmptyString(v: any) {
  return typeof v === 'string' && v.trim().length > 0;
}

export function isNumberLike(v: any) {
  return v === null || v === undefined || typeof v === 'number' || (!isNaN(Number(v)));
}

// Basic CSRF: expect a header x-csrf-token to match a value stored in cookie 'sn_csrf'
export function validateCsrf(req: Request) {
  try {
    const cookie = req.headers.get('cookie') || '';
    const cookieToken = cookie.split('sn_csrf=')[1]?.split(';')[0];
    const header = req.headers.get('x-csrf-token');
    return !!cookieToken && header === cookieToken;
  } catch (e) {
    return false;
  }
}
