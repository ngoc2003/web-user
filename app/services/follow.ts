import { useMutation } from "react-query";
import { follow, unfollow } from "../api/follow";

export const useFollow = () =>
  useMutation({
    mutationKey: ["user/follow"],
    mutationFn: follow,
  });

export const useUnfollow = () =>
  useMutation({
    mutationKey: ["user/unfollow"],
    mutationFn: unfollow,
  });
