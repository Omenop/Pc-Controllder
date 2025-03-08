import { NextRequest, NextResponse } from "next/server";

let lastPopup: { message: string; timestamp: number } | null = null;

export async function GET() {
  if (!lastPopup) {
    return NextResponse.json({ success: false, message: "No popup issued" });
  }
  const popup = lastPopup;
  lastPopup = null;
  return NextResponse.json({ success: true, message: popup.message });
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ success: false, message: "No message provided" }, { status: 400 });
    }

    lastPopup = { message, timestamp: Date.now() };
    console.log(`[POPUP API] Received popup message: ${message}`);
    return NextResponse.json({ success: true, message: `Popup message '${message}' received` });
    
  } catch (error) {
    console.error("[POPUP API] Error processing request:", error);
    return NextResponse.json({ success: false, message: "Error processing request" }, { status: 500 });
  }
}
