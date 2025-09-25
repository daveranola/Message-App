// src/services/api.js
import axios from 'axios';

const API_BASE_URL = '/demo';      // relative to current origin
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const userService = {
  getAll: () => api.get('/all'),           // GET /demo/all
  getById: (id) => api.get(`/userID`, {params: { id } }), // GET /demo/userID
  getByName: (name) => api.get(`/userByName`, { params: { name } }), // GET /demo/userByName
  create: (user) => api.post('/add', user) // POST /demo/add
};

export const messageService = {
  getAll: () => api.get('/allMessages'),           // GET /demo/messages
  getById: (id) => api.get(`/messageID`, {params: { id } }), // GET /demo/messageID
  create: (message) => api.post('/addMessage', message) // POST /demo/addMessage
};

export default api;
