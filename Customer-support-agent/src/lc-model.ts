import { loadEnv } from "./env";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";

export type Provider = "gemini" | "groq" | "openai";
export function createChatModel(): { provider: Provider; model: any } {
  loadEnv();
  const forced = (process.env.PROVIDER || "").toLowerCase();
  const hasGemini = !!process.env.GOOGLE_API_KEY;
  const hasGroq = !!process.env.GROQ_API_KEY;

  const base = { temperature: 0 as const };

  if (forced === "gemini" || (!forced && hasGemini)) {
    return {
      provider: "gemini",
      model: new ChatGoogleGenerativeAI({
        ...base,
        model: "gemini-2.5-flash-lite",
      }),
    };
  }

  if (forced === "groq" || (!forced && hasGroq)) {
    return {
      provider: "groq",
      model: new ChatGroq({
        ...base,
        model: "llama-3.1-8b-instant",
      }),
    };
  }

  //   default return
  return {
    provider: "gemini",
    model: new ChatGoogleGenerativeAI({
      ...base,
      model: "gemini-2.5-flash-lite",
    }),
  };
}
