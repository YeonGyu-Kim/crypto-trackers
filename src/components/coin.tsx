import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { coinApi } from "../api";
import { Helmet } from "react-helmet";
import styled from "styled-components";

interface ICoin {
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  rank: number;
  symbol: string;
  type: string;
}

const CoinContainer = styled.section`
  max-width: 50rem;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  padding: 2rem;
`;

const CoinList = styled.ul`
  margin: 0 2rem;
`;

const Img = styled.img`
  width: 3rem;
  height: 3rem;
  margin: 0 1rem;
`;

const Name = styled.h1`
  color: ${(props) => props.theme.bgColor};
  font-size: 1.5rem;
  padding: 1rem 0;
  transition: color 0.3s ease-in-out;
`;

const CoinItem = styled.li`
  padding: 0 1rem;
  margin-bottom: 1rem;
  border: 1px solid inherit;
  background-color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  a {
    display: flex;
    align-items: center;
  }
  &:hover {
    ${Name} {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Coin = () => {
  /* const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    coinApi
      .getCoin()
      .then((result) => setCoins(result))
      .then(() => setLoading(false));
  }, []); */

  const { isLoading, data } = useQuery<ICoin[]>("allCoins", coinApi.getCoin);
  return (
    <CoinContainer>
      <Helmet>
        <title>Coin</title>
      </Helmet>
      <Header>Coin</Header>
      <CoinList>
        {data && isLoading
          ? "Loading..."
          : data?.slice(0, 50)?.map((coin) => (
              <CoinItem key={coin.id}>
                <Link to={`/${coin.id}`}>
                  <Img
                    src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  <Name>{coin.name} &rarr;</Name>
                </Link>
              </CoinItem>
            ))}
      </CoinList>
    </CoinContainer>
  );
};

export default Coin;
