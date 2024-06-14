import useStore from "../hooks/useStore";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient.js";

const ProductList = ({ products }) => {
  const updateProductQuantity = useStore(
    (state) => state.updateProductQuantity
  );

  const handleQuantityChange = async (id, newQuantity) => {
    try {
      if (newQuantity >= 0) {
        const { data, error } = await supabase
          .from("Product")
          .update({ quantity: newQuantity })
          .eq("id", id)
          .select("*");
        if (error) {
          throw error;
        }
        updateProductQuantity(id, newQuantity);
      }
    } catch (error) {
      console.error("Miktar güncellenirken bir hata oluştu:", error.message);
    }
  };

  return (
    <div className="flex flex-col w-full space-y-4">
      {products.map((product, index) => (
        <div
          key={index}
          className="relative bg-white rounded-lg shadow-md p-4 border border-gray-300 flex items-center justify-center"
          style={{ minWidth: "400px" }}
        >
          <button
            className="absolute left-[-40px] bg-transparent p-2"
            onClick={() =>
              handleQuantityChange(product.id, product.quantity - 1)
            }
          >
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 12H6"
              />
            </svg>
          </button>
          <h2 className="text-lg font-bold text-center flex-1">
            {product.name}
          </h2>
          <span className="text-lg font-bold text-center flex-1">
            {product.quantity}
          </span>
          <button
            className="absolute right-[-40px] bg-transparent p-2"
            onClick={() =>
              handleQuantityChange(product.id, product.quantity + 1)
            }
          >
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v12m6-6H6"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
