import { AxiosResponse } from "axios";
import { PCConnectionInstance } from ".";
import { CommentType } from "../types/user";

export interface AddCommentBody {
  content: string;
  post_id: number;
}

export interface UpdateCommentBody {
  id: number;
  data: AddCommentBody;
}

export const addComment = async (body: AddCommentBody) => {
  return PCConnectionInstance.post<any, AxiosResponse<CommentType>>(
    `/comment`,
    body
  );
};

export const updateComment = async ({ id, data }: UpdateCommentBody) => {
  return PCConnectionInstance.put<any, AxiosResponse<CommentType>>(
    `/comment/${id}`,
    data
  );
};

export const deleteComment = async (id: number) => {
  return PCConnectionInstance.delete<any, AxiosResponse<CommentType>>(
    `/comment/${id}`
  );
};
