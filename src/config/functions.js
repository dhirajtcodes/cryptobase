import axios from "axios";
import { CoinList, TrendingCoins, HistoricalChart } from "../utils/api";

export const FetchCoinLists = async (currency) => {
  return new Promise((resolve, reject) => {
    axios
      .get(CoinList(currency))
      .then((result) => {
        resolve(result);
      })
      .catch((err) => reject(err));
  });
};

export const FetchTrendingCoins = async (currency) => {
  return new Promise((resolve, reject) => {
    axios
      .get(TrendingCoins(currency))
      .then((result) => {
        resolve(result);
      })
      .catch((err) => reject(err));
  });
};

export const FetchHistoricData = async (id, days, currency) => {
  return new Promise((resolve, reject) => {
    axios
      .get(HistoricalChart(id, days, currency))
      .then((result) => {
        resolve(result);
      })
      .catch((err) => reject(err));
  });
};
