import { useMutation, useQuery } from "react-query";
import {
  ListPostParams,
  addPost,
  deletePost,
  getListPost,
  likePost,
  unlikePost,
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

export const useLikePost = () =>
  useMutation({
    mutationKey: ["post/like"],
    mutationFn: likePost,
  });

export const useUnlikePost = () =>
  useMutation({
    mutationKey: ["post/unlike"],
    mutationFn: unlikePost,
  });
