// utils/API.js

import axios from "axios";
import Cookies from 'universal-cookie';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  responseType: "json",
  withCredentials: true
});

API.interceptors.request.use((config) => {
  const cookies = new Cookies();    
  const token = cookies.get('user') !== undefined ? cookies.get('user').token : null;
  return ({
    ...config,
    headers: {
      'accept' : "application/json",
      'Authorization': "Bearer " + token
    },
  })
},
  error => Promise.reject(error),
);

API.interceptors.response.use((response) =>
  response,
  async (error, response) => {
    if(error.response.status === 401)
    {
      const cookies = new Cookies();    
      const token = cookies.remove('user');
      window.location = "/login"
    }
    return Promise.reject(error);

  },
);

const { get, post, put, delete: destroy } = API;
export { get, post, put, destroy };





