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
  async (error) => {
    //...
    return Promise.reject(error.response.data);
  },
);

export default API

/*

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };*/





