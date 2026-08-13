function DashboardSummary({ transactions }) {

  const income = transactions
    .filter((t) => t.type.toLowerCase() === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type.toLowerCase() === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expense;

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
        <h3 className="text-slate-500 text-sm font-medium">
          💰 Total Balance
        </h3>

        <p className="text-3xl font-bold text-teal-600 mt-2">
          {formatCurrency(balance)}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
        <h3 className="text-slate-500 text-sm font-medium">
          📈 Total Income
        </h3>

        <p className="text-3xl font-bold text-green-600 mt-2">
          {formatCurrency(income)}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
        <h3 className="text-slate-500 text-sm font-medium">
          📉 Total Expense
        </h3>

        <p className="text-3xl font-bold text-red-600 mt-2">
          {formatCurrency(expense)}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
        <h3 className="text-slate-500 text-sm font-medium">
          📋 Transactions
        </h3>

        <p className="text-3xl font-bold text-indigo-600 mt-2">
          {transactions.length}
        </p>
      </div>

    </div>
  );
}

export default DashboardSummary;