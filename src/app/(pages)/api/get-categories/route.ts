
import { CategoryI } from "@/interface";
import { NextResponse } from "next/server"

export async function GET() {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories', {
        method:'GET',
      
        
    }
)
    const { data :Categories}: { data: CategoryI[] } = await response.json();
    return NextResponse.json({ data: Categories });
    
}