import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [ask, setAsk] = useState("");
  const [response, setResponse] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/openai-proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: ask }),
    });
    const data = await res.json();
    setResponse(data.result || "No response");
  }

  return (
    <>
      <Head>
        <title>ListForce.ai — Magic AI for Real Estate</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
        {/* HERO */}
        <header className="text-center py-12 px-4">
          <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">
            Your Listings. Elevated.
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Instantly generate polished reports, presentations, and marketing powered by AI.
          </p>
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto flex shadow rounded overflow-hidden"
          >
            <input
              value={ask}
              onChange={(e) => setAsk(e.target.value)}
              placeholder="Ask anything (e.g., price strategy)…"
              className="flex-grow px-4 py-3 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
            >
              Ask Now
            </button>
          </form>
        </header>

        {/* RESULT with WATERMARK & UPGRADE */}
        {response && (
          <div className="mt-8 px-4">
            <div className="max-w-lg mx-auto relative border rounded-lg overflow-hidden">
              {/* watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-6xl text-gray-200 uppercase rotate-45 select-none">
                  Sample
                </span>
              </div>
              {/* actual response */}
              <div className="relative z-10 bg-white p-6">
                <p className="text-gray-800 whitespace-pre-wrap">{response}</p>
              </div>
            </div>
            {/* upgrade buttons */}
            <div className="mt-4 flex gap-4 justify-center">
              <button
                onClick={() => (window.location.href = "/api/checkout?price=one-time")}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                One-Time $29
              </button>
              <button
                onClick={() => (window.location.href = "/api/checkout?price=annual")}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                $299/yr Unlimited
              </button>
            </div>
          </div>
        )}

        {/* FEATURES */}
        <section className="py-16 grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Instant Reports</h3>
            <p className="text-gray-600">
              Generate stunning listing presentations and buyer reports on demand.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Marketing Automation</h3>
            <p className="text-gray-600">
              Automate your email, social, and follow‐up campaigns effortlessly.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">AI-Powered Insights</h3>
            <p className="text-gray-600">
              Get pricing, staging, and market strategy advice driven by GPT.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 text-center text-gray-500">
          &copy; 2025 ListForce.ai. All rights reserved.
        </footer>
      </div>
    </>
  );
}

