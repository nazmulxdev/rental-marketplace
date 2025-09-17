// src/app/api/properties/featured/route.ts
import { NextResponse } from "next/server";
import { getTheFeaturedProduct } from "../../../../components/home/action/featuredProperties";

export async function GET() {
  try {
    const data = await getTheFeaturedProduct();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
