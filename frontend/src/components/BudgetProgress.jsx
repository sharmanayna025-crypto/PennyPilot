function BudgetProgress({ budgets, transactions }) {

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
          💰 Budget Overview
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          A quick look at how you're tracking across your budgets.
        </p>
      </div>

      {budgets.length === 0 ? (
        <p className="text-slate-500 text-center py-6">
          No budgets created yet.
        </p>
      ) : (
        <div className="space-y-6">

          {budgets.map((budget) => {

            const limit = Number(budget.limitAmount) || 0;
            const spent = getSpent(budget.category);

            const rawPercentage =
              limit > 0
                ? (spent / limit) * 100
                : 0;

            const percentage = Math.min(rawPercentage, 100);

            const exceeded = spent > limit;

            return (
              <div key={budget.id}>

                <div className="flex justify-between items-center mb-2">

                  <span className="font-semibold text-slate-700">
                    {budget.category}
                  </span>

                  <span
                    className={`text-sm font-semibold ${
                      exceeded
                        ? "text-red-500"
                        : "text-teal-600"
                    }`}
                  >
                    {rawPercentage.toFixed(0)}%
                  </span>

                </div>

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

                <div className="flex justify-between mt-2 text-sm text-slate-500">

                  <span>
                    ₹{spent.toLocaleString("en-IN")} spent
                  </span>

                  <span>
                    ₹{limit.toLocaleString("en-IN")} limit
                  </span>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default BudgetProgress;