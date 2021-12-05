import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { coinApi } from "../api";

interface ICoin {
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  rank: number;
  symbol: string;
  type: string;
}

const CoinContainer = styled.section``;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
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

  const { isLoading, data } = useQuery<ICoin[]>("allCoins", () =>
    coinApi.getCoin()
  );

  console.log(isLoading, data);
  return (
    <CoinContainer>
      <Header>코인</Header>
      <CoinList>
        {data && isLoading
          ? "Loading..."
          : data?.map((coin) => (
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
