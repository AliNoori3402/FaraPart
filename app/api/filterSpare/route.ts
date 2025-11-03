import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const { part_type, pageNumber = 1, pageSize = 20 } = await request.json();

    const response = await axios.post(
      "http://130.185.74.137:8000/api/products/filter-by-type/",
      { part_type },
      {
        params: {
          pagenumber: pageNumber,
          pagesize: pageSize,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "Error in /api/filterSpare:",
      error.response || error.message
    );
    return NextResponse.json(
      { error: "خطا در دریافت محصولات" },
      { status: 500 }
    );
  }
}
