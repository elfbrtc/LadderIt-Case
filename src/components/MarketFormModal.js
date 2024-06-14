import { useState, useRef } from "react";
import { Modal, Button, TextInput, Label } from "flowbite-react";

const MarketFormModal = ({ brandId, onAddMarket, onClose }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const nameInputRef = useRef(null);

  const handleSubmit = () => {
    if (name.trim() === "") {
      setError("Market adı gerekli");
      return;
    }
    const marketData = {
      brandId: brandId,
      name: name,
    };
    onAddMarket(marketData);
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
      <Modal.Header>Market Ekle</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div>
            <TextInput
              id="name"
              ref={nameInputRef}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");  // Kullanıcı yazmaya başladığında hatayı temizle
              }}
              placeholder="Market adı"
              required
            />
            {error && <p className="text-red-600 mt-2">{error}</p>}
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

export default MarketFormModal;
