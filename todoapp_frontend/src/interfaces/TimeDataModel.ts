import React from 'react';

export interface TimeDataContextType {
    timeTotal: number;
    setTimeTotal: React.Dispatch<React.SetStateAction<number>>;
    timeLow: number;
    setTimeLow: React.Dispatch<React.SetStateAction<number>>;
    timeMedium: number;
    setTimeMedium: React.Dispatch<React.SetStateAction<number>>;
    timeHigh: number;
    setTimeHigh: React.Dispatch<React.SetStateAction<number>>;
}