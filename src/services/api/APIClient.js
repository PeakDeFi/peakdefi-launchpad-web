import axios from "axios";

export const ApiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

ApiClient.interceptors.response.use(
  ({ data }) => data,
  (error) => Promise.reject(error)
);
