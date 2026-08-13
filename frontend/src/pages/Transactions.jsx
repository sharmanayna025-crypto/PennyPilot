import { useEffect, useMemo, useState } from "react";

import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

import {
  getTransactions,
  addTransaction as saveTransaction,
  deleteTransaction as removeTransaction,
  updateTransaction as editTransaction,
} from "../services/transactionService";

import { exportTransactionsCSV } from "../utils/exportCSV";

function Transactions() {

  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");


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


  const addTransaction = async (transaction) => {

    try {

      await saveTransaction(transaction);

      await fetchTransactions();

    } catch (error) {

      console.error(
        "Error adding transaction:",
        error
      );

    }

  };


  const deleteTransaction = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) {
      return;
    }

    try {

      await removeTransaction(id);

      await fetchTransactions();

    } catch (error) {

      console.error(
        "Error deleting transaction:",
        error
      );

    }

  };


  const updateTransaction = async (
    id,
    transaction
  ) => {

    try {

      await editTransaction(
        id,
        transaction
      );

      setEditingTransaction(null);

      await fetchTransactions();

    } catch (error) {

      console.error(
        "Error updating transaction:",
        error
      );

    }

  };


  const filteredTransactions = useMemo(() => {

    let filtered = transactions.filter(
      (transaction) => {

        const title =
          transaction.title?.toLowerCase() || "";

        const category =
          transaction.category?.toLowerCase() || "";

        const searchText =
          search.toLowerCase();

        const matchesSearch =
          title.includes(searchText) ||
          category.includes(searchText);


        const transactionType =
          transaction.type?.toLowerCase();


        const matchesType =
          typeFilter === "all" ||
          transactionType ===
            typeFilter.toLowerCase();


        const matchesCategory =
          categoryFilter === "all" ||
          transaction.category ===
            categoryFilter;


        return (
          matchesSearch &&
          matchesType &&
          matchesCategory
        );

      }
    );


    switch (sortBy) {

      case "highest":

        filtered.sort(
          (a, b) =>
            Number(b.amount || 0) -
            Number(a.amount || 0)
        );

        break;


      case "lowest":

        filtered.sort(
          (a, b) =>
            Number(a.amount || 0) -
            Number(b.amount || 0)
        );

        break;


      case "oldest":

        filtered.sort(
          (a, b) =>
            new Date(a.date) -
            new Date(b.date)
        );

        break;


      case "az":

        filtered.sort(
          (a, b) =>
            (a.title || "").localeCompare(
              b.title || ""
            )
        );

        break;


      case "za":

        filtered.sort(
          (a, b) =>
            (b.title || "").localeCompare(
              a.title || ""
            )
        );

        break;


      default:

        filtered.sort(
          (a, b) =>
            new Date(b.date) -
            new Date(a.date)
        );

    }


    return filtered;

  }, [
    transactions,
    search,
    typeFilter,
    categoryFilter,
    sortBy,
  ]);


  const totalIncome =
    filteredTransactions
      .filter(
        (transaction) =>
          transaction.type?.toLowerCase() ===
          "income"
      )
      .reduce(
        (sum, transaction) =>
          sum +
          Number(transaction.amount || 0),
        0
      );


  const totalExpense =
    filteredTransactions
      .filter(
        (transaction) =>
          transaction.type?.toLowerCase() ===
          "expense"
      )
      .reduce(
        (sum, transaction) =>
          sum +
          Number(transaction.amount || 0),
        0
      );


  return (

    <div className="min-h-screen bg-slate-50 p-6 md:p-8">


      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>

          <p className="text-sm font-semibold text-teal-600">
            Financial Activity
          </p>

          <h1 className="text-4xl font-bold text-slate-800 mt-1">
            Transactions
          </h1>

          <p className="text-slate-500 mt-2">
            Manage and track your income and expenses.
          </p>

        </div>


        <button
          onClick={() =>
            exportTransactionsCSV(
              filteredTransactions
            )
          }
          className="bg-teal-600 text-white px-5 py-3 rounded-xl hover:bg-teal-700 transition font-semibold"
        >
          Export CSV
        </button>

      </div>


      {/* SUMMARY */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">


        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">

          <p className="text-sm text-slate-500">
            Showing Transactions
          </p>

          <p className="text-2xl font-bold text-slate-800 mt-1">
            {filteredTransactions.length}
          </p>

        </div>


        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">

          <p className="text-sm text-slate-500">
            Income
          </p>

          <p className="text-2xl font-bold text-green-600 mt-1">
            ₹ {totalIncome.toLocaleString("en-IN")}
          </p>

        </div>


        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">

          <p className="text-sm text-slate-500">
            Expenses
          </p>

          <p className="text-2xl font-bold text-red-500 mt-1">
            ₹ {totalExpense.toLocaleString("en-IN")}
          </p>

        </div>

      </div>


      {/* SEARCH / FILTER / SORT */}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8">

        <div className="mb-5">

          <h2 className="text-xl font-bold text-slate-800">
            Find Transactions
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Search, filter, and sort your financial activity.
          </p>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">


          {/* SEARCH */}

          <div className="relative">

            <input
              type="text"
              placeholder="Search title or category..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border border-slate-200 rounded-xl p-3 pl-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

          </div>


          {/* TYPE */}

          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value)
            }
            className="border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >

            <option value="all">
              All Types
            </option>

            <option value="income">
              Income
            </option>

            <option value="expense">
              Expense
            </option>

          </select>


          {/* CATEGORY */}

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
            className="border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >

            <option value="all">
              All Categories
            </option>

            <option value="Food">
              Food
            </option>

            <option value="Salary">
              Salary
            </option>

            <option value="Shopping">
              Shopping
            </option>

            <option value="Travel">
              Travel
            </option>

            <option value="Entertainment">
              Entertainment
            </option>

            <option value="Health">
              Health
            </option>

            <option value="Education">
              Education
            </option>

            <option value="Bills">
              Bills
            </option>

            <option value="Other">
              Other
            </option>

          </select>


          {/* SORT */}

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >

            <option value="newest">
              Newest First
            </option>

            <option value="oldest">
              Oldest First
            </option>

            <option value="highest">
              Highest Amount
            </option>

            <option value="lowest">
              Lowest Amount
            </option>

            <option value="az">
              A - Z
            </option>

            <option value="za">
              Z - A
            </option>

          </select>

        </div>


        {/* CLEAR FILTERS */}

        {(search ||
          typeFilter !== "all" ||
          categoryFilter !== "all" ||
          sortBy !== "newest") && (

          <button
            onClick={() => {

              setSearch("");
              setTypeFilter("all");
              setCategoryFilter("all");
              setSortBy("newest");

            }}
            className="mt-5 text-sm text-teal-600 font-semibold hover:text-teal-700"
          >
            Clear filters
          </button>

        )}

      </div>


      {/* FORM + LIST */}

      <div className="grid lg:grid-cols-2 gap-8">

        <TransactionForm
          addTransaction={addTransaction}
          editingTransaction={
            editingTransaction
          }
          updateTransaction={
            updateTransaction
          }
        />


        <TransactionList
          transactions={
            filteredTransactions
          }
          deleteTransaction={
            deleteTransaction
          }
          editTransaction={
            setEditingTransaction
          }
        />

      </div>


    </div>

  );
}

export default Transactions;