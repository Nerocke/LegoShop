import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./page/Home";
import { Plop } from "./page/Plop";
import { Users } from "./page/Users";
import { CreateUser } from "./page/CreateUser";
import { Login } from "./page/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Catalog } from "./page/Catalog";
import { CartPage } from "./page/CartPage";
import { useEffect } from "react";

const AppContent = () => {
    const location = useLocation();

    useEffect(() => {
        // Applique la classe seulement sur la page d'accueil
        if (location.pathname === "/") {
            document.body.classList.add("home-background");
        } else {
            document.body.classList.remove("home-background");
        }
    }, [location.pathname]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route
                path="/plop"
                element={
                    <ProtectedRoute>
                        <Plop />
                    </ProtectedRoute>
                }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/createUser" element={<CreateUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/cartpage" element={<CartPage />} />
        </Routes>
    );
};

export const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <AppContent />
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
};
