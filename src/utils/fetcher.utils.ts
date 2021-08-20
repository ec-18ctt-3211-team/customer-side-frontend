import axios from 'axios';

// axios.interceptors.request.use(function (config) {
//   const token = localStorage.getItem('auth-token');
//   if (token) config.headers['auth-token'] = token;
//   return config;
// });

export const BASE = 'http://e-commerce-project-backend.herokuapp.com';

export const GET = (url: string, data?: any) => {
  return axios.get(BASE + url, data);
};

export const POST = (url: string, data?: any) => {
  return axios.post(BASE + url, data);
};

export const PUT = (url: string, data?: any) => {
  return axios.put(BASE + url, data);
};
