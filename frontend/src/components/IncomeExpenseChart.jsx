import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function IncomeExpenseChart({ transactions }) {
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce(
      (sum, transaction) =>
        sum + Number(transaction.amount || 0),
      0
    );

  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce(
      (sum, transaction) =>
        sum + Number(transaction.amount || 0),
      0
    );

  const data = {
    labels: ["Income", "Expenses"],

    datasets: [
      {
        label: "Amount",

        data: [income, expenses],

        backgroundColor: [
          "#22c55e",
          "#ef4444",
        ],

        borderRadius: 8,

        barThickness: 70,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            return ` ₹${Number(
              context.raw
            ).toLocaleString("en-IN")}`;
          },
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          callback: function (value) {
            return `₹${Number(value).toLocaleString("en-IN")}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mt-8">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Income vs Expenses
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Compare your total income with your spending.
        </p>
      </div>

      <div className="h-80">
        <Bar
          data={data}
          options={options}
        />
      </div>

    </div>
  );
}

export default IncomeExpenseChart;