import { useState, useEffect } from "react";
import { useEffectOnce } from "react-use";

import useStore from "../hooks/useStore.js";
import { supabase } from "../lib/supabaseClient.js";
import MarketFormModal from "./MarketFormModal.js";
import Head from "next/head";
import MarketList from "./MarketList.js";

const MarketForm = () => {
  const user = useStore((state) => state.user);
  const markets = useStore((state) => state.markets);
  const addMarket = useStore((state) => state.addMarket);
  const addBrand = useStore((state) => state.addBrand);
  const addProduct = useStore((state) => state.addProduct);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brandId, setBrandId] = useState("");
  const clearMarkets = useStore((state) => state.clearMarkets);
  const clearProducts = useStore((state) => state.clearProducts);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setLoading(true);
    console.log(markets);
    if (user) {
      fetchUserBrand(user).catch((error) => setLoading(false));
    }
  }, [user]);

  const fetchUserBrand = async (userId) => {
    console.log(userId);
    try {
      const { data, error } = await supabase
        .from("Brand")
        .select("*")
        .eq("userid", userId)
        .single();
      if (error) {
        throw error;
      }
      addBrand(data);
      setBrandId(data.id);
      await fetchUserMarket(data.id);
    } catch (error) {
      console.error(
        "Kullanıcı brand bilgisi alınırken bir hata oluştu:",
        error.message
      );
      setLoading(false);
    }
  };

  const fetchUserMarket = async (brandId) => {
    try {
      const { data: markets, error: marketError } = await supabase
        .from("Market")
        .select("*")
        .eq("brandid", brandId);

      if (marketError) {
        throw marketError;
      }
      clearMarkets();
      clearProducts();
      for (let i = 0; i < markets.length; i++) {
        const market = markets[i];

        const { data: products, error: productError } = await supabase
          .from("Product")
          .select("*")
          .eq("marketid", market.id);

        if (productError) {
          throw productError;
        }

        const totalProductRange = products.length;
        const totalProductQuantity = products.reduce(
          (total, product) => total + product.quantity,
          0
        );

        const existingMarket = markets.find((m) => m.id === market.id);
        if (existingMarket) {
          addMarket({
            ...existingMarket,
            totalProductRange,
            totalProductQuantity,
            products,
          });
        } else {
          addMarket({
            ...market,
            totalProductRange,
            totalProductQuantity,
            products,
          });
        }
      }
      setLoading(false);
    } catch (error) {
      console.error(
        "Kullanıcı market bilgisi alınırken bir hata oluştu:",
        error.message
      );
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredMarkets = markets.filter((market) =>
    market.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAddMarket = async (marketData) => {
    console.log(marketData);
    try {
      const { data, error } = await supabase
        .from("Market")
        .insert([
          {
            brandid: marketData.brandId,
            name: marketData.name,
          },
        ])
        .select("*");
      if (error) {
        throw error;
      }
      addMarket(data[0]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Market eklenirken bir hata oluştu:", error.message);
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

        <header className="w-full p-4 bg-white shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Marketler</h1>
            <button
              onClick={openModal}
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
            >
              + Yeni Market Ekle
            </button>
            {isModalOpen && (
              <MarketFormModal
                brandId={brandId}
                onAddMarket={handleAddMarket}
                onClose={closeModal}
              />
            )}
          </div>
        </header>

        <div className="w-full p-4 flex justify-center">
          <div className="max-w-6xl mx-auto">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Market ara..."
                value={searchText}
                onChange={handleSearch}
                className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            {loading && (
              <div className="flex items-center justify-center">
                <p className="text-gray-600">Marketler yükleniyor...</p>
              </div>
            )}

            {!loading &&
              searchText.trim() !== "" &&
              filteredMarkets.length === 0 && (
                <div className="flex items-center justify-center">
                  <p className="text-gray-600">Market bulunamadı.</p>
                </div>
              )}

            {!loading && filteredMarkets.length > 0 && (
              <MarketList filteredMarkets={filteredMarkets} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketForm;
