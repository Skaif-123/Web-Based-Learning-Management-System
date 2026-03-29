import { env } from "./env"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ChatGroq } from "@langchain/groq"
import { BaseChatModel } from "@langchain/core/language_models/chat_models"


//low temp and max tokens
type ModelOpts = {
    temperature?: number,
    maxTokens?: number,
}

export function getChatModel(opts: ModelOpts = {}): BaseChatModel {
    const temp = opts?.temperature ?? 0.2;
    switch (env.MODEL_PROVIDER) {
        case "groq":
            return new ChatGroq({
                model: env.GROQ_MODEL,
                temperature: temp,
                apiKey: env.GROQ_API_KEY,
            })

        case "gemini":
            return new ChatGoogleGenerativeAI({
                model: env.GEMINI_MODEL,
                temperature: temp,
                apiKey: env.GOOGLE_API_KEY,
            })
    }
}

