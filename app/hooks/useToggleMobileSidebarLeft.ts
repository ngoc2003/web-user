import { create } from "zustand";

type ToggleMobileSidebarLeftType = {
  isOpen: boolean;
  onToggle: () => void;
};

export const useToggleMobileSidebarLeft = create<ToggleMobileSidebarLeftType>(
  (set, get) => ({
    isOpen: false,
    onToggle: () => set({ isOpen: !get().isOpen }),
  })
);
