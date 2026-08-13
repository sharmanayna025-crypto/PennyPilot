import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function MonthlyTrendChart({ transactions }) {

  const monthlyExpenses = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((transaction) => {
      const month = new Date(transaction.date).toLocaleString("default", {
        month: "short",
      });

      monthlyExpenses[month] =
        (monthlyExpenses[month] || 0) + Number(transaction.amount);
    });

  const data = {
    labels: Object.keys(monthlyExpenses),

    datasets: [
      {
        label: "Monthly Expenses (₹)",
        data: Object.values(monthlyExpenses),
        borderColor: "#14b8a6",
        backgroundColor: "#14b8a6",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Monthly Expense Trend
      </h2>

      <Line data={data} options={options} />
    </div>
  );
}

export default MonthlyTrendChart;