import { useState, useEffect } from 'react';
import useStore from '../hooks/useStore.js';
import { supabase } from '../lib/supabaseClient.js';
import ProductFormModal from './ProductFormModal.js';
import Head from 'next/head';
import ProductList from './ProductList.js';


const ProductForm = ({id}) => {
  const products = useStore((state) => state.products);
  const addProduct = useStore((state) => state.addProduct);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [marketId, setMarketId] = useState(id);
  const clearProducts = useStore((state) => state.clearProducts);

  useEffect(() => {
    if (marketId) {
      fetchUserProduct(marketId);
    }
  }, [marketId]);

  const fetchUserProduct = async (marketId) => {
    try {
      const { data, error } = await supabase
        .from('Product')
        .select('*')
        .eq('marketid', marketId)
      if (error) {
        throw error;
      }
      console.log(data);
      clearProducts();      
      data.forEach(product => {
        addProduct(product);
      });
    } catch (error) {
      console.error('Kullanıcı brand bilgisi alınırken bir hata oluştu:', error.message);
    }
  }

  const handleAddProduct = async (productData) => {
    console.log(productData);
    try {
      const { data, error } = await supabase
        .from('Product')
        .insert([
          {
            marketid: productData.marketId,
            name: productData.name,
            quantity: productData.quantity
          },
        ])
        .select('*');
      if (error) {
        throw error;
      }
      addProduct(data[0]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Product eklenirken bir hata oluştu:', error.message);
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
        <title>Ürün Ekleme Sayfası</title>
      </Head>

      <header className="w-full p-4 bg-white shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Ürünler</h1>
          <button onClick={openModal} className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none">
            + Yeni Ürün Ekle
          </button>
          {isModalOpen && (
        <ProductFormModal marketId={marketId} onAddProduct={handleAddProduct} onClose={closeModal} />
      )}
        </div>
      </header>

      <div className="w-full p-4 flex justify-center">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Ürün ara..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <ProductList products={products}/>
        
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductForm;
