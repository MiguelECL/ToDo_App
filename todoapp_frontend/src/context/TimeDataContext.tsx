import { createContext, useContext } from "react";

export interface TimeDataModel{
    timeTotal:number,
    setTimeTotal:Function,
    timeLow:number,
    setTimeLow:Function,
    timeMedium:number,
    setTimeMedium:Function,
    timeHigh:number
    setTimeHigh:Function
}

export const TimeDataContext = createContext<TimeDataModel | undefined>(undefined);

// Custom hook for avoiding undefined behavior
export const useDataContext = () => {
    const data = useContext(TimeDataContext);
    if (data === undefined){
        throw new Error("Must use TimeDataContext to avoid undefined behavior");
    }
    return data;
}