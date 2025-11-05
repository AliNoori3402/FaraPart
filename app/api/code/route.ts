import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { codes } = body;

    const res = await fetch(
      "https://www.django.farapartmotor.com/api/products/search-by-codes/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codes }),
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "خطا در دریافت داده‌ها از سرور خارجی" },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطا در سرور" }, { status: 500 });
  }
}
