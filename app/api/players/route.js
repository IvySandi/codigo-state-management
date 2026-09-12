import { NextResponse } from "next/server";

export async function GET(request) {
  const apiKey = process.env.BALLDONTLIE_API_KEY;
  const baseUrl = (process.env.BALLDONTLIE_BASE_URL || "https://api.balldontlie.io").replace(/\/$/, "");

  if (!apiKey) {
    return NextResponse.json(
      { error: "BALLDONTLIE_API_KEY is missing." },
      { status: 503 },
    );
  }

  const cursor = request.nextUrl.searchParams.get("cursor");
  const url = new URL(`${baseUrl}/v1/players`);
  url.searchParams.set("per_page", "10");
  
  if (cursor) url.searchParams.set("cursor", cursor);

  try {
    const response = await fetch(url, {
      headers: { Authorization: apiKey },
      cache: "no-store",
    });

    const payload = await response.json();
   
    // console.log("API response:", payload);
    // console.log("Status:", response.status);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: payload.message || "The player API service got an error." },
        { status: response.status },
      );
    }

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(
      { error: "The player API service is currently unavailable." },
      { status: 502 },
    );
  }
}
