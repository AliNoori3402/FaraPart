// app/api/products/[car_name]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { car_name: string } }
) {
  try {
    // decode تا کاراکترهای فارسی درست بشن
    const car_name = decodeURIComponent(params.car_name);

    // بعد encode تا برای API امن بشه
    const response = await fetch(
      `https://isaco.liara.run/api/products/section-list-cars/?car_name=${encodeURIComponent(
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
