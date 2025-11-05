// app/api/products/[car_name]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
  try {
    // decode تا کاراکترهای فارسی درست بشن
    const car_name = decodeURIComponent(context.params.car_name);

    // بعد encode تا برای API امن بشه
    const response = await fetch(
      `https://www.django.farapartmotor.com/api/products/section-list-cars/?car_name=${encodeURIComponent(
        car_name
      )}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
