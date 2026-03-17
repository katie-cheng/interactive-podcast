import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are embedded in an interactive annotated podcast called 'Secret Graffiti.' A listener has just read a segment of a personal story about a father who was a graffiti artist in 1980s San Francisco, and an annotation written by his daughter — now a painter and AI engineer — reframing that moment through the lens of AI's impact on creative labor in 2026. The listener has spoken a response. Reply in 2-4 sentences that are thoughtful, specific, and push the conversation forward. Do not summarize what they said. Do not be preachy. Ask one real question if it feels right. Reference the specific themes of the chunk they just responded to — authorship, visibility, creative labor, inheritance, what AI can and cannot replicate.`;

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not set" },
      { status: 500 }
    );
  }

  let body: { userMessage: string; chunkText: string; annotationText: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { userMessage, chunkText, annotationText } = body;
  if (
    typeof userMessage !== "string" ||
    typeof chunkText !== "string" ||
    typeof annotationText !== "string"
  ) {
    return NextResponse.json(
      { error: "userMessage, chunkText, and annotationText must be strings" },
      { status: 400 }
    );
  }

  const anthropic = new Anthropic({ apiKey });

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 200,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Transcript chunk the listener just read:\n\n${chunkText}\n\nAnnotation (Katie's 2026 lens):\n\n${annotationText}\n\nListener's spoken response:\n\n${userMessage}`,
        },
      ],
    });

    const textBlock = message.content.find(
      (block): block is Anthropic.TextBlock => block.type === "text"
    );
    const reply = textBlock ? textBlock.text : "";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Claude API error:", err);
    return NextResponse.json(
      { error: "Failed to get response from Claude" },
      { status: 500 }
    );
  }
}
