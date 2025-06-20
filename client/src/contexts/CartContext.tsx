import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

type CartItem = {
  id: number;
  set_num: string;
  name: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: { set_num: string; name: string }) => void;
  removeFromCart: (set_num: string) => void;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  // Charger le panier dès qu'on a un token
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setCart(res.data))
        .catch((err) => console.error("Erreur chargement panier", err));
    }
  }, [token]);

  // Ajouter un article au panier
  const addToCart = (item: { set_num: string; name: string }) => {
    axios
      .post(
        "http://localhost:3000/api/cart",
        { ...item, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => setCart(res.data))
      .catch((err) => console.error("Erreur ajout panier", err));
  };

  // Supprimer un article du panier
  const removeFromCart = (set_num: string) => {
    axios
      .delete(`http://localhost:3000/api/cart/${set_num}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCart(res.data))
      .catch((err) => console.error("Erreur suppression panier", err));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
