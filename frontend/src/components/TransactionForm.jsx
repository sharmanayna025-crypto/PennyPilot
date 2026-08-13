import { useEffect, useState } from "react";

function TransactionForm({
  addTransaction,
  editingTransaction,
  updateTransaction,
}) {

  const [transaction, setTransaction] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });


  useEffect(() => {

    if (editingTransaction) {

      setTransaction({
        title: editingTransaction.title || "",
        amount: editingTransaction.amount || "",
        type: editingTransaction.type?.toLowerCase() || "expense",
        category: editingTransaction.category || "Food",
        date:
          editingTransaction.date ||
          new Date().toISOString().split("T")[0],
      });

    }

  }, [editingTransaction]);


  const handleChange = (e) => {

    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value,
    });

  };


  const resetForm = () => {

    setTransaction({
      title: "",
      amount: "",
      type: "expense",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();


    if (!transaction.title.trim()) {

      alert("Please enter a transaction title.");

      return;

    }


    if (
      !transaction.amount ||
      Number(transaction.amount) <= 0
    ) {

      alert("Please enter a valid amount.");

      return;

    }


    if (!transaction.date) {

      alert("Please select a date.");

      return;

    }


    const transactionData = {
      title: transaction.title.trim(),
      amount: Number(transaction.amount),
      type: transaction.type.toLowerCase(),
      category: transaction.category,
      date: transaction.date,
    };


    try {

      if (editingTransaction) {

        await updateTransaction(
          editingTransaction.id,
          transactionData
        );

      } else {

        await addTransaction(
          transactionData
        );

      }

      resetForm();

    } catch (error) {

      console.error(
        "Error saving transaction:",
        error
      );

    }

  };


  const isEditing =
    Boolean(editingTransaction);


  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
    >


      {/* HEADER */}

      <div className="mb-6">

        <p className="text-sm font-semibold text-teal-600">
          {isEditing
            ? "Update Transaction"
            : "New Transaction"}
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mt-1">

          {isEditing
            ? "Edit Transaction"
            : "Add Transaction"}

        </h2>

        <p className="text-sm text-slate-500 mt-1">

          {isEditing
            ? "Update the details of this transaction."
            : "Record your income or expenses."}

        </p>

      </div>


      {/* TITLE */}

      <div className="mb-4">

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Transaction Title
        </label>

        <input
          type="text"
          name="title"
          placeholder="e.g. Grocery Shopping"
          value={transaction.title}
          onChange={handleChange}
          className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />

      </div>


      {/* AMOUNT */}

      <div className="mb-4">

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Amount
        </label>

        <div className="relative">

          <span className="absolute left-4 top-3 text-slate-500 font-medium">
            ₹
          </span>

          <input
            type="number"
            name="amount"
            placeholder="0"
            min="0.01"
            step="0.01"
            value={transaction.amount}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-xl p-3 pl-9 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

        </div>

      </div>


      {/* TYPE */}

      <div className="mb-4">

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Transaction Type
        </label>

        <select
          name="type"
          value={transaction.type}
          onChange={handleChange}
          className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >

          <option value="expense">
            Expense
          </option>

          <option value="income">
            Income
          </option>

        </select>

      </div>


      {/* CATEGORY */}

      <div className="mb-4">

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Category
        </label>

        <select
          name="category"
          value={transaction.category}
          onChange={handleChange}
          className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >

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

      </div>


      {/* DATE */}

      <div className="mb-6">

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Date
        </label>

        <input
          type="date"
          name="date"
          value={transaction.date}
          onChange={handleChange}
          className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />

      </div>


      {/* BUTTONS */}

      <div className="flex gap-3">


        <button
          type="submit"
          className="flex-1 bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition"
        >

          {isEditing
            ? "Update Transaction"
            : "Save Transaction"}

        </button>


        {isEditing && (

          <button
            type="button"
            onClick={resetForm}
            className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition"
          >
            Cancel
          </button>

        )}

      </div>

    </form>

  );
}

export default TransactionForm;