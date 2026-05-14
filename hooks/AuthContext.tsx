import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
  } from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  type User = {
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
  
  interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  
    login: (data: { user: User; token: string }) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (data: Partial<User>) => void;
  }
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  const USER_KEY = 'auth_user';
  const TOKEN_KEY = 'auth_token';
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
  
    const isAuthenticated = !!user && !!token;
  
    // ✅ Load from storage on app start
    useEffect(() => {
      const loadAuth = async () => {
        try {
          const storedUser = await AsyncStorage.getItem(USER_KEY);
          const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
  
          if (storedUser) setUser(JSON.parse(storedUser));
          if (storedToken) setToken(storedToken);
        } catch (err) {
          console.log('Auth load error:', err);
        } finally {
          setIsLoading(false);
        }
      };
  
      loadAuth();
    }, []);
  
    // ✅ LOGIN
    const login = async (data: { user: User; token: string }) => {
      setUser(data.user);
      setToken(data.token);
  
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.user));
      await AsyncStorage.setItem(TOKEN_KEY, data.token);
    };
  
    // ✅ LOGOUT
    const logout = async () => {
      setUser(null);
      setToken(null);
  
      await AsyncStorage.removeItem(USER_KEY);
      await AsyncStorage.removeItem(TOKEN_KEY);
    };
  
    // ✅ UPDATE USER
    const updateUser = async (data: Partial<User>) => {
      setUser((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, ...data };
        AsyncStorage.setItem(USER_KEY, JSON.stringify(updated));
        return updated;
      });
    };
  
    return (
      <AuthContext.Provider
        value={{
          user,
          token,
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
  
  // ✅ Hook
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used inside AuthProvider');
    }
    return context;
  };