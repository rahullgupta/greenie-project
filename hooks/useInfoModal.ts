import { create } from "zustand";

export interface ModalStoreInterface {
  id?: string;
  isOpen: boolean;
  openModal: (movieId: string) => any;
  closeModal: () => void;
}

const useInfoModal = create<ModalStoreInterface>((set) => ({
  id: undefined,
  isOpen: false,
  openModal: (id: string) => set({ isOpen: true, id }),
  closeModal: () => set({ isOpen: false, id: undefined }),
}));

export default useInfoModal;
