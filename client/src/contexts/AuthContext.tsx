// src/contexts/AuthContext.tsx
import {
    createContext,
    useContext,
    useState,
    useCallback,
    PropsWithChildren,
} from "react";

type AuthContextType = {
    id?: string;
    token?: string;
    role?: string;
    setAuth: (id: string, token: string, role: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
    id: undefined,
    token: undefined,
    role: undefined,
    setAuth: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [id, setId] = useState<string>();
    const [token, setToken] = useState<string>();
    const [role, setRole] = useState<string>();

    const setAuth = useCallback((id: string, token: string, role: string) => {
        setId(id);
        setToken(token);
        setRole(role);
    }, []);

    const logout = useCallback(() => {
        setId(undefined);
        setToken(undefined);
        setRole(undefined);
    }, []);

    return (
        <AuthContext.Provider value={{ id, token, role, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
