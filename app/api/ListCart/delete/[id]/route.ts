import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.headers.get("authorization");
    if (!token) {
      return NextResponse.json(
        { error: "Authorization token is required" },
        { status: 401 }
      );
    }

    const { id } = params;
    const url = `http://isaco.liara.run/cart/delete/${id}/`;

    const response = await axios.delete(url, {
      headers: {
        Authorization: token,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "Error deleting item:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: error.response?.status || 500 }
    );
  }
}
