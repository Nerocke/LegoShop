// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import "./Navbar.css"; // On ajoutera ce fichier juste après

export const Navbar = () => {
    return (
        <nav className="lego-navbar">
            <h2 className="lego-navbar-title">Navigation</h2>
            <div className="lego-navbar-links">
                <Link to="/">Accueil</Link>
                <Link to="/catalog">Catalogue</Link>
                <Link to="/cartpage">Panier</Link>
                <Link to="/login">Connexion</Link>
                <Link to="/users">Utilisateurs</Link>
                <Link to="/createUser">Créer un utilisateur</Link>
                <Link to="/plop">Plop</Link>
            </div>
        </nav>
    );
};
