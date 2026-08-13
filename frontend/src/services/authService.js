import API from "./api";

export const register = (user) => {
  return API.post("/auth/register", user);
};

export const login = (user) => {
  return API.post("/auth/login", user);
};