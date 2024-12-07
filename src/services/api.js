import axios from "axios";

const API_BASE_URL = "https://realstate-server.onrender.com/api" ; // Replace with your API

export const getUsers = async () => axios.get(`${API_BASE_URL}/users`);
export const getPosts = async () => axios.get(`${API_BASE_URL}/posts`);
export const deleteUser = async (id) => axios.delete(`${API_BASE_URL}/users/${id}`);
export const deletePost = async (id) => axios.delete(`${API_BASE_URL}/posts/${id}`);
export const updateUser = async (id, data) => axios.put(`${API_BASE_URL}/users/${id}`, data);
// export const updatePost = async (id, data) => axios.put(`${API_BASE_URL}/posts/${id}`, data);
// const API_BASE_URL = "https://realstate-server.onrender.com/api" | ""; // Replace with your API

export const getPostById = async (id) => {
    const response = await axios.get(`https://realstate-server.onrender.com/api/posts/${id}`);
    return response;
  };
  
  export const updatePost = async (id, updatedData) => {
    const response = await axios.put(`https://realstate-server.onrender.com/api/posts/${id}`, updatedData);
    return response;
  };