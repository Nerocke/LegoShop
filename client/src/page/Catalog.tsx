import { useEffect, useState } from "react";
import axios from "axios";
import { Page } from "../components/Page";
import { useCart } from "../contexts/CartContext";

type LegoSet = {
  set_num: string;
  name: string;
  year: number;
  theme_id?: number;
  num_parts?: number;
  set_img_url?: string;
};

export const Catalog = () => {
  const [sets, setSets] = useState<LegoSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/rebrickable/sets");
        const data = Array.isArray(res.data) ? res.data : res.data.results;
        setSets(data);
      } catch (err: any) {
        setError("Impossible de récupérer les sets LEGO.");
      } finally {
        setLoading(false);
      }
    };

    fetchSets();
  }, []);

  if (loading) return <Page title="Catalogue">Chargement...</Page>;
  if (error) return <Page title="Catalogue"><p>{error}</p></Page>;

  return (
    <Page title="Catalogue LEGO">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sets.map((set) => (
          <div key={set.set_num} className="border rounded-xl p-4 shadow">
            <h2 className="text-xl font-bold">{set.name}</h2>
            <p>Année : {set.year}</p>
            <p>Pièces : {set.num_parts ?? "?"}</p>
            {set.set_img_url && (
              <img src={set.set_img_url} alt={set.name} className="w-full mt-2 rounded" />
            )}
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => addToCart({ set_num: set.set_num, name: set.name })}
            >
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>
    </Page>
  );
};
