"use client";
import useStore from '../hooks/useStore';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const MarketList = ({markets}) => {
  const router = useRouter();

  useEffect(() => {
  
  }, []);

  const handleClick = (marketId) => {
    router.push(`/market/${marketId}`)
  };

  return (
    <div className="flex flex-col w-full space-y-4">
      {markets.map((market, index) => (
          <div onClick={() => handleClick(market.id)} key={index} className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-bold">{market.name}</h2>
          <p>Market detayları...</p>
        </div>
      ))}
    </div>
  );
};

export default MarketList;
