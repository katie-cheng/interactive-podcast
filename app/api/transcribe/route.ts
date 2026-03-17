import { NextResponse } from "next/server";

const OPENAI_TRANSCRIPTIONS_URL = "https://api.openai.com/v1/audio/transcriptions";

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    return NextResponse.json(
      {
        error:
          "OPENAI_API_KEY is not set. Add it in .env.local (project root) for localhost, or in Vercel for production. " +
          "Use exactly: OPENAI_API_KEY=sk-... with no quotes or spaces. Then restart the dev server (Ctrl+C, then npm run dev).",
      },
      { status: 500 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid form data" },
      { status: 400 }
    );
  }

  const file = formData.get("audio") ?? formData.get("file");
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json(
      { error: "Missing audio file. Send a form field named 'audio' or 'file'." },
      { status: 400 }
    );
  }

  const body = new FormData();
  body.append("file", file, "audio.webm");
  body.append("model", "whisper-1");

  const lang = formData.get("language");
  if (typeof lang === "string" && lang) {
    body.append("language", lang);
  }

  try {
    const res = await fetch(OPENAI_TRANSCRIPTIONS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body,
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[transcribe] OpenAI error:", res.status, errText);
      return NextResponse.json(
        { error: res.status === 401 ? "Invalid OPENAI_API_KEY" : "Transcription failed" },
        { status: res.status >= 500 ? 502 : 400 }
      );
    }

    const data = (await res.json()) as { text?: string };
    const text = typeof data.text === "string" ? data.text.trim() : "";
    return NextResponse.json({ text });
  } catch (err) {
    console.error("[transcribe] request failed:", err);
    return NextResponse.json(
      { error: "Transcription request failed" },
      { status: 502 }
    );
  }
}
