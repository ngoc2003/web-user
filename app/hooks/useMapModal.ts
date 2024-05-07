import { create } from "zustand";

type ToggleMapModalType = {
  isOpen: boolean;
  onToggle: () => void;
};

export const useMapModal = create<ToggleMapModalType>(
  (set, get) => ({
    isOpen: false,
    onToggle: () => set({ isOpen: !get().isOpen }),
  })
);
