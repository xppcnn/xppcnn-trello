import { create } from "zustand";
interface MobileSidebar {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useMobileSidebar = create<MobileSidebar>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useMobileSidebar;
