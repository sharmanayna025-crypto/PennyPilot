import { useEffect, useState } from "react";

function GoalForm({
  addGoal,
  editingGoal,
  updateGoal,
}) {

  const [goal, setGoal] = useState({
    name: "",
    targetAmount: "",
    savedAmount: "",
  });


  useEffect(() => {

    if (editingGoal) {

      setGoal({
        name: editingGoal.name || "",
        targetAmount: editingGoal.targetAmount || "",
        savedAmount: editingGoal.savedAmount || "",
      });

    }

  }, [editingGoal]);


  const handleChange = (e) => {

    setGoal({
      ...goal,
      [e.target.name]: e.target.value,
    });

  };


  const resetForm = () => {

    setGoal({
      name: "",
      targetAmount: "",
      savedAmount: "",
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();


    if (!goal.name.trim()) {

      alert("Please enter a goal name.");

      return;

    }


    if (
      !goal.targetAmount ||
      Number(goal.targetAmount) <= 0
    ) {

      alert("Please enter a valid target amount.");

      return;

    }


    if (
      goal.savedAmount === "" ||
      Number(goal.savedAmount) < 0
    ) {

      alert("Please enter a valid saved amount.");

      return;

    }


    const goalData = {

      name: goal.name.trim(),

      targetAmount: Number(
        goal.targetAmount
      ),

      savedAmount: Number(
        goal.savedAmount
      ),

    };


    if (editingGoal) {

      await updateGoal(
        editingGoal.id,
        goalData
      );

    } else {

      await addGoal(
        goalData
      );

    }


    resetForm();

  };


  const isEditing =
    Boolean(editingGoal);


  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
    >

      <div className="mb-6">

        <p className="text-sm font-semibold text-teal-600">

          {isEditing
            ? "Update Goal"
            : "New Savings Goal"}

        </p>

        <h2 className="text-2xl font-bold text-slate-800 mt-1">

          {isEditing
            ? "Edit Savings Goal"
            : "Add Savings Goal"}

        </h2>

        <p className="text-sm text-slate-500 mt-1">

          {isEditing
            ? "Update your savings goal details."
            : "Set a target and track your progress."}

        </p>

      </div>


      <label className="block text-sm font-medium text-slate-700 mb-2">
        Goal Name
      </label>

      <input
        type="text"
        name="name"
        placeholder="e.g. Emergency Fund"
        value={goal.name}
        onChange={handleChange}
        className="w-full border border-slate-200 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
        required
      />


      <label className="block text-sm font-medium text-slate-700 mb-2">
        Target Amount
      </label>

      <input
        type="number"
        name="targetAmount"
        placeholder="₹50,000"
        min="1"
        step="0.01"
        value={goal.targetAmount}
        onChange={handleChange}
        className="w-full border border-slate-200 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
        required
      />


      <label className="block text-sm font-medium text-slate-700 mb-2">
        Amount Already Saved
      </label>

      <input
        type="number"
        name="savedAmount"
        placeholder="₹10,000"
        min="0"
        step="0.01"
        value={goal.savedAmount}
        onChange={handleChange}
        className="w-full border border-slate-200 rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-teal-500"
        required
      />


      <div className="flex gap-3">

        <button
          type="submit"
          className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
        >

          {isEditing
            ? "Update Goal"
            : "Save Goal"}

        </button>


        {isEditing && (

          <button
            type="button"
            onClick={resetForm}
            className="px-5 py-3 rounded-lg border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition"
          >
            Cancel
          </button>

        )}

      </div>

    </form>

  );
}

export default GoalForm;