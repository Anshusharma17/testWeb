import axios from "axios";
const BASE_URL = "http://localhost:4000/api/";
const local = JSON.parse(localStorage?.getItem("persist:root"));
const local1 = JSON.parse(local.user);
let TOKEN = local1.currentUser?.token;
localStorage.setItem("BASE_URL", BASE_URL);
localStorage.setItem("TOKEN", TOKEN);

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    authorization: TOKEN,
  },
});
