import useStore from '../hooks/useStore';

const MarketList = () => {
  const markets = useStore((state) => state.markets);
  console.log(markets);
  return (
    <div className="flex flex-col w-full space-y-4">
      {markets.map((market, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-bold">{market.name}</h2>
          <p>Market detayları...</p>
        </div>
      ))}
    </div>
  );
};

export default MarketList;
