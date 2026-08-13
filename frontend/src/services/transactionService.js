import API from "./api";

export const getTransactions = () =>
  API.get("/transactions");

export const addTransaction = (transaction) =>
  API.post("/transactions", transaction);

export const importTransaction = (transaction) =>
  API.post("/transactions/import", transaction);

export const deleteTransaction = (id) =>
  API.delete(`/transactions/${id}`);

export const updateTransaction = (id, transaction) =>
  API.put(`/transactions/${id}`, transaction);