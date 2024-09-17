import { useState } from "react";
import { useContext } from "react";
import { TimeDataContext, useDataContext } from "../context/TimeDataContext";


const TimeComponent = () => {
    const timeData = useDataContext();

    return (    
        <div className="TimeComponent">
            <div className="timeColumn">
                <p>Average Time To Finish Tasks</p>
                <p>{timeData.timeTotal}</p>
            </div>
            <div className="timeColumn">
                <p>Average Time To Finish Tasks by Priority</p>
                <p>Low: {timeData.timeLow}</p>
                <p>Medium: {timeData.timeMedium}</p>
                <p>High: {timeData.timeHigh}</p>
            </div>
        </div>
     );
}
 
export default TimeComponent;