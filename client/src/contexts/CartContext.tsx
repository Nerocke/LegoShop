import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

export type CartItem = {
  set_num: string;
  name: string;
  quantity: number;
  set_img_url?: string;
  price: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: { set_num: string; name: string; set_img_url?: string; price?: number }) => void;
  removeFromCart: (set_num: string) => void;
  fetchCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/cart");
      setCart(res.data);
    } catch (err) {
      console.error("Erreur fetch panier", err);
    }
  };

  const addToCart = async (item: { set_num: string; name: string; set_img_url?: string; price?: number }) => {
    const res = await axios.post("http://localhost:3000/api/cart", {
      ...item,
      quantity: 1,
    });
    setCart(res.data);
  };

  const removeFromCart = async (set_num: string) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/cart/${set_num}`);
      setCart(res.data);
    } catch (err) {
      console.error("Erreur suppression panier", err);
    }
  };

  return (
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, fetchCart }}>
        {children}
      </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
