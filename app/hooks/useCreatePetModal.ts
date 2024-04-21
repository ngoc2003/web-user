import { create } from "zustand";

type CreatePetType = {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export const useCreatePetModal = create<CreatePetType>((set, get) => ({
  isOpen: false,
  onToggle: () => set({ isOpen: !get().isOpen }),
  onClose: () => set({ isOpen: false }),
}));
