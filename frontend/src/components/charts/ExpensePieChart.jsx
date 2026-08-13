import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#14B8A6",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#10B981",
  "#EC4899",
  "#6366F1",
];

function ExpensePieChart({ transactions }) {

  const categoryTotals = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {

      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) +
        Number(t.amount);

    });

  const data = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Expense Categories
        </h2>

        <p className="text-slate-500">
          No expense data available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">
        Expense Categories
      </h2>

      <ResponsiveContainer width="100%" height={320}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >

            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default ExpensePieChart;