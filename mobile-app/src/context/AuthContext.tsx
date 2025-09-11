import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { api, setAuthToken } from '../services/api';

export type User = { id: string; name: string; email: string } | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  signIn: async () => {},
  signOut: async () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = await SecureStore.getItemAsync('token');
        if (token) {
          setAuthToken(token);
          const me = await api.get('/auth/me');
          setUser(me.data?.user ?? me.data ?? null);
        }
      } catch {
        // silencioso
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signIn = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    const { token, user: u } = res.data;
    setAuthToken(token);
    await SecureStore.setItemAsync('token', token);
    setUser(u);
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('token');
    setAuthToken(undefined);
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, signIn, signOut }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
