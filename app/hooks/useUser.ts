import { create } from "zustand";
import { CustomUserType } from "../types/user";

interface UserStore {
  user: CustomUserType | null;
  setInformation: (newUserData: CustomUserType) => void;
}
export const useUser = create<UserStore>((set) => ({
  user: null,
  setInformation: (newUserData) =>
    set((state: any) => ({
      user: { ...state.user, ...newUserData },
    })),
}));
