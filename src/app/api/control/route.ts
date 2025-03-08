import { NextRequest, NextResponse } from "next/server";

let lastCommand: string | null = null;
let lastCommandTime: number | null = null; // Store the last command timestamp

export async function GET() {
  if (!lastCommand) {
    return NextResponse.json({ success: false, message: "No command issued" });
  }

  const command = lastCommand;
  lastCommand = null; // Reset command after fetching

  return NextResponse.json({ success: true, action: command });
}

export async function POST(req: NextRequest) {
  try {
    const { action } = await req.json();

    if (!["shutdown", "restart", "sleep"].includes(action)) {
      return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
    }

    const currentTime = Date.now();
    const timeSinceLastCommand = lastCommandTime ? (currentTime - lastCommandTime) / 1000 : 0;
    
    console.log(`[COMMAND RECEIVED] Action: ${action}`);
    console.log(`[TIMESTAMP] Sent at: ${new Date(currentTime).toLocaleTimeString()}`);
    if (lastCommandTime) {
      console.log(`[TIME INTERVAL] Time since last command: ${timeSinceLastCommand.toFixed(2)} seconds`);
    }

    lastCommand = action;
    lastCommandTime = currentTime;

    return NextResponse.json({ success: true, message: `Command '${action}' received` });

  } catch (error) {
    console.error(`[ERROR] Failed to process request:`, error);
    return NextResponse.json({ success: false, message: "Error processing request" }, { status: 500 });
  }
}
