// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { PropsWithChildren } from "react";

type ProtectedRouteProps = {
  requireAdmin?: boolean;
} & PropsWithChildren;

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { token, role } = useAuth();


  if (!token) {
    return <Navigate to="/login" replace />;
  }


  if (requireAdmin && role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
