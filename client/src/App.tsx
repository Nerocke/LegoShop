import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./page/Home";
import { Plop } from "./page/Plop";
import { Users } from "./page/Users";
import { CreateUser } from "./page/CreateUser";
import { Login } from "./page/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext"; // ✅ Assure-toi de l'importer
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Catalog } from "./page/Catalog";
import { CartPage } from "./page/CartPage";

export const App = () => {
    return (
        <AuthProvider>
            <CartProvider> {/* ✅ ENVELOPPE TOUTES LES ROUTES ICI */}
                <BrowserRouter>
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
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
};
