import { useEffect, useState } from "react";

import BudgetForm from "../components/BudgetForm";
import BudgetList from "../components/BudgetList";
import BudgetProgress from "../components/BudgetProgress";

import {
  getBudgets,
  addBudget as saveBudget,
  deleteBudget as removeBudget,
} from "../services/budgetService";

import { getTransactions } from "../services/transactionService";

function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await Promise.all([
      fetchBudgets(),
      fetchTransactions(),
    ]);
  };

  const fetchBudgets = async () => {
    try {
      const response = await getBudgets();

      console.log("BUDGETS:", response.data);

      setBudgets(response.data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await getTransactions();

      console.log("TRANSACTIONS:", response.data);

      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const addBudget = async (budget) => {
    try {
      await saveBudget({
        category: budget.category,
        limitAmount: Number(budget.limitAmount),
      });

      await fetchBudgets();
    } catch (error) {
      console.error("Error adding budget:", error);
    }
  };

  const deleteBudget = async (id) => {
    try {
      await removeBudget(id);
      await fetchBudgets();
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Budgets
        </h1>

        <p className="text-slate-500 mt-2">
          Set spending limits and stay in control of your monthly expenses.
        </p>
      </div>

      {/* Add + List */}

      <div className="grid lg:grid-cols-2 gap-8">

        <BudgetForm addBudget={addBudget} />

        <BudgetList
          budgets={budgets}
          transactions={transactions}
          deleteBudget={deleteBudget}
        />

      </div>

      {/* Progress */}

      <div className="mt-8">
        <BudgetProgress
          budgets={budgets}
          transactions={transactions}
        />
      </div>

    </div>
  );
}

export default Budgets;