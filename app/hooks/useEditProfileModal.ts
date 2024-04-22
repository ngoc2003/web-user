import { create } from "zustand";

type EditProfileType = {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export const useEditProfileModal = create<EditProfileType>((set, get) => ({
  isOpen: false,
  onToggle: () => set({ isOpen: !get().isOpen }),
  onClose: () => set({ isOpen: false }),
}));
