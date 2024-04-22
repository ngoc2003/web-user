import { AxiosResponse } from "axios";
import { PCConnectionInstance } from ".";

export const follow = async (id: number) =>
  PCConnectionInstance.post<any, AxiosResponse<{ message: string }>>(
    `/follow/user/${id}`
  );

export const unfollow = async (id: number) =>
  PCConnectionInstance.post<any, AxiosResponse<{ message: string }>>(
    `/unfollow/user/${id}`
  );
