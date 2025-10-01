import axios from "axios";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log(request);
    const res = await axios.get(
      "https://isaco.liara.run/api/products/list-brands/"
    );
    return new Response(JSON.stringify(res.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response("خطا در سرور", { status: 500 });
  }
}
