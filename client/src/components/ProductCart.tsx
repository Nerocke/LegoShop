import { useEffect, useState } from "react";
import axios from "axios";
import { Page } from "../components/Page";
import { useCart } from "../contexts/CartContext";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import { ShoppingCart, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Types
type LegoSet = {
    set_num: string;
    name: string;
    year: number;
    theme_id?: number;
    num_parts?: number;
    set_img_url?: string;
};

type Theme = {
    id: number;
    name: string;
};

export const Catalog = () => {
    const [sets, setSets] = useState<LegoSet[]>([]);
    const [themes, setThemes] = useState<Theme[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [yearFilter, setYearFilter] = useState<string>("");
    const [themeFilter, setThemeFilter] = useState<string>("");
    const { addToCart, cart } = useCart();
    const [popupCart, setPopupCart] = useState<{ set_num: string; name: string } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let allSets: LegoSet[] = [];
                let page = 1;
                let hasNext = true;

                while (hasNext && page <= 5) {
                    const setsRes = await axios.get(
                        `https://rebrickable.com/api/v3/lego/sets/?page=${page}&page_size=100`,
                        {
                            headers: { Authorization: "key 084e58acc1c1b14774c6f32ce4f0227b" },
                        }
                    );

                    const data = Array.isArray(setsRes.data?.results) ? setsRes.data.results : [];
                    const filtered = data.filter((set: LegoSet) => {
                        const year = Number(set.year);
                        return year >= 2015 && year <= 2026;
                    });
                    allSets = [...allSets, ...filtered];
                    hasNext = setsRes.data.next !== null;
                    page++;
                }

                const themesRes = await axios.get("https://rebrickable.com/api/v3/lego/themes/", {
                    headers: { Authorization: "key 084e58acc1c1b14774c6f32ce4f0227b" },
                });

                const themesData = Array.isArray(themesRes.data) ? themesRes.data : themesRes.data.results;

                setSets(allSets);
                setThemes(themesData);
            } catch (err: any) {
                console.error(err);
                setError("Impossible de récupérer les sets LEGO.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredSets = sets.filter((set) => {
        const matchYear = yearFilter ? set.year.toString() === yearFilter : true;
        const matchTheme = themeFilter ? set.theme_id?.toString() === themeFilter : true;
        return matchYear && matchTheme;
    });

    const uniqueYears = Array.from(new Set(sets.map((s) => Number(s.year))))
        .filter((y) => y >= 2015 && y <= 2026)
        .sort((a, b) => b - a); // tri décroissant

    const availableThemeIds = new Set(sets.map((s) => s.theme_id).filter(Boolean));
    const filteredThemes = themes.filter((theme) => availableThemeIds.has(theme.id));

    if (loading) return <Page title="Catalogue">Chargement...</Page>;
    if (error) return <Page title="Catalogue"><p>{error}</p></Page>;

    return (
        <Page title="Catalogue LEGO">
            <div className="mb-6 flex gap-4 flex-wrap justify-center">
                <select
                    className="border border-gray-300 rounded px-4 py-2"
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                >
                    <option value="">Toutes les années</option>
                    {uniqueYears.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                <select
                    className="border border-gray-300 rounded px-4 py-2"
                    value={themeFilter}
                    onChange={(e) => setThemeFilter(e.target.value)}
                >
                    <option value="">Tous les thèmes</option>
                    {filteredThemes.map((theme) => (
                        <option key={theme.id} value={theme.id.toString()}>{theme.name}</option>
                    ))}
                </select>

                <Link to="/cart" className="ml-auto text-blue-700 hover:underline flex items-center gap-1">
                    Voir le panier ({cart.length}) <ArrowRight size={16} />
                </Link>
            </div>

            <motion.div
                className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
                }}
            >
                {filteredSets.map((set) => (
                    <motion.div key={set.set_num} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                        <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                            {set.set_img_url && (
                                <div className="w-full h-36 overflow-hidden rounded-t-2xl flex justify-center items-center bg-white">
                                    <img
                                        src={set.set_img_url}
                                        alt={set.name}
                                        className="object-contain w-24 h-24"
                                    />
                                </div>
                            )}
                            <CardContent className="flex flex-col flex-grow p-4 justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-blue-900 mb-1 line-clamp-2 min-h-[3em]">{set.name}</h2>
                                    <p className="text-sm text-gray-600">Année : {set.year}</p>
                                    <p className="text-sm text-gray-600">Pièces : {set.num_parts ?? "?"}</p>
                                </div>
                                <Button
                                    className="mt-4 w-full flex items-center justify-center gap-2"
                                    onClick={() => {
                                        addToCart({ set_num: set.set_num, name: set.name });
                                        setPopupCart({ set_num: set.set_num, name: set.name });
                                        setTimeout(() => setPopupCart(null), 2500);
                                    }}
                                >
                                    <ShoppingCart /> Ajouter au panier
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            <AnimatePresence>
                {popupCart && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-6 right-6 bg-white border border-yellow-500 rounded-lg px-4 py-3 shadow-lg flex items-center gap-4 z-50"
                    >
                        <ShoppingCart className="text-yellow-500" />
                        <div>
                            <p className="text-sm font-semibold">Ajouté au panier :</p>
                            <p className="text-sm text-gray-700">{popupCart.name}</p>
                        </div>
                        <button onClick={() => setPopupCart(null)}>
                            <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </Page>
    );
};
