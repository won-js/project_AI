import axios from "axios";

export default axios.create({
  baseURL: "http://backend:3000/api",
  headers: {
    "Content-type": "application/json"
  }
});