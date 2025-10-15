// app/api/products/filter-parts-by-car/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const carId = searchParams.get("car_id"); // پارامتر جدید
  const pageNumber = searchParams.get("pagenumber") || 1; // شماره صفحه
  const pageSize = searchParams.get("pagesize") || 10; // تعداد در هر صفحه

  if (!carId) {
    return NextResponse.json(
      { error: "پارامتر car_id الزامی است" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      "http://194.5.175.107:8000/products/filter-parts/",
      {
        params: {
          car_id: carId,
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
