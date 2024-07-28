// src/plugins/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',  // Django服务器的基础URL
  timeout: 10000,  // 请求超时设置
  headers: {
    'Content-Type': 'application/json',
    // 如果需要的话，可以在此处添加其他headers
  }
});

export default axiosInstance;
