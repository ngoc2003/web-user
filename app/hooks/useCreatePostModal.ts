import { create } from "zustand";

type CreatePostType = {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export const useCreatePostModal = create<CreatePostType>((set, get) => ({
  isOpen: false,
  onToggle: () => set({ isOpen: !get().isOpen }),
  onClose: () => set({ isOpen: false }),
}));
