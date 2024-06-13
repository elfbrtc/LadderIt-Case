import { useState } from 'react';
import useStore from '../hooks/useStore';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const addProduct = useStore((state) => state.addProduct);

  const handleAddProduct = () => {
    if (name.trim() && quantity > 0) {
      addProduct({ name, quantity });
      setName('');
      setQuantity(0);
    } else {
      alert('Ürün adı boş olamaz ve miktar sıfırdan büyük olmalıdır');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ürün adı"
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        placeholder="Miktar"
      />
      <button onClick={handleAddProduct}>Ürün Ekle</button>
    </div>
  );
};

export default ProductForm;
