import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coinpaprika.com/v1/",
});

const endDate = Math.floor(Date.now() / 1000);
const startDate = endDate - 60 * 60 * 24 * 7 * 2;

export const coinApi = {
  getCoin: async () =>
    await api.get("/coins").then((response) => {
      return response.data;
    }),

  getCoinInfo: async (coinId: string) =>
    await api.get(`/coins/${coinId}`).then((response) => {
      return response.data;
    }),

  getCoinPriceInfo: async (coinId: string) =>
    await api.get(`/tickers/${coinId}`).then((response) => response.data),

  getCoinHistory: async (coinId: string) =>
    await api
      .get(
        `/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
      )
      .then((response) => response.data),
};
