import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { Page } from "../components/Page";
import { Button } from "../components/Button";
import { Trash2 } from "lucide-react";

export const CartPage = () => {
  const { cart, removeFromCart, fetchCart } = useCart();
  const [showRecap, setShowRecap] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
      0
  );

  const confirmPayment = () => {
    setPaymentConfirmed(true);
    setShowRecap(false);
  };

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
                          Prix unitaire : {(Number(item.price) || 0).toFixed(2)} €
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

              <div className="text-center">
                <Button
                    className="button-pay text-white text-lg px-6 py-3"
                    onClick={() => setShowRecap(true)}
                >
                  🛒 Payer
                </Button>
              </div>

              {showRecap && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full space-y-4">
                      <h3 className="text-xl font-bold text-center mb-2">
                        Récapitulatif de votre commande
                      </h3>
                      {cart.map((item) => (
                          <div key={item.set_num} className="flex justify-between text-sm">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                            <span>
                      {((Number(item.price) || 0) * item.quantity).toFixed(2)} €
                    </span>
                          </div>
                      ))}
                      <hr />
                      <p className="text-right font-semibold">
                        Total : {totalPrice.toFixed(2)} €
                      </p>
                      <div className="flex justify-end gap-4 mt-4">
                        <Button className="button-cancel" onClick={() => setShowRecap(false)}>
                          Annuler
                        </Button>
                        <Button className="button-confirm" onClick={confirmPayment}>
                          Confirmer le paiement
                        </Button>
                      </div>
                    </div>
                  </div>
              )}

              {paymentConfirmed && (
                  <div className="text-center mt-6 text-green-600 font-semibold">
                    ✅ Paiement confirmé ! Merci pour votre commande.
                  </div>
              )}
            </div>
        )}
      </Page>
  );
};
