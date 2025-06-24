import { Page } from "../components/Page";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
      <Page title="Bienvenue chez Brick & Morty" >
        <div className="home-page bg-white/90 p-8 rounded-lg shadow-md text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-yellow-400 drop-shadow-lg">
            Bienvenue dans notre boutique LEGO !
          </h2>
          <p className="text-lg text-gray-700">
            Découvrez un vaste catalogue de sets LEGO pour tous les âges et tous les univers : Star Wars,
            Ninjago, Harry Potter, Technic, City, et bien plus encore !
          </p>
          <p className="text-gray-600">
            Utilisez le menu en haut pour explorer le catalogue ou gérer votre panier.
          </p>
          <p className="text-sm text-gray-400 italic">
            ⚡ Astuce : Vous pouvez rechercher des sets par nom ou filtrer par thème et année.
          </p>

          {/* 🔐 S'inscrire et Connexion */}
          <div className="pt-6 flex flex-col items-center space-y-2">
            <Link to="/CreateUser">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded">
                S'inscrire
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded">
                Connexion
              </button>
            </Link>
          </div>
        </div>
      </Page>
  );
};
