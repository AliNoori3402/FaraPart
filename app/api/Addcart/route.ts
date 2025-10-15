import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const body = await req.json();
    // Ensure the body has the required fields (you can add more validation if needed)
    if (!body.part_id || !body.quantity) {
      return NextResponse.json(
        { error: "Missing part_id or quantity" },
        { status: 400 }
      );
    }

    // Get the Authorization header from the incoming request
    const authorization = req.headers.get("Authorization");
    if (!authorization) {
      return NextResponse.json(
        { error: "Missing Authorization header" },
        { status: 401 }
      );
    }

    // External API URL
    const apiUrl = "http://194.5.175.107:8000/api/cart/add/";

    // Forward the request to the external API using Axios
    const response = await axios.post(apiUrl, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
    });

    // Return the successful response
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("Error in API route:", error);
    if (error.response) {
      // Forward the error from the external API
      return NextResponse.json(
        { error: error.response.data },
        { status: error.response.status }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
