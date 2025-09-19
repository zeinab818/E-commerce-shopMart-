// /app/api/get-brand-products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { BrandI } from "@/interface/brand";
import { ProductI } from "@/interface/products";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const brandId = searchParams.get("brandId");

  if (!brandId) {
    return NextResponse.json({ error: "brand ID required" }, { status: 400 });
  }

  try {
    // Fetch brand info
    const brandRes = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
    const { data: brand }: { data: BrandI } = await brandRes.json();

    // Fetch products in this brand
    const productsRes = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`);
    const { data: products }: { data: ProductI[] } = await productsRes.json();

    return NextResponse.json({ brand, products });
  } catch (err) {
    console.error("Error fetching brand/products:", err);
    return NextResponse.json({ error: "Failed to fetch brand or products" }, { status: 500 });
  }
}
