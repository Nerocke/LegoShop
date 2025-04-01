import { PropsWithChildren } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Login } from "../page/Login";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { token } = useAuth();

  return token ? children : <Login />;
};
