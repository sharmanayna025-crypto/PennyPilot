import API from "./api";

export const getBudgets = () => API.get("/budgets");

export const addBudget = (budget) =>
  API.post("/budgets", budget);

export const deleteBudget = (id) =>
  API.delete(`/budgets/${id}`);