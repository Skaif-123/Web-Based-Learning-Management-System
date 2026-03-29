import { z } from 'zod';

const envSchema = z.object({
    PORT: z.string().default("5000"),
    ALLOWED_ORIGIN: z.url().default("http://localhost:3000"),

    MODEL_PROVIDER: z.enum(['openai', 'gemini', 'groq']).default('gemini'),

    OPENAI_MODEL: z.string().default("openai"),
    GEMINI_MODEL: z.string().default("gemini"),
    GROQ_MODEL: z.string().default("groq"),

    SEARCH_PROVIDER: z.string().default('tavily'),

    TAVILY_API_KEY: z.string().optional(),
    GOOGLE_API_KEY: z.string().optional(),
    GROQ_API_KEY: z.string().optional(),
})

export const env = envSchema.parse(process.env);