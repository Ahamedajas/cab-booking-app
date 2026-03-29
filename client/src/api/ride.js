import axios from "axios";
import { getToken } from "../utils/auth";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

// ✅ Attach token automatically
API.interceptors.request.use((req) => {
  const token = getToken();

  console.log("TOKEN:", token); // 👈 debug

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const bookRide = (data) => API.post("/ride/book", data);
export const getRides = () => API.get("/ride");