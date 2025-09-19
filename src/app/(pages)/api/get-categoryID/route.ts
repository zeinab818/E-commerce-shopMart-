import { NextRequest, NextResponse } from "next/server";
import { CategoryI } from "@/interface/category";
import { ProductI } from "@/interface/products";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");

  if (!categoryId) {
    return NextResponse.json({ error: "Category ID required" }, { status: 400 });
  }

  let category: CategoryI | null = null;
  let products: ProductI[] = [];

  try {
    // Fetch category info
    const categoryRes = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=/${categoryId}`, {
    
    });
    const categoryJson = await categoryRes.json();
    category = categoryJson.data;

    // Fetch products in this category
    const productsRes = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`, {
    
    });
    const productsJson = await productsRes.json();
    products = productsJson.data || [];
  } catch (err) {
    console.error("Error fetching category/products:", err);
    return NextResponse.json({ error: "Failed to fetch category or products" }, { status: 500 });
  }

  return NextResponse.json({ category, products });
}
