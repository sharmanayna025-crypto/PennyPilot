import { useState } from "react";
import ReactMarkdown from "react-markdown";
import API from "../services/api";

function AIInsights() {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateInsight = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await API.get("/insights");

      setInsight(response.data);
    } catch (error) {
      console.error("Error generating AI insights:", error);

      setError(
        "Unable to generate insights right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      {/* Header */}
      <div className="mb-8">

        <p className="text-sm font-semibold text-teal-600">
          AI POWERED
        </p>

        <h1 className="text-4xl font-bold text-slate-800 mt-1">
          Spending Insights
        </h1>

        <p className="text-slate-500 mt-2">
          Get personalized insights about your spending habits.
        </p>

      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">

        {/* Loading */}
        {loading ? (

          <div className="flex flex-col items-center justify-center py-16">

            <div className="w-10 h-10 border-4 border-slate-200 border-t-teal-600 rounded-full animate-spin" />

            <p className="text-slate-500 mt-4">
              Gemini is analyzing your transactions...
            </p>

          </div>

        ) : error ? (

          /* Error */
          <div className="text-center py-12">

            <div className="text-4xl mb-4">
              ⚠️
            </div>

            <p className="text-red-500 font-medium">
              {error}
            </p>

            <button
              onClick={generateInsight}
              className="mt-5 bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition"
            >
              Try Again
            </button>

          </div>

        ) : (

          /* Content */
          <div>

            {/* Title */}
            <div className="flex items-center gap-3 mb-8">

              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-2xl">
                🤖
              </div>

              <div>

                <h2 className="text-2xl font-bold text-slate-800">
                  Your Financial Insights
                </h2>

                <p className="text-sm text-slate-500">
                  Generated from your PennyPilot transactions
                </p>

              </div>

            </div>

            {/* Insight */}
            {insight ? (

              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-7">

                <div className="prose prose-slate max-w-none">

                  <ReactMarkdown
                    components={{

                      h1: ({ children }) => (
                        <h1 className="text-3xl font-bold text-slate-800 mb-5">
                          {children}
                        </h1>
                      ),

                      h2: ({ children }) => (
                        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">
                          {children}
                        </h2>
                      ),

                      h3: ({ children }) => (
                        <h3 className="text-xl font-bold text-slate-800 mt-7 mb-3">
                          {children}
                        </h3>
                      ),

                      p: ({ children }) => (
                        <p className="text-slate-700 leading-7 mb-4">
                          {children}
                        </p>
                      ),

                      strong: ({ children }) => (
                        <strong className="font-bold text-slate-800">
                          {children}
                        </strong>
                      ),

                      ul: ({ children }) => (
                        <ul className="list-disc pl-6 space-y-2 mb-5 text-slate-700">
                          {children}
                        </ul>
                      ),

                      ol: ({ children }) => (
                        <ol className="list-decimal pl-6 space-y-4 mb-6 text-slate-700">
                          {children}
                        </ol>
                      ),

                      li: ({ children }) => (
                        <li className="leading-7 pl-1">
                          {children}
                        </li>
                      ),

                      hr: () => (
                        <hr className="my-7 border-slate-200" />
                      ),
                    }}
                  >
                    {insight}
                  </ReactMarkdown>

                </div>

              </div>

            ) : (

              /* Empty State */
              <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-10 text-center">

                <div className="text-4xl mb-4">
                  💡
                </div>

                <p className="font-semibold text-slate-700">
                  Ready to analyze your spending?
                </p>

                <p className="text-sm text-slate-500 mt-2">
                  Generate personalized financial recommendations
                  based on your transactions.
                </p>

              </div>

            )}

            {/* Refresh Button */}
            {insight && (

              <button
                onClick={generateInsight}
                disabled={loading}
                className="mt-6 bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-700 transition disabled:opacity-50"
              >
                🔄 Refresh Insights
              </button>

            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default AIInsights;