// app/api/carlog-brands/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get(
      "https://isaco.liara.run/api/products/carlog-brands/"
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching carlog brands:", error.message);

    return NextResponse.json(
      { error: "Failed to fetch carlog brands" },
      { status: 500 }
    );
  }
}
