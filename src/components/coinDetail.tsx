import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import { Route, Routes, useParams, Link } from "react-router-dom";
import { coinApi } from "../api";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Chart from "./chart";

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  contracts: object;
  parent: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Container = styled.section`
  max-width: 60rem;
  margin: 0 auto;
`;

const Name = styled.div`
  display: flex;
  justify-content: center;
  font-size: 3rem;
  padding: 2rem;
  color: ${(props) => props.theme.accentColor};
  span {
  }
`;

const OverView = styled.div`
  padding: 0 10rem;
  line-height: 1.5rem;
`;

const OverViewItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  background-color: #093687;
  border-radius: 15px;
  margin: 2rem 0;
`;

const Tabs = styled.div`
  span {
    display: flex;
    justify-content: center;
    background-color: #093687;
    padding: 0.5rem 0;
    border-radius: 15px;
  }
`;

const Tab = styled.span<{ isActive: boolean }>`
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;

const CoinDetail = () => {
  const { coinId }: any = useParams();
  const chartMatch = useMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => coinApi.getCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => coinApi.getCoinPriceInfo(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <Container>
      <Helmet>
        <title>{infoData?.name}</title>
      </Helmet>
      <Name>{infoData?.name}</Name>
      <OverView>
        <div>{infoData?.description}</div>
        <OverViewItem>
          <span>{`Rank: ${infoData?.rank}`}</span>
          <span>{`Symbol: ${infoData?.symbol}`}</span>
          <span>{`Price : $${tickersData?.quotes.USD.price.toFixed(0)}`}</span>
        </OverViewItem>
        <OverViewItem>
          <span>{`Total Suply: ${tickersData?.total_supply}`}</span>
          <span>{`Max Suply: ${tickersData?.max_supply}`}</span>
        </OverViewItem>
        <Tabs>
          <Link to={`/${coinId}/chart`}>
            <Tab isActive={chartMatch !== null}>Chart</Tab>
          </Link>
        </Tabs>
      </OverView>
      <Routes>
        <Route path='/chart' element={<Chart coinId={coinId} />} />
      </Routes>
    </Container>
  );
};

export default CoinDetail;
