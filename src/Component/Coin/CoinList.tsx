import { useState } from "react";
import type { ICoinGecko } from "../../Interface/ICoinGecko";
import Coin from "./Coin";
import { IoMdArrowDropdown } from "react-icons/io";import TimeFrame from "./TimeFrame";
import SearchBar from "../Search/SearchBar";
import SearchBox from "../Search/SearchBox";
interface IProps {
  coins: ICoinGecko[];
  page: number;
  setPage: Function
}

const CoinList: React.FC<IProps> = (props) => {
  const [timeFrame, setTimeFrame] = useState<string>("24h");
  const { coins, page, setPage } = props;
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const timeFrames = ['1h', '24h', '7d', '30d', 'all time high']

  function handleClick(num: number) {
    setPage(num)
    const table = document.querySelector('.search-bar')

    table?.scrollIntoView ({
      behavior: "smooth",
      block: "start"
    })
  }
  function openSearchBox() {
    const modal = document.querySelector('#search-box') as HTMLDialogElement | null
    if(modal != null) {
      modal.showModal()
    }
  }
  function closeSearchBox(moreAction?: Function) {
      const modal = document.querySelector('#search-box') as HTMLDialogElement | null
      if(modal != null) {
        modal.close()
      }
      if(moreAction !== undefined) {
        moreAction()
      }
    }
  return (
    <section>
        <SearchBar openSearchBox={openSearchBox}/>
        <SearchBox closeSearchBox={closeSearchBox}/>
      <table className="w-[95vw] p-4 m-auto coin-list">
        <thead>
          <tr className="sticky top-0 bg-[#0d1421] border-b border-gray-700 text-[20px]">
            <th className="w-10 py-3">#</th>
            <th className="text-start w-50">Name</th>
            <th className="text-end">Price</th>
            <th className="text-end">Highest price</th>
            <th className="text-end">MarketCap</th>
            <th className="relative text-end px-5 flex justify-end items-center mt-[10px]" id='change'>
              <span>Change </span>
               <span className='timeframe'>({timeFrame})</span>
               <IoMdArrowDropdown className="cursor-pointer" onClick={()=>{
                const  tfContainer = document.querySelector('#timeframe-container')
                tfContainer?.classList.remove('hidden')
               }}/>
              <ul className="hidden text-center absolute bg-[#323546] bottom-[-200px] p-[10px] rounded-[14px]" id="timeframe-container">
                {
                  timeFrames.map(tf => {
                    return <TimeFrame timeFrame={tf} setTimeFrame={setTimeFrame}/>
                  })
                }
              </ul>
              <span> %</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => {
            return <Coin coin={coin} timeFrame={timeFrame}/>;
          })}
        </tbody>
      </table>
      <div className="flex justify-center my-15">
        {nums.map((num) => {
          return (
            <button
              key="num"
              className={`w-[20px] h-[20px] cursor-pointer ml-5 p-5 rounded-[8px] flex justify-center items-center
              ${num === page ? ('bg-slate-50 text-black') : ''}
                hover:bg-slate-200 hover:text-black`

              }
              onClick={() => handleClick(num)}
            >
              {num}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CoinList;
