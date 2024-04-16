import { AxiosResponse } from "axios";
import { PCConnectionInstance } from ".";

export const likeComment = async (id: number) =>
  PCConnectionInstance.post<any, AxiosResponse<{ message: string }>>(
    `/comment/like/${id}`
  );

export const unlikeComment = async (id: number) =>
  PCConnectionInstance.post<any, AxiosResponse<{ message: string }>>(
    `/comment/unlike/${id}`
  );
