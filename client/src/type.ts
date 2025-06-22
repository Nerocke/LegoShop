// frontend/src/types.ts
export interface IProduct {
    id: string;
    title: string;
    description: string;
    price: string; // Numeric string from API
    images: string[];
    stock: number;
    categories: string[];
    createdAt: string;
    updatedAt: string;
}