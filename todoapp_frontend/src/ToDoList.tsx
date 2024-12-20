import { SyntheticEvent, useEffect, useState } from "react";
import { useDataContext } from "./context/TimeDataContext";
import { ToDoListPresentation } from "./components/ToDoListPresentation";
import { handleAddToDo } from "./components/container/handleAddTodo";

const ToDoList = ({endpoint, searchParameters, update, setUpdate}:{endpoint:string, searchParameters:Array<string>, update:boolean, setUpdate:Function}) => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [todoData, setTodoData] = useState({
        id: Date.now(),
        name: "",
        priority: "",
        dueDate: "",
        creationDate: "",
        doneDate: "",
        doneFlag: false
    });
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [toDos, setToDos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentToDos, setCurrentToDos] = useState([]);
    const [updateMetrics, setUpdateMetrics] = useState(false);
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
        }
        setUpdate(!update);
    }

    const handleDateSort = (e:SyntheticEvent) => {   
        if(indexDateSort === 2){
            setIndexDateSort(0);
        } else {
            setIndexDateSort(indexDateSort + 1);
        }
        setUpdate(!update);
    }

    let parameter0 = currentPage;
    let parameter1 = searchParameters[0];
    let parameter2 = searchParameters[1];
    let parameter3 = searchParameters[2];
    let parameter4 = prioritySort[indexPrioritySort];
    let parameter5 = dateSort[indexDateSort]

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
    },[update,searchParameters,]);

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
            handleClose();
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
       }
    }

    useEffect(() => {
        let timeTotal = 0;
        let numberOfItems = 0;
        TimeData.setTimeTotal(0);
        TimeData.setTimeHigh(0);
        TimeData.setTimeMedium(0);
        TimeData.setTimeLow(0);
        toDos.map((item:any) => {
            if(item.doneFlag === true && item.doneDate !== ""){
                numberOfItems++;
                let creationTime = Date.parse(item.creationDate);
                let doneTime = Date.parse(item.doneDate);
                let differenceSeconds = ((doneTime - creationTime)/(1000));
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
        if(sizeToDos > currentPage*10){
            setCurrentPage(currentPage + 1);
            setUpdate(!update);
        }
    }

    const ToDoRowStyle = (item:any) => {
        let itemDate = Date.parse(item.dueDate);
        let style = {};
        if (item.doneFlag){
            if (item.dueDate === ""){
                style = {"backgroundColor":"",
                    "text-decoration":"line-through",
                    "opacity":"0.4"
                };
            } else if ((itemDate - Date.now()) < 604800000){
                style = {"backgroundColor":"LightCoral",
                    "text-decoration":"line-through",
                "opacity":"0.4"};
            } else if ((itemDate - Date.now()) < 1.2096E+9){
                style = {"backgroundColor":"Bisque",
                    "text-decoration":"line-through",
                "opacity":"0.4"};
            } else if ((itemDate - Date.now()) >= 1.2096E+9){
                style = {"backgroundColor":"DarkSeaGreen",
                    "text-decoration":"line-through",
                "opacity":"0.4"};
            }
        } else {
            if (item.dueDate === ""){
                style = {"backgroundColor":"",};
            } else if ((itemDate - Date.now()) < 604800000){
                style = {"backgroundColor":"LightCoral"};
            } else if ((itemDate - Date.now()) < 1.2096E+9){
                style = {"backgroundColor":"Bisque"};
            } else if ((itemDate - Date.now()) >= 1.2096E+9){
                style = {"backgroundColor":"DarkSeaGreen"};
            }
        }

        return style;
    }

    return (
        <ToDoListPresentation
            isLoading={isLoading}
            currentToDos={currentToDos}
            currentPage={currentPage}
            toDos={toDos}
            open={open}
            todoData={todoData}
            handlePrioritySort={handlePrioritySort}
            handleDateSort={handleDateSort}
            handleCheck={handleCheck}
            handleOpen={handleOpen}
            handleClose={handleClose}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handlePaginatePrev={handlePaginatePrev}
            handlePaginateNext={handlePaginateNext}
            setTodoData={setTodoData}
            ToDoRowStyle={ToDoRowStyle}
        />
    );
}

export default ToDoList;