// app/api/part-by-section/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // بررسی مقدار sections
    if (!body.sections || !Array.isArray(body.sections)) {
      return NextResponse.json(
        { error: "فیلد sections الزامی است." },
        { status: 400 }
      );
    }

    // ارسال درخواست به Django با Axios
    const response = await axios.post(
      "https://django.farapartco.com/api/products/parts-by-section/",
      {
        sections: body.sections.map((s: string) => s.trim()),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const data = response.data;

    // normalize خروجی: اطمینان از اینکه همه مقادیر آرایه هستند
    const normalized: Record<string, string[]> = {};
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        normalized[key] = value;
      } else if (typeof value === "string") {
        normalized[key] = [value];
      } else if (value == null) {
        normalized[key] = [];
      } else {
        normalized[key] = [String(value)];
      }
    });

    return NextResponse.json(normalized);
  } catch (err: any) {
    console.error(
      "خطا در route parts-by-section:",
      err.response?.data || err.message
    );
    return NextResponse.json(
      {
        error: "خطا از سرور Django",
        details: err.response?.data || err.message,
      },
      { status: 500 }
    );
  }
}
