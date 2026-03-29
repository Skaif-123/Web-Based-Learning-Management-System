import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const WebAgentPage = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState([]);

  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chat]);

  const runSearch = async (prompt) => {
    setLoading(true);
    setChat((old) => [...old, { role: "user", content: prompt }]);
    const oldTime = performance.now();

    try {
      const res = await fetch(`${API_URL}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ q: prompt }),
      });
console.log(res);

      const json = await res.json();
      const timeDiff = Math.round(performance.now() - oldTime);

      if (!res.ok) {
        setChat((old) => [
          ...old,
          {
            role: "assistant",
            content: "I tried to answer, but something went wrong. Please try again",
            sources: [],
            time: timeDiff,
            error: json.error || "Request failed",
          },
        ]);
      } else {
        setChat((old) => [
          ...old,
          {
            role: "assistant",
            content: json.answer,
            sources: json.sources || [],
            time: timeDiff,
          },
        ]);
      }
    } catch (e) {
      const timeDiff = Math.round(performance.now() - oldTime);
      setChat((old) => [
        ...old,
        {
          role: "assistant",
          content: "I tried to answer, but something went wrong. Please try again",
          sources: [],
          time: timeDiff,
          error: "Network error - please check your connection",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    const prompt = query.trim();
    if (!prompt || loading) return;

    setQuery("");
    await runSearch(prompt);
  };

  return (
    <div className="flex h-screen flex-col bg-[#f9fafb] text-gray-900">
      {/* Header */}
      <CardHeader className="border-b bg-white px-4 py-3 text-sm flex justify-between">
        <div>
          <div className="font-medium text-gray-800">
            Search V1 (LCEL Web Agent)
          </div>
          <div className="text-xs text-gray-500">
            Answer with sources. Some queries will browse the web and some don't.
          </div>
        </div>
      </CardHeader>

      {/* Chat Content */}
      <CardContent
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-6"
      >
        {chat.length === 0 && (
          <div className="mx-auto max-w-2xl text-center text-sm text-gray-500">
            <div className="text-base font-semibold text-gray-800 mb-2">
              Ask anything
            </div>
            <div className="text-[14px] leading-relaxed">
              Examples:
              <br />
              <code className="rounded bg-gray-100 px-1 py-0.5 text-[12px]">
                Top 10 engineering colleges in India 2025
              </code>
              <br />
              <code className="rounded bg-gray-100 px-1 py-0.5 text-[12px]">
                Explain what docker is for beginners
              </code>
            </div>
          </div>
        )}

        {chat.map((turn, idx) => {
          if (turn.role === "user") {
            return (
              <div key={idx} className="mx-auto max-w-2xl flex justify-end">
                <div className="bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-md max-w-full">
                  <div className="whitespace-pre-wrap break-words">
                    {turn.content}
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div key={idx} className="mx-auto max-w-2xl flex gap-3">
              <div className="flex h-8 w-8 flex-none items-center justify-center rounded-md bg-gray-800 text-[11px] text-white font-semibold">
                AI
              </div>

              <div className="flex-1 space-y-3">
                <div className="bg-white px-4 py-3 rounded-2xl shadow-sm ring-1 ring-gray-200">
                  <div className="whitespace-pre-wrap break-words">
                    {turn.content}
                  </div>
                </div>

                <div className="text-[11px] text-gray-500 flex flex-wrap items-center gap-x-2">
                  {typeof turn.time === "number" && (
                    <span>answered in {turn.time} ms</span>
                  )}
                  {turn.error && <span>• {turn.error}</span>}
                </div>

                {turn.sources?.length > 0 && (
                  <div className="bg-white mt-2 p-3 rounded-lg shadow-sm ring-1 ring-gray-200">
                    <div className="text-[11px] font-medium text-gray-600 mb-1">
                      Sources:
                    </div>
                    <ul className="space-y-1">
                      {turn.sources.map((src, i) => (
                        <li key={i} className="truncate">
                          <a
                            href={src}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline underline-offset-4 text-[12px] break-all"
                          >
                            {src}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="mx-auto max-w-2xl flex gap-3">
            <div className="flex h-8 w-8 flex-none items-center justify-center rounded-md bg-gray-700 text-[11px] font-semibold text-white">
              AI
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl shadow-sm ring-1 ring-gray-200">
              Thinking...
            </div>
          </div>
        )}
      </CardContent>

      {/* Input Footer */}
      <CardFooter className="border-t bg-white px-4 py-4">
        <form
          onSubmit={handleChatSubmit}
          className="mx-auto flex w-full max-w-2xl gap-2"
        >
          <Input
            className="flex-1"
            placeholder="Ask your query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
          />
          <Button 
            type="submit"
            disabled={loading || query.trim().length < 5}
          >
            {loading ? "..." : "Send"}
          </Button>
        </form>
      </CardFooter>
    </div>
  );
};

export default WebAgentPage;