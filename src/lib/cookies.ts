export function cookieOptionsForToken(isHttpOnly = true) {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: isHttpOnly,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax' as const,
    secure: isProd,
  };
}

export function clearCookieOptions() {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    sameSite: 'lax' as const,
    secure: isProd,
  };
}
