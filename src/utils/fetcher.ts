import axios from 'axios';

// axios.interceptors.request.use(function (config) {
//   const token = localStorage.getItem('auth-token');
//   if (token) config.headers['auth-token'] = token;
//   return config;
// });

export const GET = (url: string, data: any) => {
  return axios.get(url, data);
};

export const POST = (url: string, data: any) => {
  return axios.post(url, data);
};
