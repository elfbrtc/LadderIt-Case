import { useState, useRef } from 'react';
import { Modal, Button, TextInput, Label } from 'flowbite-react';

const ProductFormModal = ({ marketId, onAddProduct, onClose }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const quantityInputRef = useRef(null);
  const nameInputRef = useRef(null);

  const handleSubmit = () => {
    const productData = {
      marketId: marketId,
      name: name,
      quantity: quantity,
    };
    onAddProduct(productData);
    onClose();
  };

  return (
    <Modal show={true} size="md" popup={true} onClose={onClose} initialFocus={nameInputRef}>
      <Modal.Header>Ürün Ekle</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div>
            <TextInput
              id="name"
              ref={nameInputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ürün adı"
              required
            />
          </div>
          <div>
            <TextInput
              id="quantity"
              ref={quantityInputRef}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Miktar"
              required
            />
          </div>
        </div>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Ekle</Button>
        <Button color="gray" onClick={onClose}>
          İptal
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductFormModal;