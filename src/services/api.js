import axios from "axios";

const API_BASE_URL = "https://realstate-server.onrender.com/api"; // Replace with your API

export const getUsers = async () => axios.get(`${API_BASE_URL}/users`);
export const getPosts = async () => axios.get(`${API_BASE_URL}/posts`);
export const deleteUser = async (id) => axios.delete(`${API_BASE_URL}/users/${id}`);
export const deletePost = async (id) => axios.delete(`${API_BASE_URL}/posts/${id}`);
export const updateUser = async (id, data) => axios.put(`${API_BASE_URL}/users/${id}`, data);
export const updatePost = async (id, data) => axios.put(`${API_BASE_URL}/posts/${id}`, data);
