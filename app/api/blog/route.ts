import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const res = await axios.get(
      "https://www.django.farapartco.com/api/blog/posts/",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to fetch blog posts",
        details: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}
