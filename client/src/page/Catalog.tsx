import { useEffect, useState } from "react";
import axios from "axios";
import { Page } from "../components/Page";
import { useCart } from "../contexts/CartContext";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import { ShoppingCart, CheckCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    const [searchTerm, setSearchTerm] = useState<string>("");

    const { addToCart } = useCart();
    const [popup, setPopup] = useState<string | null>(null);

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
                            headers: {
                                Authorization: "key 084e58acc1c1b14774c6f32ce4f0227b",
                            },
                        }
                    );

                    const data = setsRes.data.results;
                    allSets = [...allSets, ...data];
                    hasNext = setsRes.data.next !== null;
                    page++;
                }

                const themesRes = await axios.get(
                    "https://rebrickable.com/api/v3/lego/themes/",
                    {
                        headers: {
                            Authorization: "key 084e58acc1c1b14774c6f32ce4f0227b",
                        },
                    }
                );

                const themesData = Array.isArray(themesRes.data)
                    ? themesRes.data
                    : themesRes.data.results;

                setSets(allSets);
                setThemes(themesData);
            } catch (err) {
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
        const matchTheme = themeFilter
            ? set.theme_id?.toString() === themeFilter
            : true;
        const matchSearch = searchTerm
            ? set.name.toLowerCase().includes(searchTerm.toLowerCase())
            : true;

        return matchYear && matchTheme && matchSearch;
    });

    const uniqueYears = Array.from(new Set(sets.map((s) => s.year))).sort();
    const availableThemeIds = new Set(
        sets.map((s) => s.theme_id).filter(Boolean)
    );
    const filteredThemes = themes.filter((theme) =>
        availableThemeIds.has(theme.id)
    );

    if (loading) return <Page title="Catalogue">Chargement...</Page>;
    if (error)
        return (
            <Page title="Catalogue">
                <p>{error}</p>
            </Page>
        );

    return (
        <Page title="Catalogue LEGO">
            <div className="mb-6 flex flex-wrap gap-4 justify-center items-center">
                <input
                    type="text"
                    placeholder="Rechercher par nom"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 w-64"
                />

                <select
                    className="border border-gray-300 rounded px-4 py-2"
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                >
                    <option value="">Toutes les années</option>
                    {uniqueYears.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>

                <select
                    className="border border-gray-300 rounded px-4 py-2"
                    value={themeFilter}
                    onChange={(e) => setThemeFilter(e.target.value)}
                >
                    <option value="">Tous les thèmes</option>
                    {filteredThemes.map((theme) => (
                        <option key={theme.id} value={theme.id.toString()}>
                            {theme.name}
                        </option>
                    ))}
                </select>
            </div>

            <motion.div
                className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { staggerChildren: 0.1 },
                    },
                }}
            >
                {filteredSets.map((set) => (
                    <motion.div
                        key={set.set_num}
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                    >
                        <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                            {set.set_img_url && (
                                <img
                                    src={set.set_img_url}
                                    alt={set.name}
                                    className="w-full h-48 object-cover rounded-t-2xl"
                                />
                            )}
                            <CardContent className="flex flex-col flex-grow p-4 justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-blue-900 mb-1">
                                        {set.name}
                                    </h2>
                                    <p className="text-sm text-gray-600">Année : {set.year}</p>
                                    <p className="text-sm text-gray-600">
                                        Pièces : {set.num_parts ?? "?"}
                                    </p>
                                    <p className="text-sm text-green-700 font-semibold">
                                        Prix estimé : {((set.num_parts ?? 100) * 0.9).toFixed(2)} €
                                    </p>
                                </div>

                                {(set.num_parts ?? 0) === 0 ? (
                                    <Button
                                        className="button-out-of-stock mt-4 w-full flex items-center justify-center gap-2"
                                        onClick={() => {}}
                                    >
                                        🚫 Rupture de stock
                                    </Button>

                                ) : (
                                    <Button
                                        className="mt-4 w-full flex items-center justify-center gap-2"
                                        onClick={() => {

                                            const estimatedPrice = ((set.num_parts ?? 100) * 0.9).toFixed(2);

                                            addToCart({
                                                set_num: set.set_num,
                                                name: set.name,
                                                set_img_url: set.set_img_url,
                                                price: estimatedPrice, // 🟢 on transmet le prix estimé
                                            });

                                            setPopup(`"${set.name}" ajouté au panier.`);
                                            setTimeout(() => setPopup(null), 2500);
                                        }}
                                    >
                                        <ShoppingCart /> Ajouter au panier
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            <AnimatePresence>
                {popup && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-6 right-6 bg-white border border-green-500 rounded-lg px-4 py-3 shadow-lg flex items-center gap-3 z-50"
                    >
                        <CheckCircle className="text-green-500" />
                        <span className="text-sm text-gray-800">{popup}</span>
                        <button onClick={() => setPopup(null)}>
                            <X className="w-4 h-4 text-gray-400 hover:text-red-500" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </Page>
    );
};
