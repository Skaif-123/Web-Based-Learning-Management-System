import { createChatModel } from "./lc-model";
import { AskResult, AskResultSchema } from "./schema";

export async function askStructured(query: string): Promise<AskResult> {
  const { model } = createChatModel();
  // keep instruction brief and schema stay proper

 const system = "You are a customer support assistant for a Learning Management System (LMS). Help users with course enrollment, account issues, payments, assignments, and technical problems. If you don't know, say: Please contact ascendbusinesses@outlook.com. Return only valid JSON.";

const user = `Answer this LMS support query: ${query}\nReturn fields: answer(short paragraph), confidence(0..1)`;

  const structured = model.withStructuredOutput(AskResultSchema);
  const result = await structured.invoke([
    { role: "system", content: system },
    { role: "user", content: user },
  ]);

  return result;
}
