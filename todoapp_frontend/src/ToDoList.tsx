import { SyntheticEvent, useEffect, useState } from "react";
import { useDataContext } from "./context/TimeDataContext";
import { Button, Container, Dialog, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const ToDoList = ({endpoint, searchParameters, update, setUpdate}:{endpoint:string, searchParameters:Array<string>, update:boolean, setUpdate:Function}) => {

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Importing the backend URL from the .env file.

    // react usueState of an Object containing the data of the ToDo
    const [todoData, setTodoData] = useState({
        id: Date.now(),
        name: "",
        priority: "",
        dueDate: "",
        creationDate: "",
        doneDate: "",
        doneFlag: false
    });
    
    const [open, setOpen] = useState(false); // react useState of a boolean to control the opening and closing of the dialog.
    const [isLoading, setIsLoading] = useState(true); // react useState of a boolean monitor the loading of the data.
    const [toDos, setToDos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // react useState of a number to monitor the current page of the pagination.
    const [currentToDos, setCurrentToDos] = useState([]);  // react useState of an array to store the current ToDos to be displayed.
    const [updateMetrics, setUpdateMetrics] = useState(false); // react useState of a boolean to update the metrics.
    
    // Variables for sorting
    const TimeData = useDataContext();
    let prioritySort = ["no","ascending","descending"];
    let dateSort = ["no","ascending","descending"];
    const [indexPrioritySort, setIndexPrioritySort] = useState(0);
    const [indexDateSort, setIndexDateSort] = useState(0);


    const handlePrioritySort = (e:SyntheticEvent) => {
        if(indexPrioritySort === 2){
            setIndexPrioritySort(0);
        } else {
            setIndexPrioritySort(indexPrioritySort + 1);
            console.log(indexPrioritySort);
        }
        setUpdate(!update);
    }

    const handleDateSort = (e:SyntheticEvent) => {   
        if(indexDateSort === 2){
            setIndexDateSort(0);
        } else {
            setIndexDateSort(indexDateSort + 1);
            console.log(indexDateSort);
        }
        setUpdate(!update);
    }
   
    // SEARCH AND SORT PARAMETERS
    let parameter0 = currentPage;
    let parameter1 = searchParameters[0];
    let parameter2 = searchParameters[1];
    let parameter3 = searchParameters[2];
    let parameter4 = prioritySort[indexPrioritySort];
    let parameter5 = dateSort[indexDateSort]


    // FETCH DATA GET
    useEffect(() => {
        let finalEndpoint =  `${BACKEND_URL}` + '/todos?searchName=' + parameter1 + '&searchPriority=' + parameter2 + '&searchState=' + parameter3 + '&sortPriority=' + parameter4 + '&sortDate=' + parameter5;
        fetch(finalEndpoint,{
            method:"GET",
            headers: {"Content-Type":"application/json"}
        }).then(response => {
            if(response.ok){
                return response.json();
        }}).then((data) => {
            setToDos(data);
        }).then(() => {
            let finalEndpoint = `${BACKEND_URL}` + '/todos?page=' + parameter0 +'&searchName=' + parameter1 + '&searchPriority=' + parameter2 + '&searchState=' + parameter3 + '&sortPriority=' + parameter4 + '&sortDate=' + parameter5;
            fetch(finalEndpoint,{
                method:"GET",
                headers: {"Content-Type":"application/json"}
            }).then(response => {
                if(response.ok){
                    return response.json();
                }
            }).then((data) => {
                setCurrentToDos(data);
                setIsLoading(false);
                setUpdateMetrics(!updateMetrics);
        })
        }).catch(error => {
            console.log('Failed to fetch Data ' + error)
        });
    },[update,searchParameters]);


    const handleEdit = (e:SyntheticEvent) =>  {
        e.preventDefault();
        let date = 0;
        date = Date.parse(todoData.doneDate);
        const updateToDo = {
            id: todoData.id,
            name: todoData.name,
            dueDate: todoData.dueDate,
            doneFlag: todoData.doneFlag,
            doneDate: todoData.doneDate,
            priority: todoData.priority,
            creationDate: todoData.creationDate
        };
        fetch( `${BACKEND_URL}` + '/todos/'+[updateToDo.id],{
            method:"PUT",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(updateToDo)
        }).then(() => {
            setUpdate(!update);
        }).catch(error => {
            console.log('failed to communicte with API , is the server running? Error: ' + error);
        })
    }

    const handleDelete = (e:SyntheticEvent) => {
        e.preventDefault();
        
        fetch(`${BACKEND_URL}/todos/${todoData.id}`,{
            method:"DELETE",
            headers: {
                "Access-Control-Allow-Origin":"*"
            }
        }).then(() => {
            setUpdate(!update);
        }).catch(error => {
            console.log('failed to communicate with API, is the server running? Error: ' + error);
        })
        handleClose();
    }

    const handleCheck = (e:SyntheticEvent, item:any) => {
       e.preventDefault();   
        
       item.doneFlag = (!item.doneFlag);
       if(item.doneFlag){
            let addDoneDate = (new Date().toISOString());
            let updateToDo = {...item, doneDate:addDoneDate};
            fetch(`${BACKEND_URL}/todos/${item.id}/done`,{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(updateToDo)
            }).then(() => {
                setUpdate(!update);
            })
            console.log("posted");
       } else {
            let addDoneDate = ("");
            let updateToDo = {...item, doneDate:addDoneDate};
            fetch(`${BACKEND_URL}/todos/${item.id}/undone`,{
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(updateToDo)
            }).then(()=> {
                setUpdate(!update);
               
            })
            console.log("putted");
       }
       
    }
    
    // METRICS
    useEffect(() => {
        let timeTotal = 0;
        let numberOfItems = 0;
        TimeData.setTimeTotal(0);
        TimeData.setTimeHigh(0);
        TimeData.setTimeMedium(0);
        TimeData.setTimeLow(0);
        toDos.map((item:any) => {
            // if item is done, compute difference in minutes that it took to finish said task.
            if(item.doneFlag === true && item.doneDate !== ""){
                console.log("yeah");
                numberOfItems++;
                let creationTime = Date.parse(item.creationDate);
                let doneTime = Date.parse(item.doneDate);
                let differenceSeconds = ((doneTime - creationTime)/(1000)); //seconds
                console.log(differenceSeconds);
                timeTotal += differenceSeconds;
                
                TimeData.setTimeTotal(timeTotal/numberOfItems);

                switch(item.priority){
                    case "High":
                        TimeData.setTimeHigh(differenceSeconds);
                        break;
                    case "Medium":
                        TimeData.setTimeMedium(differenceSeconds);
                        break;
                    case "Low":
                        TimeData.setTimeLow(differenceSeconds);
                        break;
                    default:
                        console.log("ERROR");
                }
            } 
        })
    },[updateMetrics])

    const handlePaginatePrev = () => {
        if(currentPage>1){
            setCurrentPage(currentPage - 1);
            setUpdate(!update);
        }
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handlePaginateNext = () => {
        let sizeToDos = toDos.length;
        console.log(sizeToDos);
        
        if(sizeToDos > currentPage*10){
            console.log("here");
            setCurrentPage(currentPage + 1);
            setUpdate(!update);
        }
    }
    //item.doneFlag ? {textDecoration:"line-through",textDecorationColor:"gray",opacity:"0.5"} : {textDecoration:"none"}
    const ToDoRowStyle = (item:any) => {
        let itemDate = Date.parse(item.dueDate);
        let style = {};
        if (item.doneFlag){
            if (item.dueDate === ""){
                style = {"background-color":"",
                    "text-decoration":"line-through",
                    "opacity":"0.4"
                };
            } else if ((itemDate - Date.now()) < 604800000){
                style = {"background-color":"FireBrick",
                    "text-decoration":"line-through",
                "opacity":"0.4"};
            } else if ((itemDate - Date.now()) < 1.2096E+9){
                style = {"background-color":"GoldenRod",
                    "text-decoration":"line-through",
                "opacity":"0.4"};
            } else if ((itemDate - Date.now()) >= 1.2096E+9){
                style = {"background-color":"green",
                    "text-decoration":"line-through",
                "opacity":"0.4"};
            }
        } else {
            if (item.dueDate === ""){
                style = {"background-color":"",};
            } else if ((itemDate - Date.now()) < 604800000){
                style = {"background-color":"FireBrick"};
            } else if ((itemDate - Date.now()) < 1.2096E+9){
                style = {"background-color":"GoldenRod"};
            } else if ((itemDate - Date.now()) >= 1.2096E+9){
                style = {"background-color":"green"};
            }
        }

        return style;
    }

    return (
        <Container className="ToDoList">
            <Table className="todo-table">
                <TableHead>
                    <TableRow>
                        <TableCell>Mark</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell><Button variant="outlined" onClick={(e) => handlePrioritySort(e)}>Priority &lt;&gt; </Button></TableCell>
                        <TableCell><Button variant="outlined" onClick={(e) => handleDateSort(e)}>Due Date &lt;&gt; </Button></TableCell>
                        <TableCell>State</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!isLoading && currentToDos.map((item:any) => (
                        <TableRow key={item.id} style={ToDoRowStyle(item)}>
                            <TableCell><Button variant="outlined" onClick={(e) => {
                                handleCheck(e,item)}}>
                            Toggle</Button></TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.priority}</TableCell>
                            <TableCell>{item.dueDate}</TableCell>
                            <TableCell>{item.doneFlag ? "Done" : "Undone"}</TableCell>
                            <TableCell><Button variant="outlined" onClick={() => {
                                setTodoData({
                                    id: item.id,
                                    name: item.name,
                                    priority: item.priority,
                                    dueDate: item.dueDate,
                                    creationDate: item.creationDate,
                                    doneDate: item.doneDate,
                                    doneFlag: item.doneFlag
                                });
                                handleOpen();
                            }}>Edit</Button></TableCell>
                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Container className="pageControls">
                { (currentPage !== 1 ) && <button onClick={handlePaginatePrev}>{currentPage-1}</button>}
                <Typography sx={{justifySelf: "center"}}>{currentPage}</Typography>
                {toDos.length > currentPage*10 && <button onClick={handlePaginateNext}>{currentPage+1}</button>}
            </Container>
            {/* DIALOG FOR EDITING */}
            <Dialog open={open} onClose={handleClose}>
                <Container maxWidth="lg" sx={{ padding: 5 }}>
                    <form onSubmit={(e) => handleEdit(e)}>
                        <Typography variant="h4" sx={{paddingBottom: 5}}>Edit To Do</Typography>
                        <TextField type="text" value={todoData.name} onChange={(e) => setTodoData({ ...todoData, name:e.target.value})}></TextField>
                        <Select value={todoData.priority} onChange={(e) => setTodoData({ ...todoData, priority: e.target.value })}>
                            <MenuItem value="High">High</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="Low">Low</MenuItem>
                        </Select>
                        <DatePicker value={dayjs(todoData.dueDate)} onChange={(newValue) => setTodoData({...todoData, dueDate: dayjs(newValue).format("YYYY-MM-DD")})}></DatePicker>
                        <Button type="submit">Edit To Do</Button>
                        <Button onClick={(e) => handleDelete(e)}>Delete To Do</Button>
                    </form>
                </Container>
            </Dialog>
        </Container>
    );
}

export default ToDoList;