import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone_number, code } = body;

    const response = await axios.post(
      "http://194.5.175.107:8000/api/users/verify-otp/",
      { phone_number, code }
    );

    const data = response.data;

    if (response.status === 200 && data.status === "success") {
      const { access, refresh, user_id } = data.tokens;

      return NextResponse.json({
        status: "success",
        message: data.message,
        user_created: data.user_created,
        person_created: data.person_created,
        phone_number: data.phone_number,
        tokens: {
          access,
          refresh,
          user_id,
        },
      });
    } else {
      return NextResponse.json(
        { status: "error", message: data.message || "کد تایید اشتباه است" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "خطای سرور" },
      { status: 500 }
    );
  }
}
