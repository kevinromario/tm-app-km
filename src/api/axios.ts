import axios from 'axios';
import { backendUrl } from '../constants';

const axiosInstance = axios.create({
  baseURL: backendUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
