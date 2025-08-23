// app/api/filter-parts/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("category_id");
  const pageNumber = searchParams.get("pagenumber") || 1; // شماره صفحه
  const pageSize = searchParams.get("pagesize") || 10; // تعداد در هر صفحه

  if (!categoryId) {
    return NextResponse.json(
      { error: "پارامتر category_id الزامی است" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      "http://isaco.liara.run/api/products/filter-parts/",
      {
        params: {
          category_id: categoryId,
          pagenumber: pageNumber, // اضافه شد
          pagesize: pageSize, // اضافه شد
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
