interface IProps {
  timeFrame: string;
  setTimeFrame: Function
}

const TimeFrame: React.FC<IProps> = (props) => {
  const { timeFrame, setTimeFrame } = props;
  function handleClick(e) {
    setTimeFrame(timeFrame)
    const tfContainer = document.getElementById('timeframe-container')
    tfContainer?.classList.add('hidden')
}
  return <li className="hover:border-b cursor-pointer" onClick={handleClick}>{timeFrame}</li>;
};

export default TimeFrame;
