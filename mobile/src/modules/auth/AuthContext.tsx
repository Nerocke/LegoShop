import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { API_BASE_URL } from "../../config/env";

type User = {
  id: number;
  login: string;
  role: "admin" | "user";
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => Promise<void>;
  login: (login: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: async () => {},
  login: async () => {},
  logout: async () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const setToken = async (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      await SecureStore.setItemAsync("token", newToken);
    } else {
      await SecureStore.deleteItemAsync("token");
    }
  };

  const login = async (login: string, password: string) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      login,
      password,
    });

    const token = res.data.token;
    const user = res.data.user;

    
    if (user.role !== "admin") {
      throw new Error("Accès réservé aux administrateurs.");
    }

    await setToken(token);
    setUser(user);
  } catch (error: any) {
    console.error("❌ Login failed:", error?.response?.data || error.message);
    throw new Error(
      error.message === "Accès réservé aux administrateurs."
        ? error.message
        : "Login échoué. Vérifie le login ou le mot de passe."
    );
  }
};

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    setTokenState(null);
    setUser(null);
  };

  useEffect(() => {
    const loadAuth = async () => {
      const storedToken = await SecureStore.getItemAsync("token");
      if (storedToken) {
        setTokenState(storedToken);
        try {
          const res = await axios.get(`${API_BASE_URL}/api/auth/me`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          console.log("🔄 Authenticated as:", res.data.user);
          setUser(res.data.user);
        } catch (err) {
          console.warn("⚠️ Token invalide ou expiré");
          await logout();
        }
      }
      setLoading(false);
    };

    loadAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
