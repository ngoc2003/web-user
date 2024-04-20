import { PCConnectionInstance } from ".";

export const getUserById = async (id: number) => {
  return PCConnectionInstance.get(`/user/${id}`);
};
