import axios from "axios";
import { NextResponse } from "next/server";

// GET Featured Boxes (پیشنهاد ما)
export async function GET() {
  try {
    const response = await axios.get(
      "https://django.farapartco.com/api/admin/featured-boxes/"
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "مشکلی در دریافت اطلاعات پیشنهادهای ویژه پیش آمد." },
      { status: 500 }
    );
  }
}
