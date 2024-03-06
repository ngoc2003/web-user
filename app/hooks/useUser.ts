import { create } from "zustand";
import { ExtendedUserType } from "../types/user";

interface UserStore {
  user: ExtendedUserType | null;
  setInformation: (newUserData: ExtendedUserType) => void;
}
export const useUser = create<UserStore>((set) => ({
  user: null,
  setInformation: (newUserData) =>
    set((state: any) => ({
      user: { ...state.user, ...newUserData },
    })),
}));
