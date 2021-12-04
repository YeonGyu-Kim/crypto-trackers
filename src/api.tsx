import axios from "axios";

export const coinApi = {
  getCoin: async () =>
    await axios.get("https://api.coinpaprika.com/v1/coins").then((result) => {
      return result.data.slice(0, 50);
    }),
};
