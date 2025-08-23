// app/api/categories/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get(
      "http://isaco.liara.run/api/products/categories/"
    );
    return NextResponse.json(response.data);
  } catch (error) {
    // اطمینان از نوع خطا و گرفتن پیام مناسب
    const message =
      axios.isAxiosError(error) && error.response
        ? error.response.data
        : (error as Error).message;

    return NextResponse.json(
      { error: "Failed to fetch categories", details: message },
      { status: 500 }
    );
  }
}
