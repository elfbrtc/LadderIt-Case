'use client'; 

import ProductForm from '../../components/ProductForm';
import ProductList from '../../components/ProductList';

export default function MarketPage() {
  return (
    <div>
      <h2>Market Yönetimi</h2>
      <ProductForm />
      <ProductList />
    </div>
  );
}
