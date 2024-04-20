import { useQuery } from "react-query";
import { getUserById } from "../api/user";
import { AxiosResponse } from "axios";
import { ExtendedUserType } from "../types/user";

export const useGetUserInfoById = (id: number) =>
  useQuery<AxiosResponse<ExtendedUserType>>(["users", id], () =>
    getUserById(id)
  );
