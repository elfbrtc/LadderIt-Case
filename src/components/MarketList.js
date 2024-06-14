"use client";
import useStore from "../hooks/useStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

const MarketList = ({ filteredMarkets }) => {
  const router = useRouter();

  const handleClick = (marketId) => {
    router.push(`/market/${marketId}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {filteredMarkets.map((market) => (
        <div
          key={market.id}
          onClick={() => handleClick(market.id)}
          className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 mb-4"
        >
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">{market.name}</h2>
            <p className="text-base text-gray-600">
              Toplam Ürün Aralığı: {market.totalProductRange}
            </p>
            <p className="text-base text-gray-600">
              Toplam Ürün: {market.totalProductQuantity}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketList;
