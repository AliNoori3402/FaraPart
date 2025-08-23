import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    // گرفتن توکن از هدر
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // درخواست به سرور اصلی
    const res = await axios.get("http://isaco.liara.run/api/cart/list-cart/", {
      headers: {
        Authorization: authHeader,
      },
    });

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching cart:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: error.response?.status || 500 }
    );
  }
}
