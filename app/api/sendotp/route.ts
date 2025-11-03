import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { phone_number } = body;

    if (!phone_number) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }

    const response = await axios.post(
      "http://130.185.74.137:8000/api/users/send-otp/",
      {
        phone_number,
      }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error("OTP API error:", error?.response?.data || error.message);

    return NextResponse.json(
      {
        error: "Failed to send OTP.",
        details: error?.response?.data || error.message,
      },
      { status: error?.response?.status || 500 }
    );
  }
}
