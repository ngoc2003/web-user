import { useMutation, useQuery } from "react-query";
import {
  UpdateUserProfileBody,
  getUserById,
  updateUserProfile,
} from "../api/user";
import { AxiosResponse } from "axios";
import { ExtendedUserType } from "../types/user";

export const useGetUserInfoById = (id: number) =>
  useQuery<AxiosResponse<ExtendedUserType>>(["users", id], () =>
    getUserById(id)
  );

export const useUpdateUserProfile = () =>
  useMutation({
    mutationKey: ["user/update"],
    mutationFn: updateUserProfile,
  });
