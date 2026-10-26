import axios from "axios";
import type {ICandleStick} from "./interface";
export type BinanceKLine = [
    number,
    string,
    string,
    string,
    string
]

export async function getCandleStickData(
  quote: string,
  interval: string,
  limit: number,
): Promise<ICandleStick[]> {
  const endPoint = `https://api.binance.com/api/v3/klines?symbol=${quote}&interval=${interval}&limit=${limit}`
  console.log(endPoint)
    const res = await axios.get<BinanceKLine[]>(endPoint)
    const data = res.data.map((d) => ({time: d[0]/1000, open: parseFloat((d[1])), high: parseFloat((d[2])), low: parseFloat((d[3])), close: parseFloat((d[4]))}))
    return data;
}
