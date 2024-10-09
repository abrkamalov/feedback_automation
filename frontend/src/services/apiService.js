import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://feedback-automation.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
