"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { CHUNKS } from "./data/chunks";
import type { Chunk } from "./data/chunks";

const LEFT_FADE_MS = 600;
const SENTENCE_REVEAL_DELAY_MS = 380;
const ANNOTATION_FADE_DELAY_MS = 300;
const RIGHT_FADE_MS = 600;

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function useRevealSentences(fullText: string, isActive: boolean) {
  const sentences = useMemo(() => splitSentences(fullText), [fullText]);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!isActive || sentences.length === 0) {
      setVisibleCount(isActive ? sentences.length : 0);
      return;
    }
    setVisibleCount(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setVisibleCount((c) => Math.min(c + 1, sentences.length));
      if (i >= sentences.length) clearInterval(id);
    }, SENTENCE_REVEAL_DELAY_MS);
    return () => clearInterval(id);
  }, [fullText, isActive, sentences.length]);

  return { sentences, visibleCount };
}

function VoiceButton({
  onTranscript,
  onError,
  disabled,
}: {
  onTranscript: (text: string) => void;
  onError?: () => void;
  disabled?: boolean;
}) {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [transcribing, setTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const setErrorAndNotify = useCallback((msg: string) => {
    setError(msg);
    onError?.();
  }, [onError]);

  const startRecording = useCallback(async () => {
    if (typeof window === "undefined") return;
    setError(null);
    setTranscript("");
    chunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "audio/webm";
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: mimeType });
        if (blob.size === 0) {
          setError("No audio recorded. Try again.");
          onError?.();
          setRecording(false);
          setTranscribing(false);
          return;
        }
        setTranscribing(true);
        try {
          const formData = new FormData();
          formData.append("audio", blob, "audio.webm");
          const res = await fetch("/api/transcribe", { method: "POST", body: formData });
          const data = await res.json();
          if (!res.ok) {
            setErrorAndNotify(data.error || "Transcription failed.");
            return;
          }
          const text = (data.text || "").trim();
          if (text) {
            setTranscript(text);
            onTranscript(text);
          } else {
            setError("Nothing was heard. Try again or type your response below.");
            onError?.();
          }
        } catch (err) {
          console.error("[transcribe]", err);
          setErrorAndNotify("Transcription failed. Check your connection or type below.");
        } finally {
          setTranscribing(false);
          setRecording(false);
        }
      };
      recorder.start(1000);
      mediaRecorderRef.current = recorder;
      setRecording(true);
    } catch (err) {
      setErrorAndNotify("Microphone access denied. Allow the site to use your mic, or type below.");
    }
  }, [onTranscript, onError, setErrorAndNotify]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
      setTranscribing(true);
    }
  }, []);

  return (
    <div className="mt-6 flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={recording ? stopRecording : startRecording}
        disabled={disabled || transcribing}
        className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent bg-transparent text-accent transition-opacity hover:opacity-90 disabled:opacity-50"
        style={{
          animation: recording || transcribing ? "pulse 1.5s ease-in-out infinite" : undefined,
        }}
        aria-label={recording ? "Stop recording" : transcribing ? "Transcribing…" : "Start recording"}
      >
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          {recording ? (
            <rect x="6" y="6" width="12" height="12" rx="2" />
          ) : (
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
          )}
        </svg>
      </button>
      <span className="font-sans text-[11px] uppercase tracking-widest text-annotation">
        {transcribing ? "Transcribing…" : recording ? "Recording… click again to stop and send" : "Click to start • click again to stop and send"}
      </span>
      {error ? (
        <p className="font-sans text-sm text-accent max-w-full">{error}</p>
      ) : transcript ? (
        <p className="font-sans text-sm text-annotation/90 max-w-full">{transcript}</p>
      ) : null}
    </div>
  );
}

