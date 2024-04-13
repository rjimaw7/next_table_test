import { create } from 'zustand';

interface OrderState {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const useOrderStore = create<OrderState>((set) => ({
  searchQuery: '',
  setSearchQuery: (value: string) => set({ searchQuery: value })
}));

export default useOrderStore;
