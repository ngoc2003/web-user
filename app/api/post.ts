import { AxiosResponse } from "axios";
import { PCConnectionInstance } from ".";
import { ExtendedUserType } from "../types/user";
import { ExtendedCommentType } from "./comment";
import { LikePostType } from "./likePost";

export interface PostType {
  id: number;
  user_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  latitude?: number;
  longitude?: number;
}

export interface ExtendedPostType extends PostType {
  user: ExtendedUserType;
  comments: ExtendedCommentType[];
  likes: LikePostType[];
}

export interface ListPostParams {
  order_by?: "asc" | "desc";
  user_id?: string;
  limit: number;
  offset: number;
}

export interface AddPostBody {
  content: string;
  latitude?: number;
  longitude?: number;
}

export interface UpdatePostBody {
  id: number;
  data: AddPostBody;
}

export const getListPost = async (params: ListPostParams) => {
  return PCConnectionInstance.get("/posts", { params });
};

export const addPost = async (body: AddPostBody) => {
  return PCConnectionInstance.post<any, AxiosResponse<PostType>>(`/post`, body);
};

export const updatePost = async ({ id, data }: UpdatePostBody) => {
  return PCConnectionInstance.put<any, AxiosResponse<PostType>>(
    `/post/${id}`,
    data
  );
};

export const deletePost = async (id: number) => {
  return PCConnectionInstance.delete<any, AxiosResponse<PostType>>(
    `/post/${id}`
  );
};

export const likePost = async (id: number) =>
  PCConnectionInstance.post<any, AxiosResponse<{ message: string }>>(
    `/post/like/${id}`
  );

export const unlikePost = async (id: number) =>
  PCConnectionInstance.post<any, AxiosResponse<{ message: string }>>(
    `/post/unlike/${id}`
  );
