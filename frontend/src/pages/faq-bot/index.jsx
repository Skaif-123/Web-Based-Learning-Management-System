import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";

export default function FaqBot() {
  const [query, setQuery] = useState("");
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const BACKEND_URL =import.meta.env.VITE_BACKEND_FAQ_URL || "http://localhost:4000";
    // import.meta.env.VITE_BACKEND_FAQ_URL || "http://localhost:5000";

  async function handleQuerySubmit(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q || loading) return;
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: q }),
      });

      if (!res.ok) {
        throw new Error("Request Failed");
      }

      const data = await res.json();
      console.log(data, "data");

      const { summary, confidence } = data;

      setAnswers((prev) => [{ summary, confidence }, ...prev]);
      setQuery("");
      inputRef.current?.focus();
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Failed to get answer. Please make sure the backend server is running.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-zinc-50">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-4 pb-24 pt-8">
        <header className="mb-4">
          <h1 className="text-xl font-semibold tracking-tight">
            FAQ Bot - Ask anything
          </h1>
        </header>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Answers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {answers.length === 0 ? (
              <p className="text-sm text-zinc-600">
                No answers yet. Ask a question!
              </p>
            ) : (
              answers.map((ans, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-zinc-200 p-3 bg-white"
                >
                  <div className="text-sm leading-6">{ans.summary}</div>
                  <div className="mt-1 text-xs text-zinc-500">
                    Confidence: {(ans.confidence * 100).toFixed(1)}%
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <form
          onSubmit={handleQuerySubmit}
          className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-2xl px-4 py-4 bg-white/80 backdrop-blur border-t border-zinc-200"
        >
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              placeholder="Ask your question here..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
              className="h-11"
            />
            <Button type="submit" disabled={loading} className="h-11 px-6">
              {loading ? "Thinking..." : "Ask"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
