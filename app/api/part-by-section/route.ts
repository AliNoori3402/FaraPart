import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // دریافت داده از درخواست فرانت‌اند
    const body = await req.json();

    // بررسی مقدار sections
    if (!body.sections || !Array.isArray(body.sections)) {
      return NextResponse.json(
        { error: "فیلد sections الزامی است." },
        { status: 400 }
      );
    }

    // ارسال درخواست به سرور Django
    const res = await fetch(
      "https://django.farapartmotor.com/api/products/parts-by-section/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sections: body.sections.map((s: string) => s.trim()),
        }),
        cache: "no-store",
      }
    );

    // اگر پاسخ سرور خطا داد
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `خطا از سرور Django: ${res.status}`, details: text },
        { status: res.status }
      );
    }

    // پاسخ موفقیت‌آمیز
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("خطا در route parts-by-section:", error);
    return NextResponse.json(
      { error: "مشکلی در پردازش درخواست پیش آمد." },
      { status: 500 }
    );
  }
}
