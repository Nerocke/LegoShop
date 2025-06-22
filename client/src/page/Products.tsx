import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductCard } from '../components/ProductCard';
import { IProduct } from '../../types';

export const Products = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get<IProduct[]>('/api/products');
                setProducts(response.data);
            } catch (err: any) {
                setError(err.response?.data?.error || 'Erreur lors du chargement');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <div className="text-center p-8">Chargement...</div>;
    if (error) return <div className="text-center text-red-600 p-8">{error}</div>;

    return (
        <div className="container mx-auto my-12">
            <h2 className="text-3xl font-semibold mb-6">Nos Produits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={Number(product.price)}
                        image={product.images[0]}
                    />
                ))}
            </div>
        </div>
    );
};