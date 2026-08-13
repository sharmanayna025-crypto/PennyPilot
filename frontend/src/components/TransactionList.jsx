function TransactionList({
  transactions,
  deleteTransaction,
  editTransaction,
}) {

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Your Transactions
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          View and manage your financial activity.
        </p>

      </div>


      {/* Empty State */}

      {transactions.length === 0 ? (

        <div className="text-center py-12">

          <div className="text-4xl mb-4">
            💳
          </div>

          <p className="text-slate-600 font-semibold">
            No transactions found
          </p>

          <p className="text-sm text-slate-400 mt-2">
            Try changing your filters or add a new transaction.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {transactions.map((transaction) => {

            const isIncome =
              transaction.type?.toLowerCase() ===
              "income";

            const amount = Number(
              transaction.amount || 0
            );


            return (

              <div
                key={transaction.id}
                className="border border-slate-100 rounded-xl p-4 hover:shadow-sm hover:border-slate-200 transition"
              >

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">


                  {/* LEFT */}

                  <div className="flex items-center gap-4">

                    {/* Icon */}

                    <div
                      className={
                        isIncome
                          ? "w-11 h-11 rounded-full bg-green-50 flex items-center justify-center text-green-600 text-lg font-bold"
                          : "w-11 h-11 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-lg font-bold"
                      }
                    >

                      {isIncome ? "↑" : "↓"}

                    </div>


                    {/* Details */}

                    <div>

                      <h3 className="font-semibold text-slate-800">
                        {transaction.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2 mt-1">

                        <span className="text-sm text-slate-500">
                          {transaction.category}
                        </span>

                        <span className="text-slate-300">
                          •
                        </span>

                        <span className="text-xs text-slate-400">
                          {transaction.date}
                        </span>

                      </div>

                    </div>

                  </div>


                  {/* RIGHT */}

                  <div className="flex items-center justify-between sm:justify-end gap-5">


                    {/* Amount */}

                    <div className="text-right">

                      <p
                        className={
                          isIncome
                            ? "font-bold text-green-600"
                            : "font-bold text-red-500"
                        }
                      >

                        {isIncome ? "+" : "-"} ₹{" "}
                        {amount.toLocaleString("en-IN")}

                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {isIncome
                          ? "Income"
                          : "Expense"}
                      </p>

                    </div>


                    {/* Buttons */}

                    <div className="flex items-center gap-2">

                      <button
                        onClick={() =>
                          editTransaction(
                            transaction
                          )
                        }
                        className="px-3 py-2 text-sm font-medium text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 transition"
                      >
                        Edit
                      </button>


                      <button
                        onClick={() =>
                          deleteTransaction(
                            transaction.id
                          )
                        }
                        className="px-3 py-2 text-sm font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>
  );
}

export default TransactionList;