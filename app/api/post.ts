import { AxiosResponse } from "axios";
import { PCConnectionInstance } from ".";
import { PostType } from "../types/user";

export interface ListPostParams {
  order_by?: "asc" | "desc";
  user_id?: string;
  limit: number;
  offset: number;
}

export interface AddPostBody {
  content: string;
  images: string[];
  latitude?: number;
  longitude?: number;
}

export interface UpdatePostBody {
  id: number;
  data: AddPostBody;
}

export const getPostById = async (id: number) => {
  return PCConnectionInstance.get("/post/" + id);
};

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
