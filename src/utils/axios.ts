import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
});

const token = JSON.parse(localStorage.getItem('token') as string);
axiosInstance.defaults.headers.common.Authorization = token
  ? `Bearer ${token}`
  : '';

export { axiosInstance as axios };
