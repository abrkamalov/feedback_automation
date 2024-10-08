import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://feedback-automation.onrender.com', // Rails backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
