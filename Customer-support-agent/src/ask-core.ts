import { createChatModel } from "./lc-model";
import { AskResult, AskResultSchema } from "./schema";

export async function askStructured(query: string): Promise<AskResult> {
  const { model } = createChatModel();
  // keep instruction brief and schema stay proper

  const system = "You are concise assistant.Return only the requested JSON";
  const user =
    `summarize for a beginner.` +
    `\n` +
    `${query}` +
    `\n` +
    `Return fields :summary(short paragraph),confidence(0..1)`;

  const structured = model.withStructuredOutput(AskResultSchema);
  const result = await structured.invoke([
    { role: "system", content: system },
    { role: "user", content: user },
  ]);

  return result;
}
