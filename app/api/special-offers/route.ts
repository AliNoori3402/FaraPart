import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const res = await axios.get(
      "https://www.django.farapartmotor.com/api/admin/list-special-offer-box/"
    );
    const offers = res.data || [];

    // فیلتر کردن پیشنهادهای فعال
    const activeOffers = offers.filter((offer: any) => offer.is_active);

    // انتخاب آخرین پیشنهاد فعال (جدیدترین)
    const latestOffer =
      activeOffers.sort((a: any, b: any) => {
        return (
          new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
        );
      })[0] || null;

    return NextResponse.json(latestOffer, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching offers:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch offers" },
      { status: 500 }
    );
  }
}
