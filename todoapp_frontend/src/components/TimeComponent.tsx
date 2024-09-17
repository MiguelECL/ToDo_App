import { useDataContext } from "../context/TimeDataContext";

const TimeComponent = () => {
    const timeData = useDataContext();

    let formatTotal = new Date(0);
    let formatHigh = new Date(0);
    let formatMedium = new Date(0);
    let formatLow = new Date(0);

    formatTotal.setSeconds(timeData.timeTotal);
    formatHigh.setSeconds(timeData.timeTotal);
    formatMedium.setSeconds(timeData.timeTotal);
    formatLow.setSeconds(timeData.timeTotal);

    let stringTotal = formatTotal.toISOString().substring(11,19);
    let stringHigh = formatHigh.toISOString().substring(11,19);
    let stringMedium = formatMedium.toISOString().substring(11,19);
    let stringLow = formatLow.toISOString().substring(11,19);

    return (    
        <div className="TimeComponent">
            <div className="timeColumn">
                <p>Average Time To Finish Tasks</p>
                <p>{stringTotal}</p>
            </div>
            <div className="timeColumn">
                <p>Average Time To Finish Tasks by Priority</p>
                <p>Low: {stringHigh}</p>
                <p>Medium: {stringMedium}</p>
                <p>High: {stringLow}</p>
            </div>
        </div>
     );
}
 
export default TimeComponent;