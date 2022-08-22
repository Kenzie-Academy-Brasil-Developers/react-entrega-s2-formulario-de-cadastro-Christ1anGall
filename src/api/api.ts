import axios from "axios";

const api = axios.create({
  baseURL: "https://kenziehub.herokuapp.com/",
});

const token = localStorage.getItem("@TOKEN");

api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default api;
