import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./page/Home";
import { Plop } from "./page/Plop";
import { Users } from "./page/Users";
import { CreateUser } from "./page/CreateUser";
import { Login } from "./page/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Catalog } from "./page/Catalog";

export const App = () => {
  return (
    <AuthProvider>
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
