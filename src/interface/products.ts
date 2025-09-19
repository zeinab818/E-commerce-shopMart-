import { BrandI } from "./brand";
import { CategoryI } from "./category";
import { SubcategoryI } from "./subCategory";

export interface ProductI {
    sold: number;
    images: string[];
    subcategory: SubcategoryI[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCover: string;
    category: CategoryI;
    brand: BrandI;
    ratingsAverage: number;
    createdAt: string; // ISO Date string
    updatedAt: string; // ISO Date string
    id: string;
    }
