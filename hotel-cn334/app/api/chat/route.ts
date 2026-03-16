// app/api/chat/route.ts

import { NextRequest, NextResponse } from "next/server";
import { retrieveContext } from "@/lib/hotelKnowledge";

interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    const query = lastUserMessage?.content ?? "";

    // RAG: ค้นหา context จาก hotelKnowledge.ts
    const context = retrieveContext(query);

    // ── DEBUG LOG: ดูใน terminal (npm run dev) ว่า RAG ดึงอะไรมา ──
    console.log("\n========== RAG DEBUG ==========");
    console.log("Query   :", query);
    console.log("Context :", context);
    console.log("================================\n");

    const systemPrompt = [
      "You are HotelBot, an AI Concierge. Answer only hotel-related questions.",
      "Reply in Thai or English based on user language. Be brief and friendly.",
      "",
      "Hotel Knowledge (from RAG):",
      context,
      "",
      "Rules:",
      "- Answer only hotel-related topics",
      "- If no info, suggest contacting Front Desk",
      "- Use a few emojis to be friendly",
    ].join("\n");

    const geminiContents = messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));

    const apiKey = process.env.GEMINI_API_KEY;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey!,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: geminiContents,
          generationConfig: {
            maxOutputTokens: 1024,
            temperature: 0.7,
          },
        }),
      }
    );

    // อ่านเป็น text ก่อนเสมอ ป้องกัน "Unexpected end of JSON input"
    const rawText = await response.text();

    if (!response.ok) {
      console.error("Gemini API error", response.status, rawText);
      return NextResponse.json(
        { error: `Gemini error ${response.status}: ${rawText.slice(0, 200)}` },
        { status: response.status }
      );
    }

    if (!rawText) {
      return NextResponse.json({ error: "Empty response from Gemini" }, { status: 502 });
    }

    const data = JSON.parse(rawText);
    const aiMessage =
      data.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Sorry, cannot answer right now. Please contact Front Desk.";

    return NextResponse.json({ message: aiMessage });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}