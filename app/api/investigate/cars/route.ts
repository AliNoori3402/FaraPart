// app/api/carlog/cars/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const brand = searchParams.get("brand");

    if (!brand) {
      return NextResponse.json(
        { error: "Brand parameter is required" },
        { status: 400 }
      );
    }

    const response = await axios.get(
      `http://194.5.175.107:8000/api/products/carlog-cars/?brand=${encodeURIComponent(
        brand
      )}`
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching carlog cars:", error.message);

    return NextResponse.json(
      { error: "Failed to fetch carlog cars" },
      { status: 500 }
    );
  }
}
