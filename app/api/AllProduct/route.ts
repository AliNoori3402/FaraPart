// app/api/products/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // جمع‌آوری همه پارامترها از URL
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (value) params[key.toLowerCase()] = value; // نام پارامترها را به lowercase می‌بریم
    });

    // مقدار پیشفرض
    if (!params.pagenumber) params.pagenumber = "1";
    if (!params.pagesize) params.pagesize = "12";

    const response = await axios.get(
      "http://130.185.74.137:8000/api/products/filter-parts/",
      { params }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Axios error:", error.message);
    const status = error.response?.status || 500;
    const message = error.response?.data || "Internal server error";
    return NextResponse.json({ error: message }, { status });
  }
}
