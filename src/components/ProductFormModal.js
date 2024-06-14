import { useState, useRef } from "react";
import { Modal, Button, TextInput, Label } from "flowbite-react";

const ProductFormModal = ({ marketId, onAddProduct, onClose }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [errors, setErrors] = useState({ name: "", quantity: "" });
  const quantityInputRef = useRef(null);
  const nameInputRef = useRef(null);

  const handleSubmit = () => {
    let formValid = true;
    let errors = {};

    if (name.trim() === "") {
      errors.name = "Ürün adı gerekli";
      formValid = false;
    }

    if (quantity < 0 || isNaN(quantity)) {
      errors.quantity = "Geçerli bir miktar giriniz";
      formValid = false;
    }

    setErrors(errors);

    if (!formValid) return;

    const productData = {
      marketId: marketId,
      name: name,
      quantity: quantity,
    };

    onAddProduct(productData);
    onClose();
  };

  return (
    <Modal
      show={true}
      size="md"
      popup={true}
      onClose={onClose}
      initialFocus={nameInputRef}
    >
      <Modal.Header>Ürün Ekle</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div>
            <TextInput
              id="name"
              ref={nameInputRef}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
              }}
              placeholder="Ürün adı"
              required
            />
            {errors.name && <p className="text-red-600 mt-2">{errors.name}</p>}
          </div>
          <div>
            <TextInput
              id="quantity"
              ref={quantityInputRef}
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                if (errors.quantity) setErrors((prevErrors) => ({ ...prevErrors, quantity: "" }));
              }}
              placeholder="Miktar"
              required
            />
            {errors.quantity && <p className="text-red-600 mt-2">{errors.quantity}</p>}
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
