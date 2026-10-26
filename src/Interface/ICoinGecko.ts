export interface ICoinGecko {
  market_cap_rank: string,
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  ath: number;
  market_cap: number;
  ath_change_percentage: number;
  price_change_percentage_1h_in_currency: number | null;
  price_change_percentage_24h_in_currency: number | null;
  price_change_percentage_7d_in_currency: number | null;
  price_change_percentage_30d_in_currency: number | null;
}