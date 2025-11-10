import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category_id = searchParams.get("category_id");

  if (!category_id) {
    return NextResponse.json(
      { error: "category_id الزامی است" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://www.django.farapartco.com/api/products/filter-parts/?category_id=${category_id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "خطا در دریافت اطلاعات از سرور" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "ارتباط با سرور برقرار نشد" },
      { status: 500 }
    );
  }
}
