import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { car_id, page_number = 1, page_size = 12 } = body;

    if (!car_id) {
      return NextResponse.json(
        { error: "car_id is required" },
        { status: 400 }
      );
    }

    // درخواست به API خارجی
    const response = await fetch(
      "https:/django.farapartco.com/api/products/list-car-products/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          car_id,
          page_number,
          page_size,
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from external API" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // داده‌ها رو مستقیما برمی‌گردونیم
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
