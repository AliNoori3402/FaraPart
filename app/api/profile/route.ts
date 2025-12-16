import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { status: "error", message: "توکن ارسال نشده یا معتبر نیست" },
        { status: 401 }
      );
    }
    const accessToken = authHeader.slice(7);

    const response = await axios.get(
      "https://django.farapartco.com/api/users/profile/",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
          "خطا در دریافت اطلاعات پروفایل. لطفاً دوباره تلاش کنید.",
      },
      { status: error.response?.status || 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { status: "error", message: "توکن ارسال نشده یا معتبر نیست" },
        { status: 401 }
      );
    }
    const accessToken = authHeader.slice(7);

    const response = await axios.patch(
      "https://django.farapartco.com/api/users/profile/",
      body, // مثلا { first_name, last_name, address }
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
          "خطا در بروزرسانی پروفایل. لطفاً دوباره تلاش کنید.",
      },
      { status: error.response?.status || 500 }
    );
  }
}
