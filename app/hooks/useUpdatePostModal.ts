import { create } from "zustand";
import { PostWithUserType } from "../api/post";

type UpdatePostType = {
  isOpen: boolean;
  data: PostWithUserType | null;
  onOpen: ({ data }: { data: PostWithUserType }) => void;
  onClose: () => void;
};

export const useUpdatePostModal = create<UpdatePostType>((set, get) => ({
  isOpen: false,
  data: null,
  onOpen: ({ data: userData }) => set({ isOpen: true, data: userData }),
  onClose: () => set({ isOpen: false }),
}));
