import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  // You can add other configuration options here
});

export default instance;
