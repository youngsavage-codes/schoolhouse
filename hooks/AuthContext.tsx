import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import {
  clearAccessToken,
  getAccessToken,
  getRefreshToken,
  isTokenExpired,
  refreshAccessToken,
  setAccessToken,
  setRefreshToken,
} from '@/lib/tokenManager';

import { useFetch } from './useFetch';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  email: string;
  role: 'admin' | 'teacher' | 'parent';
  isActive: boolean;
  isEmailVerified: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type LoginPayload = {
  user: User | null;
  access_token: string;
  refresh_token: string;
};

interface AuthContextType {
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (data: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [refreshToken, setRefreshTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!accessToken;

  /* =========================================================
     FETCH PROFILE
  ========================================================= */
  const { data: profile } = useFetch({
    url: '/profile',
    keys: ['profile'],
    options: {
      enabled: !!accessToken,
    },
  });

  /* set profile safely */
  useEffect(() => {
    if (profile) {
      setUser(profile);
    }
  }, [profile]);

  /* =========================================================
     INIT AUTH
  ========================================================= */
  useEffect(() => {
    initAuth();
  }, []);

  const initAuth = async () => {
    try {
      setIsLoading(true);

      const [storedAccess, storedRefresh] = await Promise.all([
        getAccessToken(),
        getRefreshToken(),
      ]);

      if (!storedAccess) {
        setIsLoading(false);
        return;
      }

      let tokenToUse = storedAccess;

      if (isTokenExpired(storedAccess)) {
          await logout();
          return;
      }

      setAccessTokenState(tokenToUse);
      setRefreshTokenState(storedRefresh);
    } catch (err) {
      console.log('Auth init error:', err);
      await logout();
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================================================
     LOGIN
  ========================================================= */
  const login = async ({ user, access_token, refresh_token }: LoginPayload) => {
    await setAccessToken(access_token);
    await setRefreshToken(refresh_token);

    setAccessTokenState(access_token);
    setRefreshTokenState(refresh_token);

    if (user) setUser(user);
  };

  /* =========================================================
     LOGOUT
  ========================================================= */
  const logout = async () => {
    setUser(null);
    setAccessTokenState(null);
    setRefreshTokenState(null);
    await clearAccessToken();
  };

  /* =========================================================
     UPDATE USER
  ========================================================= */
  const updateUser = (data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : prev));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        access_token: accessToken,
        refresh_token: refreshToken,
        isAuthenticated,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};