import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const res = await axios.get(
      "https://isaco.liara.run/api/admin/list-special-offer-box/",
      {
        // جلوگیری از کش شدن
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("Error fetching offers:", error.message);
    return NextResponse.json(
      { error: "خطا در دریافت پیشنهادهای ویژه" },
      { status: 500 }
    );
  }
}
