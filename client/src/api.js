import axios from 'axios';

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "content-Type": "application/json",
    accept: "application/json",
  },
});

export default api;