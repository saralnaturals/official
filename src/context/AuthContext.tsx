"use client";

import React from 'react';
import { useState, useEffect, useCallback } from 'react';

type User = { email: string; role?: string } | null;

type AuthContextShape = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  refresh: () => Promise<User>;
};

const AuthContext = React.createContext<AuthContextShape | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const persist = useCallback((u: User) => {
    try {
      if (u) localStorage.setItem('sn_user', JSON.stringify(u)); else localStorage.removeItem('sn_user');
    } catch {
      /* ignore */
    }
  }, []);

  const refresh = useCallback(async (): Promise<User | null> => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (!res.ok) return null;
      const d = await res.json();
      if (d.user) {
        setUser(d.user);
        persist(d.user);
        return d.user;
      }
      setUser(null);
      persist(null);
      return null;
    } catch {
      setUser(null);
      persist(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [persist]);

  useEffect(() => {
    // hydrate from localStorage first for instant UI, then verify with server
    try {
      const raw = localStorage.getItem('sn_user');
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    // verify server side
    refresh();
  }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }), headers: { 'Content-Type': 'application/json' }, credentials: 'include' });
    if (!res.ok) throw new Error('Login failed');
    const me = await fetch('/api/auth/me', { credentials: 'include' });
    const d = await me.json();
    if (d.user) {
      setUser(d.user);
      persist(d.user);
      return d.user;
    }
    setUser(null);
    persist(null);
    return null;
  }, [persist]);

  const logout = useCallback(async () => {
    try {
      const csrf = document.cookie.split('sn_csrf=')[1]?.split(';')[0];
      await fetch('/api/auth/logout', { method: 'POST', headers: { 'x-csrf-token': csrf || '' } });
    } catch {
      /* ignore */
    }
    setUser(null);
    persist(null as unknown as User);
  }, [persist]);

  const value = React.useMemo(() => ({ user, loading, login, logout, refresh }), [user, loading, login, logout, refresh]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
