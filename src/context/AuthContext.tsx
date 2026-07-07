import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { authRequest, fetchCurrentUser, type AuthUser } from "@/lib/auth-api";

const TOKEN_KEY = "alibarbar-auth-token";

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(readToken);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(readToken()));

  const persistToken = useCallback((next: string | null) => {
    setToken(next);
    try {
      if (next) window.localStorage.setItem(TOKEN_KEY, next);
      else window.localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchCurrentUser(token)
      .then((next) => {
        if (cancelled) return;
        if (next) {
          setUser(next);
        } else {
          setUser(null);
          persistToken(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [token, persistToken]);

  const login = useCallback(
    async (email: string, password: string) => {
      const { token: next, user: nextUser } = await authRequest("login", { email, password });
      setUser(nextUser);
      persistToken(next);
    },
    [persistToken],
  );

  const register = useCallback(
    async (email: string, password: string, displayName: string) => {
      const { token: next, user: nextUser } = await authRequest("register", { email, password, displayName });
      setUser(nextUser);
      persistToken(next);
    },
    [persistToken],
  );

  const logout = useCallback(() => {
    setUser(null);
    persistToken(null);
  }, [persistToken]);

  const value = useMemo(
    () => ({ user, token, loading, login, register, logout }),
    [user, token, loading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
