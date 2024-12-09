import React, { useState } from 'react';
import ToDoList from './components/ToDoList';
import NavBar from './components/NavBar';
import FilterBox from './components/presentational/FilterBox';
import TimeComponent from './components/TimeComponent';
import CreateModal from './components/presentational/CreateModal';
import { TimeDataContext } from './context/TimeDataContext';
import { Container } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Container className="App">
      <NavBar />
      <FilterBox update={update} setUpdate={setUpdate} setSearchParameters={setSearchParameters}/>
      <CreateModal update={update} setUpdate={setUpdate} />
      <TimeDataContext.Provider value={TimeData}>
        <ToDoList endpoint={endpoint} searchParameters={searchParameters} update={update} setUpdate={setUpdate} />
        <TimeComponent />
      </TimeDataContext.Provider>
    </Container>
    </LocalizationProvider>
  );
}

export default App;
