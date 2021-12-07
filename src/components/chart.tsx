import React from "react";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { useQuery } from "react-query";
import { coinApi } from "../api";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const ChartContainer = styled.section`
  padding: 0 10rem;
  margin: 2rem 0;
`;

const Chart = ({ coinId }: ChartProps) => {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => coinApi.getCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <ChartContainer>
      <ApexChart
        type='line'
        series={[
          {
            name: "Price",
            data: data?.map((price) => Math.floor(price.close)),
          },
        ]}
        options={{
          theme: {
            mode: "dark",
          },
          chart: {
            height: 300,
            width: 500,
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          grid: { show: false },
          stroke: {
            curve: "smooth",
            width: 4,
          },
          xaxis: {
            categories: data?.map((price) => price.time_close.split("T")[0]),
            labels: {
              style: {
                colors: isDark ? "white" : "black",
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: isDark ? "white" : "black",
              },
            },
          },
        }}
      />
    </ChartContainer>
  );
};

export default Chart;
