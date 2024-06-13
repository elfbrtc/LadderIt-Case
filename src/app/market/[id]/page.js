"use client";
import { useRouter } from 'next/navigation';
import { useParams } from "next/navigation";
import { useEffect } from 'react';
import ProductForm from '@/components/ProductForm';

const Product = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {}, []);
   
  return (
    <div>
      <ProductForm id={id}/>
    </div>
  );
};

export default Product;