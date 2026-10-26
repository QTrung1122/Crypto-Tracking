import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getCandleStickData } from "../../API service/binance.api";
import { createNewChart } from "../../API service/chart";
import {
  CandlestickSeries,
  type ISeriesApi,
  type IChartApi,
} from "lightweight-charts";
import TimeFrame from "./TimeFrame";
import axios from "axios";
import SearchBar from "../Search/SearchBar";
import SearchBox from "../Search/SearchBox";

const CoinDetail = () => {
  const { symbol } = useParams();
  const [timeFrame, setTimeFrame] = useState("1d");
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const quote = symbol?.toUpperCase() + "USDT";
  const timeFrames = ["1h", "1d", "1w", "1M"];
  function openSearchBox() {
    const modal = document.querySelector(
      "#search-box",
    ) as HTMLDialogElement | null;
    if (modal != null) {
      modal.showModal();
    }
  }
  function closeSearchBox(moreAction?: Function) {
    const modal = document.querySelector(
      "#search-box",
    ) as HTMLDialogElement | null;
    if (modal != null) {
      modal.close();
    }
    if (moreAction !== undefined) {
      moreAction();
    }
  }
  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol}usdt@kline_${timeFrame}`,
    );
    ws.onopen = () => {
      console.log(`${symbol} stream connect success`);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const price = data.k;
      const cdata = {
        time: price.t / 1000, // convert milisecond to second
        open: Number(price.o),
        high: Number(price.h),
        low: Number(price.l),
        close: Number(price.c),
      };
      if (seriesRef.current !== null) {
        seriesRef.current.update(cdata);
      }
    };

    ws.onerror = (err) => {
      console.log(`err: ${err}`);
    };

    ws.onclose = (code) => {
      console.log(`Socket closed: ${code}`);
    };

    const chart = createNewChart();
    if (chart !== null) {
      chartRef.current = chart;
    }

    return () => {
      chart?.remove();
      chartRef.current = null;
      seriesRef.current = null;
      if (ws !== null) {
        ws.close();
      }
    };
  }, []);
  useEffect(() => {
    async function fetchData() {
      const candleData = await getCandleStickData(quote, timeFrame, 500);
      const res = await axios.get(
        `https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}USDT`,
      );
      console.log(res);
      const data: { symbol: string; price: string } = res;
      const precision = Number(data.price) < 1 ? 5 : 2;
      console.log(precision);
      const chart = chartRef.current;
      if (chart === null) return;
      if (seriesRef.current === null) {
        seriesRef.current = chart.addSeries(CandlestickSeries, {
          priceFormat: {
            type: "price",
            precision,
            minMove: 1 / 10 ** precision,
          },
        });
      }
      seriesRef.current.setData(candleData);
    }
    fetchData();
  }, [timeFrame, symbol]);
  return (
    <section>
      <SearchBar openSearchBox={openSearchBox} />
      <SearchBox closeSearchBox={closeSearchBox} />
      <div className="flex">
        <div className="flex text-2xl items-end mr-[20px]"><span>{symbol?.toUpperCase()}/USDT</span></div>
      <div className="timeframe-container flex bg-slate-600 w-fit p-[5px] rounded-[8px]">
        {timeFrames.map((tf) => {
          return (
            <TimeFrame
              timeFrame={timeFrame}
              setTimeFrame={setTimeFrame}
              value={tf}
            />
          );
        })}
      </div>
      </div>
      <div id="chart-container" data-lenis-prevent-wheel></div>
    </section>
  );
};

export default CoinDetail;
