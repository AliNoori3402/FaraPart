import axios from "axios";
import { NextResponse } from "next/server";

// GET Best Seller Boxes
export async function GET() {
  try {
    const response = await axios.get(
      "https://django.farapartco.com/api/admin/best-seller-boxes/"
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "مشکلی در دریافت اطلاعات پرفروش‌ترین‌ها پیش آمد." },
      { status: 500 }
    );
  }
}
