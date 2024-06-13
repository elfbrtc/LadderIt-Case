import { create } from 'zustand';

const useStore = create((set) => ({
  brands: [],
  markets: [],
  products: [],
  user: null,
  setUser: (user) => set({ user }), 
  clearUser: () => set({ user: null }),
  addMarket: (market) =>
    set((state) => ({
      markets: [...state.markets, market],
    })),
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
}));

export default useStore;
