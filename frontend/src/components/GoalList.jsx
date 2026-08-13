function GoalList({
  goals,
  deleteGoal,
  editGoal,
}) {

  return (

    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Your Goals
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Track your progress toward your financial goals.
        </p>

      </div>


      {goals.length === 0 ? (

        <div className="text-center py-12">

          <div className="text-4xl mb-4">
            🎯
          </div>

          <p className="text-slate-600 font-medium">
            No savings goals yet.
          </p>

          <p className="text-sm text-slate-400 mt-2">
            Create your first goal to start saving.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {goals.map((goal) => {

            const target =
              Number(goal.targetAmount) || 0;

            const saved =
              Number(goal.savedAmount) || 0;

            const percentage =
              target > 0
                ? Math.min(
                    (saved / target) * 100,
                    100
                  )
                : 0;

            const remaining =
              Math.max(
                target - saved,
                0
              );


            return (

              <div
                key={goal.id}
                className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h3 className="text-lg font-semibold text-slate-800">
                      {goal.name}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">

                      ₹{saved.toLocaleString("en-IN")} saved of ₹
                      {target.toLocaleString("en-IN")}

                    </p>

                  </div>


                  <div className="text-right">

                    <p className="text-xl font-bold text-teal-600">
                      {percentage.toFixed(0)}%
                    </p>

                    <p className="text-xs text-slate-400">
                      completed
                    </p>

                  </div>

                </div>


                <div className="mt-5">

                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">

                    <div
                      className="bg-teal-600 h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                </div>


                <div className="flex justify-between items-center mt-4">

                  <div>

                    {percentage >= 100 ? (

                      <p className="text-sm font-semibold text-teal-600">
                        🎉 Goal achieved!
                      </p>

                    ) : (

                      <p className="text-sm text-slate-500">
                        ₹{remaining.toLocaleString("en-IN")} remaining
                      </p>

                    )}

                  </div>


                  <div className="flex gap-4">

                    <button
                      onClick={() =>
                        editGoal(goal)
                      }
                      className="text-sm text-teal-600 hover:text-teal-800 font-medium"
                    >
                      Edit
                    </button>


                    <button
                      onClick={() =>
                        deleteGoal(goal.id)
                      }
                      className="text-sm text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>

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

export default GoalList;