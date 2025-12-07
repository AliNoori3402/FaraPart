import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const token = req.headers.get("authorization"); // توکن از هدر

    const response = await fetch(
      `https://django.farapartco.com/api/products/part-comments/create/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error creating comment:", err);
    return NextResponse.json({ error: "خطا در ثبت کامنت" }, { status: 500 });
  }
}
