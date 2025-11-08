import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // دریافت access token از هدر
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "احراز هویت انجام نشده است." },
        { status: 401 }
      );
    }

    // دریافت فرم داده‌ها از درخواست فرانت‌اند
    const formData = await req.formData();

    // ارسال به سرور Django
    const res = await fetch(
      "https://django.farapartmotor.com/api/admin/call/create/",
      {
        method: "POST",
        headers: {
          Authorization: authHeader, // همون Bearer token
        },
        body: formData, // خود فرم‌دیتا را ارسال می‌کنیم
      }
    );

    // بررسی وضعیت پاسخ سرور Django
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `خطا از سرور Django: ${res.status}`, details: text },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error("❌ خطا در route create:", error);
    return NextResponse.json(
      { error: "مشکلی در ارسال درخواست پیش آمد." },
      { status: 500 }
    );
  }
}
