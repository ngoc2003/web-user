import { useMutation, useQuery } from "react-query";
import {
  ListPostParams,
  addPost,
  deletePost,
  getListPost,
  updatePost,
} from "../api/post";

export const useAddPost = () =>
  useMutation({
    mutationKey: ["post/create"],
    mutationFn: addPost,
  });

export const useUpdatePost = () =>
  useMutation({
    mutationKey: ["post/update"],
    mutationFn: updatePost,
  });

export const useDeletePost = () =>
  useMutation({
    mutationKey: ["post/delete"],
    mutationFn: deletePost,
  });

export const useListPost = (params: ListPostParams) =>
  useQuery(["posts"], () => getListPost(params), {
    select: ({ data }) => data,
  });
