import { authOptions } from "@/auth";
import { getServerSession } from "next-auth/next";

export const useGetSession = async () => {
  return await getServerSession(authOptions);
};
