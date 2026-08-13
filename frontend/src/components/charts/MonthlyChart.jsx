import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function MonthlyChart({ transactions }) {

  const months = {};

  transactions.forEach((t) => {

    const month = new Date(t.date).toLocaleString(
      "default",
      {
        month: "short",
      }
    );

    if (!months[month]) {

      months[month] = {
        month,
        income: 0,
        expense: 0,
      };

    }

    if (t.type === "income") {

      months[month].income += Number(t.amount);

    } else {

      months[month].expense += Number(t.amount);

    }

  });

  const data = Object.values(months);

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">
        Monthly Overview
      </h2>

      <ResponsiveContainer width="100%" height={320}>

        <BarChart data={data}>

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar dataKey="income" fill="#16A34A" />

          <Bar dataKey="expense" fill="#DC2626" />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );
}

export default MonthlyChart;