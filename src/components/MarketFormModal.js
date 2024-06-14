import { useState, useRef } from "react";
import { Modal, Button, TextInput, Label } from "flowbite-react";

const MarketFormModal = ({ brandId, onAddMarket, onClose }) => {
  const [name, setName] = useState("");
  const nameInputRef = useRef(null);

  const handleSubmit = () => {
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
              onChange={(e) => setName(e.target.value)}
              placeholder="Market adı"
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

export default MarketFormModal;
