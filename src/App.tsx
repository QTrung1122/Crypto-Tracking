import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CoinList from "./Component/Coin/CoinList";
import type { ICoinGecko } from "./Interface/ICoinGecko.ts";
import CoinDetail from "./Component/Detail/CoinDetail.tsx";
import Portfolio from "./Component/Portfolio/Portfolio.tsx";
import NavBar from "./NavBar/NavBar.tsx";
import Paging from "./Component/Page/Paging.tsx";
import { FaChevronUp } from "react-icons/fa";
import { getCoinList } from "./API service/coinGecko.api.ts";
import SearchBar from "./Component/Search/SearchBar.tsx";
import SearchBox from "./Component/Search/SearchBox.tsx";

const log = console.log

const App = () => {
  const [coins, setCoins] = useState<ICoinGecko[]>([]);
  const [page, setPage] = useState<number>(1)
  

  
  useEffect(() => {
    async function fetchCoin() {
      const coinList = await getCoinList(page);
      const listOfNewCoin = coinList.map((coin) => {
        let newCoin: ICoinGecko = {
          market_cap_rank: coin.market_cap_rank,
          name: coin.name,
          symbol: coin.symbol,
          image: coin.image,
          current_price: coin.current_price,
          ath: coin.ath,
          market_cap: coin.market_cap,
          ath_change_percentage: coin.ath_change_percentage,
          price_change_percentage_1h_in_currency:
            coin.price_change_percentage_1h_in_currency,
          price_change_percentage_24h_in_currency:
            coin.price_change_percentage_24h_in_currency,
          price_change_percentage_7d_in_currency:
            coin.price_change_percentage_7d_in_currency,
          price_change_percentage_30d_in_currency:
            coin.price_change_percentage_30d_in_currency,
        };
        return newCoin;
      });
      setCoins(listOfNewCoin);
    }
    fetchCoin();
    function handleScroll() {
      const toTop = document.querySelector(".to-top");
      if (window.scrollY > 100) {
        toTop?.classList.add("opacity-50");
      } else {
        toTop?.classList.remove("opacity-50");
        toTop?.classList.add("opacity-0");
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  return (
    <BrowserRouter>
      <div className=" text-white app-container font-bold">
        <NavBar />
        <div className="p-3">
          <Routes>
            <Route
              path="/"
              element={<CoinList coins={coins} page={page} setPage={setPage}/>}
            />
            <Route path="/:symbol" element={<CoinDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </div>
        <Paging />
        <a
          href="#"
          className="to-top transition duration-400 fixed bg-white bottom-[32px] right-[32px] w-[50px] h-[50px] rounded-full flex justify-center items-center"
        >
          <FaChevronUp className="text-black" />
        </a>
      </div>
    </BrowserRouter>
  );
};

export default App;
