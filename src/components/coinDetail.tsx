import { useParams } from "react-router-dom";

const CoinDetail = () => {
  const { coinId } = useParams();
  console.log(coinId);
  return (
    <div>
      <span>{`CoinDetail: ${coinId}`}</span>
    </div>
  );
};

export default CoinDetail;
