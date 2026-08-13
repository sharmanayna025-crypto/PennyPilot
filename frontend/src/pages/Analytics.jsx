import { useEffect, useMemo, useState } from "react";

import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart,
} from "lucide-react";

import { getTransactions } from "../services/transactionService";

import IncomeExpenseChart from "../components/IncomeExpenseChart";
import ExpensePieChart from "../components/charts/ExpensePieChart";

function Analytics() {

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


  const analytics = useMemo(() => {

    const incomeTransactions =
      transactions.filter(
        (transaction) =>
          transaction.type === "income"
      );


    const expenseTransactions =
      transactions.filter(
        (transaction) =>
          transaction.type === "expense"
      );


    const income =
      incomeTransactions.reduce(
        (sum, transaction) =>
          sum +
          Number(transaction.amount || 0),
        0
      );


    const expenses =
      expenseTransactions.reduce(
        (sum, transaction) =>
          sum +
          Number(transaction.amount || 0),
        0
      );


    const balance =
      income - expenses;


    const savingsRate =
      income > 0
        ? (balance / income) * 100
        : 0;


    const categoryTotals = {};


    expenseTransactions.forEach(
      (transaction) => {

        const category =
          transaction.category ||
          "Other";


        categoryTotals[category] =
          (categoryTotals[category] || 0) +
          Number(transaction.amount || 0);

      }
    );


    const topCategory =
      Object.entries(categoryTotals)
        .sort(
          (a, b) =>
            b[1] - a[1]
        )[0];


    return {

      income,

      expenses,

      balance,

      savingsRate,

      topCategory,

      totalTransactions:
        transactions.length,

    };

  }, [transactions]);


  const formatCurrency = (amount) =>
    `₹${Number(amount).toLocaleString("en-IN")}`;


  return (

    <div className="min-h-screen bg-slate-50 p-8">


      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Analytics
        </h1>

        <p className="text-slate-500 mt-2">
          Understand your spending habits and financial patterns.
        </p>

      </div>


      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">


        {/* Income */}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">

          <div className="flex justify-between items-start">

            <div>

              <p className="text-sm text-slate-500">
                Total Income
              </p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {formatCurrency(
                  analytics.income
                )}
              </h2>

            </div>


            <div className="p-3 rounded-xl bg-green-50">

              <TrendingUp
                size={22}
                className="text-green-600"
              />

            </div>

          </div>

        </div>


        {/* Expenses */}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">

          <div className="flex justify-between items-start">

            <div>

              <p className="text-sm text-slate-500">
                Total Expenses
              </p>

              <h2 className="text-3xl font-bold text-red-500 mt-2">
                {formatCurrency(
                  analytics.expenses
                )}
              </h2>

            </div>


            <div className="p-3 rounded-xl bg-red-50">

              <TrendingDown
                size={22}
                className="text-red-500"
              />

            </div>

          </div>

        </div>


        {/* Balance */}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">

          <div className="flex justify-between items-start">

            <div>

              <p className="text-sm text-slate-500">
                Net Balance
              </p>

              <h2 className="text-3xl font-bold text-teal-600 mt-2">
                {formatCurrency(
                  analytics.balance
                )}
              </h2>

            </div>


            <div className="p-3 rounded-xl bg-teal-50">

              <Wallet
                size={22}
                className="text-teal-600"
              />

            </div>

          </div>

        </div>


        {/* Savings Rate */}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">

          <div className="flex justify-between items-start">

            <div>

              <p className="text-sm text-slate-500">
                Savings Rate
              </p>

              <h2 className="text-3xl font-bold text-blue-600 mt-2">
                {analytics.savingsRate.toFixed(1)}%
              </h2>

            </div>


            <div className="p-3 rounded-xl bg-blue-50">

              <PieChart
                size={22}
                className="text-blue-600"
              />

            </div>

          </div>

        </div>

      </div>


      {/* Income vs Expense */}

      <div className="mt-8">

        <IncomeExpenseChart
          transactions={transactions}
        />

      </div>


      {/* Expense Breakdown */}

      <div className="mt-8">

        <ExpensePieChart
          transactions={transactions}
        />

      </div>


      {/* Spending Insights */}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mt-8">

        <h2 className="text-2xl font-bold text-slate-800">
          Spending Insights
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          A quick look at your financial activity.
        </p>


        <div className="grid md:grid-cols-3 gap-5 mt-6">


          {/* Transactions */}

          <div className="bg-slate-50 rounded-xl p-5">

            <p className="text-sm text-slate-500">
              Transactions
            </p>

            <p className="text-2xl font-bold text-slate-800 mt-2">
              {analytics.totalTransactions}
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Recorded transactions
            </p>

          </div>


          {/* Highest Category */}

          <div className="bg-slate-50 rounded-xl p-5">

            <p className="text-sm text-slate-500">
              Highest Spending Category
            </p>

            <p className="text-2xl font-bold text-slate-800 mt-2">

              {analytics.topCategory
                ? analytics.topCategory[0]
                : "—"}

            </p>


            {analytics.topCategory && (

              <p className="text-xs text-slate-400 mt-1">

                {formatCurrency(
                  analytics.topCategory[1]
                )}

                {" "}spent

              </p>

            )}

          </div>


          {/* Financial Status */}

          <div className="bg-slate-50 rounded-xl p-5">

            <p className="text-sm text-slate-500">
              Financial Status
            </p>


            <p
              className={`text-2xl font-bold mt-2 ${
                analytics.balance >= 0
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >

              {analytics.balance >= 0
                ? "Positive"
                : "Negative"}

            </p>


            <p className="text-xs text-slate-400 mt-1">
              Based on income and expenses
            </p>

          </div>


        </div>

      </div>


    </div>

  );

}

export default Analytics;