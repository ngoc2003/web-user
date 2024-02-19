import { PCConnectionInstance } from ".";

export const getMe = async () => {
  return PCConnectionInstance.get("/user/me");
};

export const getUserById = async (id: any) => {
  return PCConnectionInstance.get(`/user/${id}`);
};
