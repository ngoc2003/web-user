import axios, { AxiosError } from "axios";

const PCConnectionInstance = axios.create({
  timeout: 20000,
  withCredentials: true,
  baseURL: "http://127.0.0.1:8000/api",
});

PCConnectionInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error as AxiosError);
  }
);

export { PCConnectionInstance };
