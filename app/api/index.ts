import axios, { AxiosError } from "axios";
import { getSession } from "next-auth/react";

const PCConnectionInstance = axios.create({
  timeout: 20000,
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

PCConnectionInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session?.user?.accessToken) {
      config.headers.Authorization = `Bearer ${session?.user?.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error as AxiosError);
  }
);

PCConnectionInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error as AxiosError);
  }
);

export const setAuthorizationHeader = (token: string) => {
  PCConnectionInstance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export { PCConnectionInstance };
