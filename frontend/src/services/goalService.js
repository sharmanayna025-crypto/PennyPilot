import API from "./api";

export const getGoals = () =>
  API.get("/goals");

export const addGoal = (goal) =>
  API.post("/goals", goal);

export const updateGoal = (id, goal) =>
  API.put(`/goals/${id}`, goal);

export const deleteGoal = (id) =>
  API.delete(`/goals/${id}`);