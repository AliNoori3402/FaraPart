import axios from "axios";
import { NextResponse } from "next/server";

// این تابع برای درخواست GET از API
export async function GET() {
  try {
    const response = await axios.get(
      "https://www.django.farapartco.com/api/admin/discount-pack/"
    );

    // اگه سرور درست جواب بده، داده‌ها برگردونده می‌شن
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error fetching discount packs:", error.message);
    return NextResponse.json(
      { error: "مشکلی در دریافت اطلاعات پیش آمد." },
      { status: 500 }
    );
  }
}
