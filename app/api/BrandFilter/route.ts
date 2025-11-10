// app/api/filter-parts/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const brandId = searchParams.get("brand_id"); // پارامتر جدید
  const pageNumber = searchParams.get("pagenumber") || 1; // شماره صفحه
  const pageSize = searchParams.get("pagesize") || 10; // تعداد در هر صفحه

  if (!brandId) {
    return NextResponse.json(
      { error: "پارامتر brand_id الزامی است" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      "https://www.django.farapartco.com/api/products/filter-parts/",
      {
        params: {
          brand_id: brandId,
          pagenumber: pageNumber,
          pagesize: pageSize,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data || "خطا در ارتباط با سرور اصلی";
    return NextResponse.json({ error: message }, { status });
  }
}
