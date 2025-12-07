import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
  // اگر params یک Promise باشه باید await کنیم
  const params = await (context?.params ?? {});
  const id = params?.id;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  try {
    const response = await fetch(
      `https://django.farapartco.com/api/products/part-comments/list/${id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching comments:", err);
    return NextResponse.json(
      { error: "خطا در دریافت کامنت‌ها" },
      { status: 500 }
    );
  }
}
