import axios, { AxiosError } from "axios";

const PCConnectionInstance = axios.create({
  timeout: 20000,
  withCredentials: true,
  baseURL: "https://db.pet-connect.website/api",
});

PCConnectionInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error as AxiosError);
  }
);

export { PCConnectionInstance };
