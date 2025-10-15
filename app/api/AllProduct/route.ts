// app/api/products/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageNumber = searchParams.get("pagenumber") || "1";
  const pageSize = searchParams.get("pagesize") || "12";

  try {
    const response = await axios.get(
      "http://194.5.175.107:8000/api/products/all/",
      {
        params: {
          pagenumber: pageNumber,
          pagesize: pageSize,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Axios error:", error.message);
    const status = error.response?.status || 500;
    const message = error.response?.data || "Internal server error";
    return NextResponse.json({ error: message }, { status });
  }
}
