import React, { useState } from 'react';
import ToDoList from './components/ToDoList';
import NavBar from './components/NavBar';
import FilterBox from './components/FilterBox';
import TimeComponent from './components/TimeComponent';
import CreateModal from './components/CreateModal';
import { TimeDataContext } from './context/TimeDataContext';

function App() {
  const [update, setUpdate] = useState(false);
  const [searchParameters, setSearchParameters] = useState(["","All","All"]);

  const [timeTotal, setTimeTotal] = useState(0);
  const [timeLow, setTimeLow] = useState(0);
  const [timeMedium, setTimeMedium] = useState(0);
  const [timeHigh, setTimeHigh] = useState(0);

  const TimeData = {timeTotal, setTimeTotal, timeLow, setTimeLow, timeMedium, setTimeMedium, timeHigh, setTimeHigh};

  let endpoint:string = "http://localhost:9090"
  
  return (  
    <div className="App">
      <NavBar />
      <FilterBox update={update} setUpdate={setUpdate} setSearchParameters={setSearchParameters}/>
      <CreateModal update={update} setUpdate={setUpdate} />
      <TimeDataContext.Provider value={TimeData}>
        <ToDoList endpoint={endpoint} searchParameters={searchParameters} update={update} setUpdate={setUpdate} />
        <TimeComponent />
      </TimeDataContext.Provider>
    </div>
  );
}

export default App;
