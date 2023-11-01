import { NextRequest, NextResponse } from "next/server";
import type { WebhookEvent } from "@clerk/clerk-sdk-node";

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as WebhookEvent;

    console.log("DATA: ", data);

    switch (data.type) {
      case "user.created":
    }

    return NextResponse.json({ success: "true" });
  } catch (error) {
    console.error("ERROR: ", error);
  }
}
