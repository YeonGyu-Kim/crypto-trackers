import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coinpaprika.com/v1/",
});

export const coinApi = {
  getCoin: async () =>
    await api.get("/coins").then((response) => {
      return response.data.slice(0, 50);
    }),

  getCoinInfo: async (coinId: string | undefined) =>
    await api.get(`/coins/${coinId}`).then((response) => {
      return response.data;
    }),

  getCoinPriceInfo: async (coinId: string | undefined) =>
    await api.get(`/tickers/${coinId}`).then((response) => response.data),
};
