import { TimeDataModel } from "../../context/TimeDataContext";

export const formatData = (data: TimeDataModel ) => {
    let formatTotal = new Date(0);
    let formatHigh = new Date(0);
    let formatMedium = new Date(0);
    let formatLow = new Date(0);

    formatTotal.setSeconds(data.timeTotal);
    formatHigh.setSeconds(data.timeHigh);
    formatMedium.setSeconds(data.timeMedium);
    formatLow.setSeconds(data.timeLow);

    let stringTotal = formatTotal.toISOString().substring(11,19);
    let stringHigh = formatHigh.toISOString().substring(11,19);
    let stringMedium = formatMedium.toISOString().substring(11,19);
    let stringLow = formatLow.toISOString().substring(11,19);

    return {stringTotal, stringHigh, stringMedium, stringLow};
}