import { create } from "zustand";
import { ExtendedPostType } from "../types/user";

type UpdatePostType = {
  isOpen: boolean;
  data: ExtendedPostType | null;
  onOpen: ({ data }: { data: ExtendedPostType }) => void;
  onClose: () => void;
};

export const useUpdatePostModal = create<UpdatePostType>((set, get) => ({
  isOpen: false,
  data: null,
  onOpen: ({ data: userData }) => set({ isOpen: true, data: userData }),
  onClose: () => set({ isOpen: false }),
}));
