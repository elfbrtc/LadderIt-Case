import { useState } from 'react';
import useStore from '../hooks/useStore.js';

const MarketForm = () => {
  const [name, setName] = useState('');
  const addMarket = useStore((state) => state.addMarket);

  const handleAddMarket = () => {
    if (name.trim()) {
      addMarket(name);
      setName('');
    } else {
      alert('Market adı boş olamaz');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Market adı"
      />
      <button onClick={handleAddMarket}>Market Ekle</button>
    </div>
  );
};

export default MarketForm;
