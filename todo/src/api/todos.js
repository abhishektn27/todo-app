// src/api/todos.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/todos'; // Update this URL if needed

export const getTodos = () => axios.get(API_URL);
export const createTodo = (todo) => axios.post(API_URL, todo);
export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);
export const toggleComplete = (id) => axios.patch(`${API_URL}/${id}/toggleComplete`);

