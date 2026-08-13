import { useEffect, useState } from "react";

import { getTransactions } from "../services/transactionService";

import ExpensePieChart from "../components/charts/ExpensePieChart";
import MonthlyChart from "../components/charts/MonthlyChart";
import AIInsights from "../components/AIInsights";

function Dashboard() {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {

      const response = await getTransactions();

      setTransactions(response.data);

    } catch (error) {

      console.error(
        "Error fetching transactions:",
        error
      );

    }
  };


  // --------------------------------------------------
  // ALL-TIME CALCULATIONS
  // --------------------------------------------------

  const totalIncome = transactions
    .filter(
      (transaction) =>
        transaction.type?.toLowerCase() === "income"
    )
    .reduce(
      (sum, transaction) =>
        sum + Number(transaction.amount || 0),
      0
    );


  const totalExpense = transactions
    .filter(
      (transaction) =>
        transaction.type?.toLowerCase() === "expense"
    )
    .reduce(
      (sum, transaction) =>
        sum + Number(transaction.amount || 0),
      0
    );


  const totalBalance = totalIncome - totalExpense;


  // --------------------------------------------------
  // CURRENT MONTH CALCULATIONS
  // --------------------------------------------------

  const now = new Date();

  const currentMonth = now.getMonth();

  const currentYear = now.getFullYear();


  const monthlyTransactions = transactions.filter(
    (transaction) => {

      if (!transaction.date) {
        return false;
      }

      const transactionDate =
        new Date(transaction.date);

      return (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    }
  );


  const monthlyIncome = monthlyTransactions
    .filter(
      (transaction) =>
        transaction.type?.toLowerCase() === "income"
    )
    .reduce(
      (sum, transaction) =>
        sum + Number(transaction.amount || 0),
      0
    );


  const monthlyExpense = monthlyTransactions
    .filter(
      (transaction) =>
        transaction.type?.toLowerCase() === "expense"
    )
    .reduce(
      (sum, transaction) =>
        sum + Number(transaction.amount || 0),
      0
    );


  const monthlySavings =
    monthlyIncome - monthlyExpense;


  const savingsRate =
    monthlyIncome > 0
      ? (monthlySavings / monthlyIncome) * 100
      : 0;


  // --------------------------------------------------
  // MONTH NAME
  // --------------------------------------------------

  const monthName = now.toLocaleString(
    "en-IN",
    {
      month: "long",
    }
  );


  return (

    <div className="min-h-screen bg-slate-50 p-6 md:p-8">


      {/* HEADER */}

      <div className="mb-8">

        <p className="text-sm font-semibold text-teal-600">
          Financial Overview
        </p>

        <h1 className="text-4xl font-bold text-slate-800 mt-1">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Here's an overview of your financial activity.
        </p>

      </div>


      {/* ALL-TIME OVERVIEW */}

      <div className="mb-4">

        <h2 className="text-xl font-bold text-slate-800">
          Overall Finances
        </h2>

      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">


        {/* TOTAL BALANCE */}

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

          <p className="text-sm font-medium text-slate-500">
            Total Balance
          </p>

          <p className="text-3xl font-bold text-teal-600 mt-2">
            ₹ {totalBalance.toLocaleString("en-IN")}
          </p>

          <p className="text-xs text-slate-400 mt-2">
            Income minus expenses
          </p>

        </div>


        {/* TOTAL INCOME */}

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

          <p className="text-sm font-medium text-slate-500">
            Total Income
          </p>

          <p className="text-3xl font-bold text-green-600 mt-2">
            ₹ {totalIncome.toLocaleString("en-IN")}
          </p>

          <p className="text-xs text-slate-400 mt-2">
            All recorded income
          </p>

        </div>


        {/* TOTAL EXPENSE */}

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

          <p className="text-sm font-medium text-slate-500">
            Total Expenses
          </p>

          <p className="text-3xl font-bold text-red-500 mt-2">
            ₹ {totalExpense.toLocaleString("en-IN")}
          </p>

          <p className="text-xs text-slate-400 mt-2">
            All recorded expenses
          </p>

        </div>


        {/* SAVINGS */}

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

          <p className="text-sm font-medium text-slate-500">
            Overall Savings
          </p>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            ₹ {Math.max(
              totalBalance,
              0
            ).toLocaleString("en-IN")}
          </p>

          <p className="text-xs text-slate-400 mt-2">
            Current net balance
          </p>

        </div>

      </div>


      {/* MONTHLY OVERVIEW */}

      <div className="mb-4">

        <h2 className="text-xl font-bold text-slate-800">
          {monthName} Overview
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Your financial activity this month.
        </p>

      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">


        {/* MONTHLY INCOME */}

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

          <p className="text-sm text-slate-500">
            Monthly Income
          </p>

          <p className="text-2xl font-bold text-green-600 mt-2">
            ₹ {monthlyIncome.toLocaleString("en-IN")}
          </p>

        </div>


        {/* MONTHLY EXPENSE */}

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

          <p className="text-sm text-slate-500">
            Monthly Expenses
          </p>

          <p className="text-2xl font-bold text-red-500 mt-2">
            ₹ {monthlyExpense.toLocaleString("en-IN")}
          </p>

        </div>


        {/* MONTHLY SAVINGS */}

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

          <p className="text-sm text-slate-500">
            Monthly Savings
          </p>

          <p
            className={
              monthlySavings >= 0
                ? "text-2xl font-bold text-teal-600 mt-2"
                : "text-2xl font-bold text-red-500 mt-2"
            }
          >
            ₹ {monthlySavings.toLocaleString("en-IN")}
          </p>

        </div>


        {/* SAVINGS RATE */}

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

          <p className="text-sm text-slate-500">
            Savings Rate
          </p>

          <p className="text-2xl font-bold text-blue-600 mt-2">
            {Math.max(
              savingsRate,
              0
            ).toFixed(1)}%
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Of monthly income
          </p>

        </div>

      </div>


      {/* RECENT TRANSACTIONS */}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Recent Transactions
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Your latest financial activity.
            </p>

          </div>

          <span className="text-sm text-slate-400">
            {transactions.length} total
          </span>

        </div>


        {transactions.length === 0 ? (

          <div className="text-center py-10">

            <p className="text-slate-500">
              No transactions available.
            </p>

            <p className="text-sm text-slate-400 mt-1">
              Add a transaction to see it here.
            </p>

          </div>

        ) : (

          <div className="space-y-3">

            {transactions
              .slice()
              .reverse()
              .slice(0, 5)
              .map((transaction) => (

                <div
                  key={transaction.id}
                  className="flex justify-between items-center border border-slate-100 rounded-xl p-4 hover:bg-slate-50 transition"
                >

                  <div className="flex items-center gap-4">

                    <div
                      className={
                        transaction.type?.toLowerCase() ===
                        "income"
                          ? "w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600"
                          : "w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500"
                      }
                    >

                      {transaction.type?.toLowerCase() ===
                      "income"
                        ? "↑"
                        : "↓"}

                    </div>


                    <div>

                      <h3 className="font-semibold text-slate-800">
                        {transaction.title}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {transaction.category}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {transaction.date}
                      </p>

                    </div>

                  </div>


                  <p
                    className={
                      transaction.type?.toLowerCase() ===
                      "income"
                        ? "text-green-600 font-bold"
                        : "text-red-500 font-bold"
                    }
                  >

                    {transaction.type?.toLowerCase() ===
                    "income"
                      ? "+"
                      : "-"}{" "}

                    ₹{" "}
                    {Number(
                      transaction.amount || 0
                    ).toLocaleString("en-IN")}

                  </p>

                </div>

              ))}

          </div>

        )}

      </div>


      {/* CHARTS */}

      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        <ExpensePieChart
          transactions={transactions}
        />

        <MonthlyChart
          transactions={transactions}
        />

      </div>


      {/* AI INSIGHTS */}

      <AIInsights />

    </div>

  );
}

export default Dashboard;