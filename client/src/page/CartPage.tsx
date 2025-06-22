import { useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { Page } from "../components/Page";
import { Button } from "../components/Button";
import { Trash2 } from "lucide-react";

export const CartPage = () => {
  const { cart, removeFromCart, fetchCart } = useCart();

  useEffect(() => {
    fetchCart(); // Recharge le panier au chargement
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
      0
  );

  return (
      <Page title="Mon Panier">
        {cart.length === 0 ? (
            <p className="text-center text-gray-600">Votre panier est vide.</p>
        ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Articles dans le panier</h2>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total : {totalItems} articles</p>
                  <p className="text-sm text-green-600 font-semibold">
                    Prix total estimé : {totalPrice.toFixed(2)} €
                  </p>
                </div>
              </div>

              {cart.map((item) => (
                  <div
                      key={item.set_num}
                      className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      {item.set_img_url && (
                          <img
                              src={item.set_img_url}
                              alt={item.name}
                              className="w-16 h-auto rounded"
                          />
                      )}
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">Set n° {item.set_num}</p>
                        <p className="text-sm text-gray-500">
                          Prix unitaire : {Number(item.price ?? 0).toFixed(2)} €
                        </p>
                        <p className="text-sm text-gray-500">Quantité : {item.quantity}</p>
                      </div>
                    </div>

                    <Button
                        variant="outline"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(item.set_num)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                    </Button>
                  </div>
              ))}
            </div>
        )}
      </Page>
  );
};
