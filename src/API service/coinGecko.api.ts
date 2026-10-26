import axios from "axios";
import type { ICoinGecko } from "../Interface/ICoinGecko";

const URL = 'https://api.coingecko.com/api/v3/';

export async function getCoinList(page: number): Promise<ICoinGecko[]> {
    const endPoint = URL + 'coins/markets'
    const res = await axios.get<ICoinGecko[]>(endPoint, {
        params: {
                    vs_currency: "usd",
                    order: "market_cap_desc",
                    per_page: 100,
                    page: page,
                    price_change_percentage: '1h,24h,1d,7d,30d'
                }, 
        })
    return res.data
}

export async function searchCoin(query:string): Promise<ICoinGecko[]> {
    const endPoint = URL + 'search'
    const res = await axios.get<ICoinGecko[]>(endPoint, {
        params: {
            query: query
        }
    })
    console.log(`query: ${query}`)
    return res.data.coins
}