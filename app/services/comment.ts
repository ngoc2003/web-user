import { useMutation } from "react-query";
import { addComment, deleteComment, updateComment } from "../api/comment";
import { likeComment, unlikeComment } from "../api/likeComment";

export const useAddComment = () =>
  useMutation({
    mutationKey: ["comment/create"],
    mutationFn: addComment,
  });

export const useUpdateComment = () =>
  useMutation({
    mutationKey: ["comment/update"],
    mutationFn: updateComment,
  });

export const useDeleteComment = () =>
  useMutation({
    mutationKey: ["comment/delete"],
    mutationFn: deleteComment,
  });

export const useLikeComment = () =>
  useMutation({
    mutationKey: ["comment/like"],
    mutationFn: likeComment,
  });

export const useUnlikeComment = () =>
  useMutation({
    mutationKey: ["comment/unlike"],
    mutationFn: unlikeComment,
  });
