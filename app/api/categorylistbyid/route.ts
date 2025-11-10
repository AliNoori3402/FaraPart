import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parentId: number | undefined = body.parent_id;

    let categories;

    if (!parentId) {
      // اگر کاربر نوع کالا انتخاب نکرده بود، کل دسته بندی ها را بده
      const res = await axios.get(
        "https://www.django.farapartco.com/api/products/categories/"
      );
      categories = res.data;
    } else {
      // اگر parent_id ارسال شده بود، فقط بچه‌های آن دسته بندی را بده
      const res = await axios.post(
        "https://www.django.farapartco.com/api/products/categories/",
        {
          c_id: parentId,
        }
      );
      categories = res.data;
    }

    return NextResponse.json(categories, { status: 200 });
  } catch (error: any) {
    console.error("خطا در دریافت دسته‌بندی‌ها:", error.message || error);
    return NextResponse.json(
      { error: "خطا در دریافت دسته‌بندی‌ها" },
      { status: 500 }
    );
  }
}
