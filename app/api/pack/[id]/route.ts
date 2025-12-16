import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "id الزامی است." }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://www.django.farapartco.com/api/admin/discount-pack/${id}/`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `خطا از سرور Django: ${res.status}`, details: text },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: "مشکلی در ارتباط با سرور پیش آمد." },
      { status: 500 }
    );
  }
}