function TypedResponseFallback({
  onSubmit,
  disabled,
}: {
  onSubmit: (text: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed && !disabled) {
      onSubmit(trimmed);
      setValue("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
      <label htmlFor="typed-response" className="font-sans text-[11px] uppercase tracking-widest text-annotation">
        Or type your response
      </label>
      <div className="flex gap-2">
        <input
          id="typed-response"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type here…"
          disabled={disabled}
          className="flex-1 min-w-0 font-sans text-sm px-3 py-2 bg-bg border border-border text-muted placeholder:text-btn-text focus:outline-none focus:border-accent/50 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="font-sans text-[13px] px-3 py-2 border border-btn-border bg-transparent text-btn-text hover:text-muted disabled:opacity-50 transition-colors shrink-0"
        >
          Send
        </button>
      </div>
    </form>
  );
}

function ChunkView({
  chunk,
  isActive,
  onClaudeResponse,
  onContinue,
}: {
  chunk: Chunk;
  isActive: boolean;
  onClaudeResponse: (reply: string) => void;
  onContinue: () => void;
}) {
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const [claudeReply, setClaudeReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [voiceFailed, setVoiceFailed] = useState(false);

  const { sentences, visibleCount } = useRevealSentences(
    chunk.transcript,
    isActive && leftVisible
  );
  const transcriptComplete =
    isActive && leftVisible && visibleCount >= sentences.length;

  useEffect(() => {
    if (!isActive) return;
    setLeftVisible(true);
  }, [isActive]);

  useEffect(() => {
    if (!transcriptComplete) return;
    const t = setTimeout(() => setRightVisible(true), ANNOTATION_FADE_DELAY_MS);
    return () => clearTimeout(t);
  }, [transcriptComplete]);

  const handleVoiceSubmit = useCallback(
    async (userMessage: string) => {
      if (!userMessage.trim()) return;
      setLoading(true);
      setClaudeReply(null);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userMessage: userMessage.trim(),
            chunkText: chunk.transcript,
            annotationText: chunk.annotation,
          }),
        });
        const data = await res.json();
        if (data.reply) {
          setClaudeReply(data.reply);
          onClaudeResponse(data.reply);
        } else if (data.error) {
          setClaudeReply(
            data.error === "ANTHROPIC_API_KEY is not set"
              ? "Voice replies aren’t set up yet. Add ANTHROPIC_API_KEY in .env.local (locally) or in Vercel Environment Variables (production)."
              : data.error
          );
        } else {
          setClaudeReply("Something went wrong. Try again.");
        }
      } catch {
        setClaudeReply("Something went wrong. Check your connection and try again.");
      } finally {
        setLoading(false);
      }
    },
    [chunk.transcript, chunk.annotation, onClaudeResponse]
  );

  const showVoice = chunk.id <= 16 && !chunk.isFinalAnnotation;
  const showContinue =
    (showVoice && (skipped || claudeReply !== null)) || chunk.isFinalAnnotation;

  return (
    <div className="flex flex-col md:flex-row w-full min-h-full">
      <div
        className="flex flex-col px-6 md:px-8 py-8 md:py-10 md:w-[55%] min-w-0 shrink-0"
        style={{
          opacity: leftVisible ? 1 : 0,
          transition: `opacity ${LEFT_FADE_MS}ms ease-out`,
        }}
      >
        {chunk.speakerLabel ? (
          <span
            className="mb-2 block font-sans text-[11px] uppercase tracking-widest"
            style={{ color: "#9b4444", letterSpacing: "0.1em" }}
          >
            {chunk.speakerLabel}:
          </span>
        ) : null}
        <div
          className="font-serif text-base leading-[1.8]"
          style={{ color: "#d4cfc8" }}
        >
          {sentences.slice(0, visibleCount).map((sentence, i) => (
            <span key={i} className="transcript-sentence">
              {sentence}
              {i < visibleCount - 1 ? " " : ""}
            </span>
          ))}
        </div>
      </div>

      <div
        className="flex flex-col px-6 md:px-8 py-8 md:py-10 md:border-l border-border min-h-0 md:w-[45%] min-w-0 shrink-0"
        style={{
          opacity: rightVisible ? 1 : 0,
          transition: `opacity ${RIGHT_FADE_MS}ms ease-out`,
        }}
      >
        <span
          className="mb-2 block font-sans text-[11px] uppercase tracking-widest"
          style={{ color: "#9b4444" }}
        >
          2026 ↗
        </span>
        <div
          className="font-sans text-[15px] leading-[1.7] border-l-2 border-accent pl-4 markdown-render"
          style={{ color: "#a09a94" }}
        >
          <ReactMarkdown>{chunk.annotation}</ReactMarkdown>
        </div>

        {showVoice && (
          <>
            <VoiceButton
              onTranscript={handleVoiceSubmit}
              onError={() => setVoiceFailed(true)}
              disabled={loading}
            />
            {voiceFailed && (
              <TypedResponseFallback
                onSubmit={handleVoiceSubmit}
                disabled={loading}
              />
            )}
            {!claudeReply && !loading && (
              <button
                type="button"
                onClick={() => {
                  setSkipped(true);
                  onContinue();
                }}
                className="mt-2 font-sans text-[13px] text-btn-text hover:text-muted transition-colors"
              >
                skip →
              </button>
            )}
          </>
        )}

        {loading && (
          <p className="mt-4 font-sans text-sm italic text-claude/70">Thinking…</p>
        )}

        {claudeReply && (
          <div
            className="mt-4 font-sans text-sm italic leading-relaxed markdown-render"
            style={{ color: "#7a9b8a" }}
          >
            <ReactMarkdown>{claudeReply}</ReactMarkdown>
          </div>
        )}

        {showContinue && (
          <button
            type="button"
            onClick={onContinue}
            className="mt-6 font-sans text-[13px] text-btn-text hover:text-muted transition-colors"
          >
            continue reading →
          </button>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [phase, setPhase] = useState<"title" | "reading" | "final">("title");
  const [chunkIndex, setChunkIndex] = useState(0);
  const [finalWords, setFinalWords] = useState("");

  const chunk = CHUNKS[chunkIndex];
  const isLastChunk = chunk?.isFinalAnnotation;
  const goNext = useCallback(() => {
    if (chunkIndex >= CHUNKS.length - 1) {
      setPhase("final");
    } else {
      setChunkIndex((i) => i + 1);
    }
  }, [chunkIndex]);

  if (phase === "title") {
    return (
      <div className="min-h-screen flex flex-col bg-bg">
        <p className="text-center font-sans text-sm text-annotation/90 max-w-xl mx-auto px-6 pt-12 pb-4">
        <i>Secret Graffiti</i> is a narrative podcast piece about my dad revealing to me that he was a graffiti artist in 1980s San Francisco and left art behind to become an engineer. This interactive annotated podcast analyzes the story through a new lens: what does that story look like now, when AI is changing what it means to make art at all?

        </p>
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <h1 className="font-serif text-4xl md:text-6xl text-muted tracking-tight text-center">
            Secret Graffiti
          </h1>
          <p className="mt-4 font-sans text-sm text-annotation/90 text-center">
            1980s San Francisco → 2026 Silicon Valley
          </p>
          <p className="mt-2 font-sans text-base text-annotation/80 text-center max-w-md">
            An annotated story about art, inheritance, and what AI can&apos;t replicate.
          </p>
          <button
            type="button"
            onClick={() => setPhase("reading")}
            className="mt-12 font-sans text-[13px] px-6 py-3 border border-btn-border bg-transparent text-btn-text hover:text-muted transition-colors rounded-sm"
          >
            begin
          </button>
        </div>
      </div>
    );
  }

  if (phase === "final") {
    const finalChunk = CHUNKS[CHUNKS.length - 1];
    return (
      <div className="min-h-screen flex flex-col bg-bg">
        <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-bg border-b border-border">
          <span className="font-sans text-sm uppercase tracking-widest text-muted">
            Secret Graffiti
          </span>
          <span className="font-sans text-xs text-annotation/80">
            An annotated story / 1980s → 2026
          </span>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 max-w-2xl mx-auto w-full">
          <div
            className="font-sans text-xl md:text-2xl leading-[1.7] text-center whitespace-pre-line max-w-2xl"
            style={{ color: "#a09a94" }}
          >
            <ReactMarkdown>{finalChunk.annotation}</ReactMarkdown>
          </div>
          <div className="mt-16 w-full max-w-md">
            <label htmlFor="final-input" className="block font-sans text-sm text-annotation/80 mb-2">
              What will you make?
            </label>
            <input
              id="final-input"
              type="text"
              value={finalWords}
              onChange={(e) => setFinalWords(e.target.value)}
              placeholder="Type something…"
              className="w-full font-sans text-base px-4 py-3 bg-bg border border-border text-muted placeholder:text-btn-text focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>
          {finalWords && (
            <p className="mt-12 font-serif text-2xl md:text-3xl text-transcript text-center max-w-xl">
              {finalWords}
            </p>
          )}
          <p className="mt-20 font-sans text-xs text-annotation/60 text-center">
            Secret Graffiti — written and produced by Katie Cheng, Lela Hanson, Reyna Duffy, and Will Yu. Stanford Storytelling Project.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-bg">
      <header className="sticky top-0 z-10 flex shrink-0 items-center justify-between px-6 py-4 bg-bg border-b border-border">
        <span className="font-sans text-sm uppercase tracking-widest text-muted">
          Secret Graffiti
        </span>
        <span className="font-sans text-xs text-annotation/80">
          An annotated story / 1980s → 2026
        </span>
      </header>

      <div className="flex-1 flex min-h-0 overflow-y-auto md:overflow-x-hidden">
        {chunk && (
          <ChunkView
            key={chunk.id}
            chunk={chunk}
            isActive={true}
            onClaudeResponse={() => {}}
            onContinue={goNext}
          />
        )}
      </div>
    </div>
  );
}
