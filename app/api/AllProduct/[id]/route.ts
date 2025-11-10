// app/api/AllProduct/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
  // اگر params یک Promise باشه باید await کنیم
  const params = await (context?.params ?? {});
  const id = params?.id;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://www.django.farapartco.com/api/products/part/${id}/`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Error fetching product details" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
