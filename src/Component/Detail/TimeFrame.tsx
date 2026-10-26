interface IProps {
    timeFrame: string,
    setTimeFrame: Function,
    value: string
}

const TimeFrame: React.FC<IProps> = (props) => {
    
    const {timeFrame, setTimeFrame, value} = props
    return ( 
        <span className={`p-[7px] cursor-pointer mr-[3px] rounded-[8px] hover:bg-slate-800 ` + (timeFrame === value ? 'bg-slate-950' : '')} onClick={() => setTimeFrame(value)}>{value}</span>
     );
}
 
export default TimeFrame;