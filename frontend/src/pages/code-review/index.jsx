import axios from "axios";
import { useState, useEffect, useCallback } from "react";

const CodeReview = () => {
  const [code, setCode] = useState(`const sum = async () => {
  return 1 + 1;
};`);
  const [codeExplanation, setCodeExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  async function getReview() {
    if (loading) return;

    try {
      setLoading(true);

      // Using fetch instead of axios (remove axios import if you prefer fetch)
      // const response = await fetch(
      //   `${import.meta.env.VITE_BACKEND_CODE_REVIEW_URL}/api/get-review`,
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ code })
      //   }
      // );

      // const data = await response.json();
      // setCodeExplanation(data.data);

      // OR using axios (keep axios import for this)
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_CODE_REVIEW_URL}/api/get-review`,
        { code },
      );
      setCodeExplanation(response.data.data);
    } catch (error) {
      console.error(error);
      setCodeExplanation(
        error.response?.data?.message ||
          "Error fetching review. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  // Simple syntax highlighter (basic version)
  const highlightCode = (codeString) => {
    // Basic JavaScript keyword highlighting
    const keywords =
      /\b(const|let|var|function|return|if|else|for|while|async|await|try|catch|class|export|import|from|default|new|this|typeof|instanceof)\b/g;
    const strings = /(["'`])(?:(?!\1)[^\\]|\\.)*\1/g;
    const comments = /\/\/.*$/gm;
    const numbers = /\b\d+\b/g;

    let highlighted = codeString
      .replace(
        comments,
        (match) => `<span style="color: #6a9955;">${match}</span>`,
      )
      .replace(
        strings,
        (match) => `<span style="color: #ce9178;">${match}</span>`,
      )
      .replace(
        keywords,
        (match) => `<span style="color: #569cd6;">${match}</span>`,
      )
      .replace(
        numbers,
        (match) => `<span style="color: #b5cea8;">${match}</span>`,
      );

    return highlighted;
  };

  // Simple markdown renderer (basic version)
  const renderMarkdown = (content) => {
    if (!content) return null;

    // Convert markdown to HTML (basic)
    let html = content
      // Headers
      .replace(
        /^### (.*$)/gm,
        '<h3 class="text-lg font-semibold mt-4 mb-2 text-blue-300">$1</h3>',
      )
      .replace(
        /^## (.*$)/gm,
        '<h2 class="text-xl font-bold mt-6 mb-3 text-blue-200">$1</h2>',
      )
      .replace(
        /^# (.*$)/gm,
        '<h1 class="text-2xl font-bold mt-8 mb-4 text-blue-100">$1</h1>',
      )
      // Bold
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-bold text-yellow-200">$1</strong>',
      )
      // Italic
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-300">$1</em>')
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, codeContent) => {
        return `<pre class="bg-gray-900 rounded-lg p-4 my-3 overflow-x-auto"><code class="text-sm text-gray-200 font-mono">${escapeHtml(codeContent)}</code></pre>`;
      })
      // Inline code
      .replace(
        /`(.*?)`/g,
        '<code class="bg-gray-800 rounded px-1 py-0.5 text-sm text-green-300 font-mono">$1</code>',
      )
      // Lists
      .replace(/^- (.*$)/gm, '<li class="ml-4 text-gray-300">$1</li>')
      .replace(
        /^\d+\. (.*$)/gm,
        '<li class="ml-4 text-gray-300 list-decimal">$1</li>',
      )
      // Paragraphs
      .replace(
        /^(?!<[hl]|<\/?[ulol]|<\/?li).+$/gm,
        '<p class="my-2 text-gray-300 leading-relaxed">$&</p>',
      );

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  const escapeHtml = (text) => {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  };

  return (
    <main className="flex h-screen bg-gray-900">
      {/* LEFT PANEL */}
      <div className="w-1/2 bg-[#1e1e1e] p-4 flex flex-col">
        <div className="flex-1 border border-gray-700 rounded-lg overflow-auto bg-[#1e1e1e]">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full p-3 font-mono text-sm bg-transparent text-gray-200 outline-none resize-none"
            style={{ fontFamily: '"Fira Code", monospace', minHeight: "100%" }}
            spellCheck={false}
          />
        </div>

        <button
          onClick={getReview}
          disabled={loading}
          className={`mt-3 px-4 py-2 rounded-lg text-white font-medium transition-colors ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Reviewing...
            </span>
          ) : (
            "Review Code"
          )}
        </button>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-1/2 p-4 overflow-y-auto bg-slate-900 text-gray-200">
        {codeExplanation ? (
          <div className="prose prose-invert max-w-none">
            {renderMarkdown(codeExplanation)}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Your review will appear here...
          </div>
        )}
      </div>
    </main>
  );
};

export default CodeReview;
