'use client';

import MarketForm from '../../components/MarketForm';
import MarketList from '../../components/MarketList';

export default function MainPage() {
  return (
    <div>
      <h2>Ürün Yönetimi</h2>
      <MarketForm />
      <MarketList />
    </div>
  );
}
