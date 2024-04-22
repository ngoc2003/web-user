import { PCConnectionInstance } from ".";
import { SEX_TYPE } from "../types/user";

export type UpdateUserProfileBody = {
  address?: string;
  name?: string;
  sex?: SEX_TYPE;
  birthday?: Date;
};

export const getUserById = async (id: number) => {
  return PCConnectionInstance.get(`/user/${id}`);
};

export const updateUserProfile = async (body: UpdateUserProfileBody) => {
  return PCConnectionInstance.post(`/user`, body);
};
