import { useEffect, useState } from "react";
import API from "../services/api";

function Insights() {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInsight = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/insights");

      setInsight(response.data);
    } catch (error) {
      console.error("Failed to fetch AI insights:", error);

      setError(
        "Unable to generate AI insights right now."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsight();
  }, []);

  /*
   * Convert Gemini's Markdown response
   * into readable sections.
   */
  const formatInsight = (text) => {
    if (!text) return null;

    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const sections = [];

    let currentSection = null;

    lines.forEach((line) => {
      // Main heading
      if (
        line.startsWith("###") ||
        line.startsWith("##")
      ) {
        if (currentSection) {
          sections.push(currentSection);
        }

        currentSection = {
          title: line
            .replace(/^#+\s*/, "")
            .replace(/\*\*/g, ""),
          items: [],
        };

        return;
      }

      // Numbered insight
      const numberedMatch = line.match(
        /^(\d+)\.\s+(.*)/
      );

      if (numberedMatch) {
        if (!currentSection) {
          currentSection = {
            title: "Key Spending Insights",
            items: [],
          };
        }

        currentSection.items.push({
          type: "number",
          number: numberedMatch[1],
          text: numberedMatch[2],
        });

        return;
      }

      // Bullet point
      if (line.startsWith("* ") || line.startsWith("- ")) {
        if (!currentSection) {
          currentSection = {
            title: "Recommendations",
            items: [],
          };
        }

        currentSection.items.push({
          type: "bullet",
          text: line.substring(2),
        });

        return;
      }

      // Continuation text
      if (currentSection) {
        currentSection.items.push({
          type: "text",
          text: line,
        });
      }
    });

    if (currentSection) {
      sections.push(currentSection);
    }

    return sections;
  };

  /*
   * Render Gemini Markdown formatting.
   */
  const renderFormattedText = (text) => {
    if (!text) return null;

    const parts = text.split(
      /(\*\*.*?\*\*)/g
    );

    return parts.map((part, index) => {
      if (
        part.startsWith("**") &&
        part.endsWith("**")
      ) {
        return (
          <strong
            key={index}
            className="font-semibold text-slate-800"
          >
            {part.slice(2, -2)}
          </strong>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  const sections = formatInsight(insight);

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      {/* Header */}

      <div className="mb-8">

        <p className="text-sm font-semibold tracking-wide text-teal-600">
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

        {loading && (

          <div className="flex flex-col items-center justify-center py-16">

            <div className="w-12 h-12 border-4 border-slate-200 border-t-teal-600 rounded-full animate-spin" />

            <p className="text-slate-500 mt-5">
              Analyzing your transactions...
            </p>

            <p className="text-xs text-slate-400 mt-2">
              PennyPilot AI is reviewing your spending patterns
            </p>

          </div>

        )}


        {/* Error */}

        {!loading && error && (

          <div className="text-center py-12">

            <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center text-3xl">
              ⚠️
            </div>

            <h2 className="text-xl font-semibold text-slate-800 mt-5">
              Something went wrong
            </h2>

            <p className="text-red-500 mt-2">
              {error}
            </p>

            <button
              onClick={fetchInsight}
              className="mt-6 bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              Try Again
            </button>

          </div>

        )}


        {/* AI Result */}

        {!loading && !error && insight && (

          <div>

            {/* AI Header */}

            <div className="flex items-center justify-between mb-8">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-3xl">
                  💡
                </div>

                <div>

                  <h2 className="text-2xl font-bold text-slate-800">
                    Your Financial Insights
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Generated from your PennyPilot transactions
                  </p>

                </div>

              </div>

            </div>


            {/* Sections */}

            <div className="space-y-8">

              {sections &&
                sections.map(
                  (section, sectionIndex) => (

                    <div
                      key={sectionIndex}
                      className="border border-slate-100 rounded-2xl overflow-hidden"
                    >

                      {/* Section Header */}

                      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">

                        <h3 className="text-lg font-bold text-slate-800">
                          {section.title}
                        </h3>

                      </div>


                      {/* Section Content */}

                      <div className="p-6 space-y-4">

                        {section.items.map(
                          (item, itemIndex) => {

                            if (
                              item.type === "number"
                            ) {
                              return (
                                <div
                                  key={itemIndex}
                                  className="flex gap-4"
                                >

                                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold"
                                  >
                                    {item.number}
                                  </div>

                                  <div className="flex-1 text-slate-600 leading-7">
                                    {renderFormattedText(
                                      item.text
                                    )}
                                  </div>

                                </div>
                              );
                            }

                            if (
                              item.type === "bullet"
                            ) {
                              return (
                                <div
                                  key={itemIndex}
                                  className="flex gap-3"
                                >

                                  <span className="text-teal-600 text-xl leading-6">
                                    •
                                  </span>

                                  <p className="text-slate-600 leading-7">
                                    {renderFormattedText(
                                      item.text
                                    )}
                                  </p>

                                </div>
                              );
                            }

                            return (
                              <p
                                key={itemIndex}
                                className="text-slate-600 leading-7"
                              >
                                {renderFormattedText(
                                  item.text
                                )}
                              </p>
                            );
                          }
                        )}

                      </div>

                    </div>

                  )
                )}

            </div>


            {/* Refresh */}

            <div className="flex justify-end mt-8">

              <button
                onClick={fetchInsight}
                className="bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-700 transition flex items-center gap-2"
              >
                🔄 Refresh Insights
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Insights;