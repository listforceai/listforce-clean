import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [ask, setAsk] = useState('');
  const [response, setResponse] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/openai-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: ask }),
    });
    const data = await res.json();
    setResponse(data.result || 'No response');
  }

  return (
    <>
      <Head>
        <title>ListForce.ai — Magic AI for Real Estate</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-center">
        {/* HERO */}
        <header className="py-12">
          <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">
            Your Listings. Elevated.
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Instantly generate polished reports, presentations, and marketing powered by AI.
          </p>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex shadow rounded overflow-hidden">
            <input
              value={ask}
              onChange={e => setAsk(e.target.value)}
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
          {response && (
            <div className="mt-6 bg-white rounded shadow p-4 max-w-lg mx-auto text-left">
              <p className="text-gray-800 whitespace-pre-wrap">{response}</p>
            </div>
          )}
        </header>

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
              Automate your email, social, and follow-up campaigns effortlessly.
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
        <footer className="py-8 text-gray-500">
          &copy; 2025 ListForce.ai. All rights reserved.
        </footer>
      </div>
    </>
  );
}
