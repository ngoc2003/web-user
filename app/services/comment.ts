import { useMutation } from "react-query";
import { addComment, deleteComment, updateComment } from "../api/comment";

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
