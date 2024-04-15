import { create } from "zustand";

type ModalState = {
  isLoginModalOpen: Boolean;
  isSignUpModalOpen: Boolean;
  setLoginModal: () => void;
  setSignUpModal: () => void;
};

const useModalStore = create<ModalState>((set) => ({
  isLoginModalOpen: false,
  isSignUpModalOpen: false,
  setSignUpModal: () =>
    set((state) => ({ isSignUpModalOpen: !state.isSignUpModalOpen })),
  setLoginModal: () =>
    set((state) => ({ isLoginModalOpen: !state.isLoginModalOpen })),
}));

export { useModalStore };
