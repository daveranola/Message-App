// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/demo'; // match your Spring controller
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const userService = {
  getAll: () => api.get('/all'),           // GET /demo/all
  create: (user) => api.post('/add', user) // POST /demo/add
};

export default api;
