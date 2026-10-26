import { useNavigate } from "react-router-dom";
import type { ICoinGecko } from "../../Interface/ICoinGecko";
import { formatNumber } from "../../utils";

interface IProps {
  coin: ICoinGecko;
  timeFrame: string;
}

const Coin: React.FC<IProps> = (props) => {
  const { coin, timeFrame } = props;
  const navigate = useNavigate();
  let percentage;
  switch (timeFrame) {
    case "1h":
      percentage = coin.price_change_percentage_1h_in_currency;
      break;
    case "7d":
      percentage = coin.price_change_percentage_7d_in_currency;
      break;
    case "30d":
      percentage = coin.price_change_percentage_30d_in_currency;
      break;
    case "all time high":
      percentage = coin.ath_change_percentage;
      break;
    default:
      percentage = coin.price_change_percentage_24h_in_currency;
  }
  let color = "white";
  if (percentage != null) {
    if (percentage < 0) {
      color = "red";
    } else if (percentage > 0) {
      color = "green";
    }
  }

  return (
      <tr className="border-b border-gray-700 cursor-pointer hover:bg-[#222531] px-5" onClick={() => navigate('/' + coin.symbol)}>
        <td className="text-center">{coin.market_cap_rank}</td>
        <td className="flex justify-start items-center py-3 ">
          <img src={coin.image} className="w-5 h-5 rounded-full mr-2" />
          <span className="mr-3">{coin.name}</span>{" "}
          <span className="text-[#989EB2]">{coin.symbol.toUpperCase()}</span>
        </td>
        <td className="text-end">${formatNumber(coin.current_price)}</td>
        <td className="text-end">${formatNumber(coin.ath)}</td>
        <td className="text-end">${formatNumber(coin.market_cap)}</td>
        <td
          className={`text-end px-5 ${color == "red" ? "text-red-500" : "text-green-500"}`}
        >
          {percentage != null && percentage > 0 ? "+" : ""}
          {percentage != null ? `${percentage.toFixed(2)}%` : ""}
        </td>
      </tr>
  );
};

export default Coin;
