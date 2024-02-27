import axios, { AxiosError } from "axios";

const PCConnectionInstance = axios.create({
  timeout: 20000,
  withCredentials: true,
  baseURL: process.env.API_URL,
});

PCConnectionInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error as AxiosError);
  }
);

export { PCConnectionInstance };
