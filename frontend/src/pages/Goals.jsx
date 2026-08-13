import { useEffect, useState } from "react";

import GoalForm from "../components/GoalForm";
import GoalList from "../components/GoalList";

import {
  getGoals,
  addGoal as saveGoal,
  updateGoal as editGoal,
  deleteGoal as removeGoal,
} from "../services/goalService";

function Goals() {

  const [goals, setGoals] = useState([]);

  const [editingGoal, setEditingGoal] = useState(null);


  useEffect(() => {
    fetchGoals();
  }, []);


  const fetchGoals = async () => {

    try {

      const response = await getGoals();

      const formattedGoals = response.data.map((goal) => ({

        id: goal.id,

        name: goal.name,

        targetAmount:
          Number(goal.targetAmount) || 0,

        savedAmount:
          Number(goal.savedAmount) || 0,

      }));

      setGoals(formattedGoals);

    } catch (error) {

      console.error(
        "Failed to fetch goals:",
        error
      );

    }

  };


  const addGoal = async (goal) => {

    try {

      await saveGoal(goal);

      await fetchGoals();

    } catch (error) {

      console.error(
        "Failed to add goal:",
        error
      );

    }

  };


  const updateGoal = async (
    id,
    goal
  ) => {

    try {

      await editGoal(id, goal);

      setEditingGoal(null);

      await fetchGoals();

    } catch (error) {

      console.error(
        "Failed to update goal:",
        error
      );

    }

  };


  const deleteGoal = async (id) => {

    try {

      await removeGoal(id);

      await fetchGoals();

    } catch (error) {

      console.error(
        "Failed to delete goal:",
        error
      );

    }

  };


  return (

    <div className="min-h-screen bg-slate-50 p-8">


      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Savings Goals
        </h1>

        <p className="text-slate-500 mt-2">
          Plan your savings and track your progress toward your goals.
        </p>

      </div>


      <div className="grid lg:grid-cols-2 gap-8">


        <GoalForm
          addGoal={addGoal}
          editingGoal={editingGoal}
          updateGoal={updateGoal}
        />


        <GoalList
          goals={goals}
          deleteGoal={deleteGoal}
          editGoal={setEditingGoal}
        />


      </div>


    </div>

  );
}

export default Goals;