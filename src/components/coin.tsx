import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { coinApi } from "../api";

interface CoinInterface {
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
  &:hover {
    ${Name} {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Coin = () => {
  const [coins, setCoins] = useState<CoinInterface[]>([]);

  useEffect(() => {
    coinApi.getCoin().then((result) => setCoins(result));
  }, []);

  console.log(coins);
  return (
    <CoinContainer>
      <Header>코인</Header>
      <CoinList>
        {coins &&
          coins.map((coin) => (
            <CoinItem key={coin.id}>
              <Link to={`/${coin.id}`}>
                <Name>{coin.name} &rarr;</Name>
              </Link>
            </CoinItem>
          ))}
      </CoinList>
    </CoinContainer>
  );
};

export default Coin;
