import { useState, useEffect } from 'react';
import useStore from '../hooks/useStore.js';
import { supabase } from '../lib/supabaseClient.js';
import MarketFormModal from './MarketFormModal.js';
import Head from 'next/head';
import MarketList from './MarketList.js';


const MarketForm = () => {
  const user = useStore((state) => state.user);
  const markets = useStore((state) => state.markets);
  const addMarket = useStore((state) => state.addMarket);
  const setUserBrand = useStore((state) => state.setUserBrand);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brandId, setBrandId] = useState('');
  const clearMarkets = useStore((state) => state.clearMarkets);

  useEffect(() => {
    if (user) {
      clearMarkets();
      fetchUserBrand(user);
    }
  }, [user]);

  const fetchUserBrand = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('Brand')
        .select('*')
        .eq('userid', userId)
        .single();
      if (error) {
        throw error;
      }
      setUserBrand(data);
      setBrandId(data.id);
      await fetchUserMarket(data.id)
    } catch (error) {
      console.error('Kullanıcı brand bilgisi alınırken bir hata oluştu:', error.message);
    }
  };

  const fetchUserMarket = async (brandId) => {
    try {
      const { data, error } = await supabase
        .from('Market')
        .select('*')
        .eq('brandid', brandId)
      if (error) {
        throw error;
      }
      data.forEach(market => {
        addMarket(market);
      });
    } catch (error) {
      console.error('Kullanıcı brand bilgisi alınırken bir hata oluştu:', error.message);
    }
  }

  const handleAddMarket = async (marketData) => {
    console.log(marketData);
    try {
      const { data, error } = await supabase
        .from('Market')
        .insert([
          {
            brandid: marketData.brandId,
            name: marketData.name,
          },
        ])
        .select('*');
      if (error) {
        throw error;
      }
      console.log(data)
      addMarket(data[0]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Market eklenirken bir hata oluştu:', error.message);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Head>
        <title>Market Ekleme Sayfası</title>
      </Head>

      {/* Üst kısım (Header) */}
      <header className="w-full p-4 bg-white shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Marketler</h1>
          <button onClick={openModal} className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none">
            + Yeni Market Ekle
          </button>
          {isModalOpen && (
        <MarketFormModal brandId={brandId} onAddMarket={handleAddMarket} onClose={closeModal} />
      )}
        </div>
      </header>

      {/* Orta kısım (Search ve Market Listeleri) */}
      <div className="w-full p-4 flex justify-center">
        <div className="max-w-6xl mx-auto">
          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Market ara..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <MarketList/>
        
        </div>
      </div>
    </div>
    </div>
  );
};

export default MarketForm;