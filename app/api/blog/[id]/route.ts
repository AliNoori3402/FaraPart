import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request, context: any) {
  try {
    const params = context?.params ?? {};
    const id = params?.id;

    if (!id) {
      return NextResponse.json(
        { error: "Missing id parameter" },
        { status: 400 }
      );
    }

    const res = await axios.get(`http://194.5.175.107:8000/blog/posts/${id}/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching blog post details:", error.message);

    return NextResponse.json(
      {
        error: "Failed to fetch blog post details",
        details: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}
