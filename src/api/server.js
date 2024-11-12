import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/",
});

export const chat = async (data) => API.post("/ai/chat", data);
export const struct = async (data) => API.post("/ai/struct", data);

export const UserSignUp = async (data) => API.post("/user/signup", data);
export const UserSignIn = async (data) => API.post("/user/signin", data);

export const getDashboardDetails = async (token) =>
  API.get("/user/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getWorkouts = async (token, date) =>
  await API.get(`/user/workout${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token, data) =>
  await API.post(`/user/workout`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const saveWorkout = async (token, data) =>
  await API.post(`/user/workout/save`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
