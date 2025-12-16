import { NextResponse } from "next/server";

// هندلر برای متد GET
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // ساخت URL نهایی برای API Django
  const url = `https://www.django.farapartco.com/api/products/carlog-pics/?${searchParams.toString()}`;

  try {
    // درخواست به API اصلی
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store", // جلوگیری از کش شدن پاسخ
    });

    // بررسی وضعیت پاسخ
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `خطا از سرور Django: ${res.status}`, details: text },
        { status: res.status }
      );
    }

    // تبدیل پاسخ به JSON و ارسال به فرانت‌اند
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: "مشکلی در ارتباط با سرور پیش آمد." },
      { status: 500 }
    );
  }
}
