// src/App.tsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { Home } from "./page/Home";
import { Plop } from "./page/Plop";
import { Users } from "./page/Users";
import { CreateUser } from "./page/CreateUser";
import { Login } from "./page/Login";
import { Catalog } from "./page/Catalog";
import { CartPage } from "./page/CartPage";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

const AppRoutes = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            document.body.classList.add("home-background");
        } else {
            document.body.classList.remove("home-background");
        }
    }, [location.pathname]);

    return (
        <Routes>
            {/* ✅ Routes publiques */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createUser" element={<CreateUser />} />

            {/* 🔒 Routes protégées */}
            <Route
                path="/catalog"
                element={
                    <ProtectedRoute>
                        <Catalog />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/cartpage"
                element={
                    <ProtectedRoute>
                        <CartPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/plop"
                element={
                    <ProtectedRoute>
                        <Plop />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/users"
                element={
                    <ProtectedRoute requireAdmin>
                        <Users />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
};
