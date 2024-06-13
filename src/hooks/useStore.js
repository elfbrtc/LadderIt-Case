import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(persist((set) => ({
  brands: [],
  markets: [],
  products: [],
  user: null,
  clearMarkets: () => set({ markets: [] }),
  clearProducts: () => set({ products: [] }),
  setUser: (userId) => set({ user: userId }),
  clearUser: () => set({ user: null }),
  addBrand: (brand) => set((state) => ({
    brands: [...state.brands, brand],
  })),
  addMarket: (market) => set((state) => ({
    markets: [...state.markets, market],
  })),
  addProduct: (product) => set((state) => ({
    products: [...state.products, product],
  })),
}), {
  name: 'ladderit-store',
}));

export default useStore;
