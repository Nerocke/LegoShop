import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Navbar.css";

export const Navbar = () => {
    const { role } = useAuth();

    return (
        <nav className="lego-navbar">
            <h2 className="lego-navbar-title">Navigation</h2>
            <div className="lego-navbar-links">
                <Link to="/catalog">Catalogue</Link>
                <Link to="/cartpage">Panier</Link>
                {role === "admin" && <Link to="/users">Utilisateurs</Link>}
                <Link to="/">Déconnexion</Link>
            </div>
        </nav>
    );
};
