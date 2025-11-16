import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json(
        { error: "فیلد id الزامی است." },
        { status: 400 }
      );
    }

    // درخواست به سرور Django
    const res = await fetch(
      "https://django.farapartco.com/api/products/inventory/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: Number(body.id) }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `خطا از سرور Django: ${res.status}`, details: text },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("❌ خطا در route inventory:", error);
    return NextResponse.json(
      { error: "مشکلی در ارسال درخواست به سرور پیش آمد." },
      { status: 500 }
    );
  }
}
