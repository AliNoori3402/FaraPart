import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      first_name,
      last_name,
      national_code,
      email,
      postal_code,
      address,
      phone_number,
    } = body;

    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { status: "error", message: "توکن دسترسی ارسال نشده یا معتبر نیست" },
        { status: 401 }
      );
    }
    const accessToken = authHeader.slice(7);

    const response = await axios.post(
      "https://django.farapartco.com/api/users/register/",
      {
        first_name,
        last_name,
        national_code,
        email,
        postal_code,
        address,
        phone_number,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message:
          error.response?.data?.message ||
          "خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.",
      },
      { status: error.response?.status || 500 }
    );
  }
}
