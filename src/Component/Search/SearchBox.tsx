import { IoCloseSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { searchCoin } from "../../API service/coinGecko.api";
import { useNavigate } from "react-router-dom";

const SearchBox = ({
  closeSearchBox,
}: {
  closeSearchBox: (moreAction?: Function) => void;
}) => {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchList, setSearchList] = useState([])
  const [anounce, setAnounce] = useState('')
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function clear() {
    const input = document.getElementById("queryInput");
    if (input != null) {
      input.value = "";
    }

    const searchRes = document.querySelector(".search-result");
    if (searchRes !== null) {
      setAnounce('')
    }

    setSearchList([])
  }

  async function search(e) {
    e.preventDefault();
    const input = document.querySelector("#queryInput");
    if (input != null) {
      const res = await searchCoin(input.value);
      const searchRes = document.querySelector(".search-result");
      if (res.length === 0) {
        if (searchRes !== null) {
          setAnounce('Coin not found')
        }
        setSearchList([])
      } else {
        setSearchList(res)
      }
    }
  }
  return (
    <dialog
      id="search-box"
      className="fixed mt-5 m-auto p-5 w-[50vw] h-[95vh] border-none rounded-[6px] bg-[#1f1f1f] [scrollbar-width:none] "
    >
      <div className="flex justify-between ">
        <div className="text-2xl text-white">Search coin</div>
        <button
          className=" cursor-pointer p-2 rounded-[6px] hover:bg-gray-400"
          onClick={() => closeSearchBox(clear)}
        >
          <IoCloseSharp className="text-2xl text-white" />
        </button>
      </div>
      <form
        onSubmit={search}
        className="flex items-center justify-start text-white w-[99%] border border-slate-300 rounded-[7px] mt-[15px] p-[10px]"
      >
        <FaSearch className="text-slate-300 top-3 left-4 mr-[10px]" />
        <input
          id="queryInput"
          ref={inputRef}
          type="text"
          className="w-full focus:outline-none"
          placeholder="Coin name"
          autoFocus
          onChange={() => {
            setAnounce('')
            setSearchList([])
          }}
        />
      </form>

      <div className="search-result text-white mt-[20px] ">
        {
          searchList.length !== 0 ? (<div className="text-end right-0">Marketcap rank</div>) : ('')
        }
        {
          anounce !== '' ? 
          <div className="text-white text-2xl text-center mt-10">{anounce}</div> :
          ''
        }
        <div className="max-h-[70vh] overflow-y-auto">
          {
          searchList.map(coin => {
            return (
              <div className="flex justify-between items-center p-2.5 cursor-pointer hover:bg-slate-200 hover:text-black" onClick={()=>navigate('/' + coin.symbol)}>
                <div className="flex justify-center">
                    <img src={coin.thumb} className="mr-1"/>
                  <span className="mr-3">{coin.name}</span>
                  <div className=" text-[#989EB2]">
                    {coin.symbol}
                  </div>
                </div>
                <span >{coin.market_cap_rank ? (`#${coin.market_cap_rank}`) : 'Unrank'}</span>
              </div>
            )
          })
        }
        </div>
      </div>
    </dialog>
  );
};

export default SearchBox;
