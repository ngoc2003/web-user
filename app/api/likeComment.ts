import { AxiosResponse } from "axios";
import { PCConnectionInstance } from ".";

export interface LikeCommentType {
  id: number;
  user_id: number;
  comment_id: number;
  created_at: Date;
  updated_at: Date;
}

export const likeComment = async (id: number) =>
  PCConnectionInstance.post<any, AxiosResponse<{ message: string }>>(
    `/comment/like/${id}`
  );

export const unlikeComment = async (id: number) =>
  PCConnectionInstance.post<any, AxiosResponse<{ message: string }>>(
    `/comment/unlike/${id}`
  );
