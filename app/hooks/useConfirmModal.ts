import { create } from "zustand";

type ConfirmModalStateType = {
  isOpen: boolean;
  title: string;
  isLoading: boolean;
};

type ConfirmModalType = {
  state: ConfirmModalStateType;
  onToggle: () => void;
  onClose: () => void;
  handleConfirm: () => void;
  setState: (state: Partial<ConfirmModalStateType>) => void;
  setHandleConfirm: (confirm: () => void) => void;
};

export const useConfirmModal = create<ConfirmModalType>((set, get) => ({
  state: {
    isOpen: false,
    title: "Are you sure?",
    isLoading: false,
  },
  handleConfirm: () => {},

  onToggle: () => {
    const { isOpen } = get().state;
    set((state) => ({ state: { ...state.state, isOpen: !isOpen } }));
  },

  onClose: () => {
    set((state) => ({ state: { ...state.state, isOpen: false } }));
  },

  setState: (state: Partial<ConfirmModalStateType>) => {
    set((currentState) => ({ state: { ...currentState.state, ...state } }));
  },

  setHandleConfirm: (confirm: () => void) => {
    set(() => ({ handleConfirm: confirm }));
  },
}));
