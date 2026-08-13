import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ExpenseChart({ transactions }) {
  const categories = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((transaction) => {
      categories[transaction.category] =
        (categories[transaction.category] || 0) +
        Number(transaction.amount);
    });

  const data = {
    labels: Object.keys(categories),

    datasets: [
      {
        data: Object.values(categories),

        backgroundColor: [
          "#14b8a6",
          "#3b82f6",
          "#f97316",
          "#ef4444",
          "#8b5cf6",
          "#22c55e",
          "#f59e0b",
          "#64748b",
        ],
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Expense Breakdown
      </h2>

      <Pie data={data} />
    </div>
  );
}

export default ExpenseChart;