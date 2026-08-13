import { useState } from "react";

function BudgetForm({ addBudget }) {
  const [budget, setBudget] = useState({
    category: "Food",
    limitAmount: "",
  });

  const handleChange = (e) => {
    setBudget({
      ...budget,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!budget.limitAmount || Number(budget.limitAmount) <= 0) {
      return;
    }

    await addBudget(budget);

    setBudget({
      category: "Food",
      limitAmount: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Create Budget
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Set a monthly spending limit for a category.
        </p>
      </div>

      <label className="block text-sm font-medium text-slate-600 mb-2">
        Category
      </label>

      <select
        name="category"
        value={budget.category}
        onChange={handleChange}
        className="w-full border border-slate-200 rounded-lg p-3 mb-5 focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Health">Health</option>
        <option value="Education">Education</option>
        <option value="Bills">Bills</option>
        <option value="Other">Other</option>
      </select>

      <label className="block text-sm font-medium text-slate-600 mb-2">
        Monthly Limit
      </label>

      <div className="relative mb-6">
        <span className="absolute left-3 top-3 text-slate-400">
          ₹
        </span>

        <input
          type="number"
          name="limitAmount"
          placeholder="e.g. 10000"
          value={budget.limitAmount}
          onChange={handleChange}
          min="1"
          className="w-full border border-slate-200 rounded-lg p-3 pl-8 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
      >
        Save Budget
      </button>
    </form>
  );
}

export default BudgetForm;