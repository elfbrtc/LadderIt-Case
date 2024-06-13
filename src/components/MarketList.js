import useStore from '../hooks/useStore';

const MarketList = () => {
  const markets = useStore((state) => state.markets);

  return (
    <ul>
      {markets.map((market, index) => (
        <li key={index}>{market}</li>
      ))}
    </ul>
  );
};

export default MarketList;
