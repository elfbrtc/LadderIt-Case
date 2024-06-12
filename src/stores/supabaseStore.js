
import { create } from 'zustand';
import { supabase } from '../utils/supabase/supabase';

const useSupabaseStore = create((set) => ({
  markets: [],
  products: [],
  brands: [],
  user: null,

  fetchMarkets: async () => {
    try {
      const { data: markets, error } = await supabase.from('Market').select('*');
      if (error) throw new Error(error.message);
      set({ markets });
    } catch (error) {
      console.error('Error fetching markets:', error.message);
    }
  },
  fetchProducts: async () => {
    try {
      const { data: products, error } = await supabase.from('Product').select('*');
      if (error) throw new Error(error.message);
      set({ products });
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  },
  fetchBrands: async () => {
    try {
      const { data: brands, error } = await supabase.from('Brand').select('*');
      if (error) throw new Error(error.message);
      set({ brands });
    } catch (error) {
      console.error('Error fetching brands:', error.message);
    }
  },
  setUser: (user) => set({ user }),
}));

export default useSupabaseStore;
