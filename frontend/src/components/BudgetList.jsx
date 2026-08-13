function BudgetList({ budgets, transactions, deleteBudget }) {

  const getSpent = (category) => {
    return transactions
      .filter(
        (transaction) =>
          transaction.category === category &&
          transaction.type === "expense"
      )
      .reduce(
        (sum, transaction) => sum + Number(transaction.amount || 0),
        0
      );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Monthly Budgets
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Monitor your spending against each limit.
        </p>
      </div>

      {budgets.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">
            💰
          </div>

          <p className="text-slate-600 font-medium">
            No budgets yet.
          </p>

          <p className="text-sm text-slate-400 mt-2">
            Create a budget to start tracking your spending.
          </p>
        </div>
      ) : (
        <div className="space-y-5">

          {budgets.map((budget) => {

            const limit = Number(budget.limitAmount) || 0;
            const spent = getSpent(budget.category);

            const rawPercentage =
              limit > 0
                ? (spent / limit) * 100
                : 0;

            const percentage = Math.min(rawPercentage, 100);

            const remaining = Math.max(limit - spent, 0);

            const exceeded = spent > limit;

            return (
              <div
                key={budget.id}
                className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition"
              >

                <div className="flex justify-between items-start">

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      {budget.category}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      ₹{spent.toLocaleString("en-IN")} spent of ₹
                      {limit.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteBudget(budget.id)}
                    className="text-sm text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>

                </div>

                <div className="mt-5">

                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">

                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        exceeded
                          ? "bg-red-500"
                          : "bg-teal-600"
                      }`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                </div>

                <div className="flex justify-between mt-3">

                  <p
                    className={`text-sm font-medium ${
                      exceeded
                        ? "text-red-500"
                        : "text-slate-500"
                    }`}
                  >
                    {exceeded
                      ? `₹${(spent - limit).toLocaleString("en-IN")} over budget`
                      : `₹${remaining.toLocaleString("en-IN")} remaining`}
                  </p>

                  <p
                    className={`text-sm font-semibold ${
                      exceeded
                        ? "text-red-500"
                        : "text-teal-600"
                    }`}
                  >
                    {rawPercentage.toFixed(0)}%
                  </p>

                </div>

                {exceeded && (
                  <p className="mt-3 text-sm font-semibold text-red-500">
                    ⚠️ You've exceeded this budget.
                  </p>
                )}

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default BudgetList;