import useStore from '../hooks/useStore';

const ProductList = () => {
  const products = useStore((state) => state.products);

  return (
    <ul>
      {products.map((product, index) => (
        <li key={index}>
          {product.name} - {product.quantity}
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
