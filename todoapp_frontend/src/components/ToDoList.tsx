import { SyntheticEvent, useEffect, useState } from "react";
import { useDataContext } from "../context/TimeDataContext";

const ToDoList = ({endpoint, searchParameters, update, setUpdate}:{endpoint:string, searchParameters:Array<string>, update:boolean, setUpdate:Function}) => {
    const [modal, setModal] = useState(false);

    const [id, setId] = useState(Date.now());
    const [name, setName] = useState("");
    const [priority, setPriority] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [creationDate, setCreationDate] = useState("");
    const [doneDate, setDoneDate] = useState("");
    const [doneFlag, setDoneFlag] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [toDos, setToDos] = useState([]);
    const elementsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentToDos, setCurrentToDos] = useState([]);
    const [updateMetrics, setUpdateMetrics] = useState(false);
    

    const TimeData = useDataContext();
    let prioritySort = ["no","ascending","descending"];
    let dateSort = ["no","ascending","descending"];
    const [indexPrioritySort, setIndexPrioritySort] = useState(0);
    const [indexDateSort, setIndexDateSort] = useState(0);

    //Variables for sorting

    const handlePrioritySort = (e:SyntheticEvent) => {
        if(indexPrioritySort == 2){
            setIndexPrioritySort(0);
        } else {
            setIndexPrioritySort(indexPrioritySort + 1);
            console.log(indexPrioritySort);
        }
        setUpdate(!update);
    }

    const handleDateSort = (e:SyntheticEvent) => {   
        if(indexDateSort == 2){
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
        let finalEndpoint = 'http://localhost:9090/todos?' +'searchName=' + parameter1 + '&searchPriority=' + parameter2 + '&searchState=' + parameter3 + '&sortPriority=' + parameter4 + '&sortDate=' + parameter5;
        fetch(finalEndpoint,{
        method:"GET",
        headers: {"Content-Type":"application/json"}
    }).then(response => {
    if(response.ok){
        return response.json();
    }
    throw response;
    }).then((data) => {
        setToDos(data);
    }).then(() => {
        let finalEndpoint = 'http://localhost:9090/todos?' + 'page=' + parameter0 +'&searchName=' + parameter1 + '&searchPriority=' + parameter2 + '&searchState=' + parameter3 + '&sortPriority=' + parameter4 + '&sortDate=' + parameter5;
        fetch(finalEndpoint,{
        method:"GET",
        headers: {"Content-Type":"application/json"}
    }).then(response => {
    if(response.ok){
        return response.json();
    }
    throw response;
    }).then((data) => {
        setCurrentToDos(data);
        setIsLoading(false);
        setUpdateMetrics(!updateMetrics);
    });
    });
    },[update,searchParameters]);

    const toggleModal = () => {
        setModal(!modal);
    }

    const handlePagination = (() => {

    })

    const handleEdit = (e:SyntheticEvent) =>  {
        e.preventDefault();
        let date = 0;
        date = Date.parse(doneDate);
        console.log(date);
        const updateToDo = {id, name, dueDate, doneFlag, doneDate, priority, creationDate};
        fetch('http://localhost:9090/todos/'+[id],{
            method:"PUT",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(updateToDo)
        }).then(() => {
            toggleModal();
            setUpdate(!update);
        })
    }

    const handleDelete = (e:SyntheticEvent) => {
        e.preventDefault();
        
        fetch('http://localhost:9090/todos/'+[id],{
            method:"DELETE",
            headers: {
                "Access-Control-Allow-Origin":"*"
            }
        }).then(() => {
            toggleModal();
            setUpdate(!update);
        })
    }

    const handleCheck = (e:SyntheticEvent, item:any) => {
       e.preventDefault();   
        
       item.doneFlag = (!item.doneFlag);
       if(item.doneFlag){
            let addDoneDate = (new Date().toISOString());
            let updateToDo = {...item,doneDate:addDoneDate};
            fetch('http://localhost:9090/todos/' + [item.id] + '/done',{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(updateToDo)
            }).then(() => {
                setUpdate(!update);
            })
            console.log("posted");
       } else {
            let addDoneDate = ("");
            let updateToDo = {...item,doneDate:addDoneDate};
            fetch('http://localhost:9090/todos/' + [item.id] + '/undone',{
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
            if(item.doneFlag == true && item.doneDate != ""){
                console.log("yeah");
                numberOfItems++;
                let creationTime = Date.parse(item.creationDate);
                let doneTime = Date.parse(item.doneDate);
                let differenceSeconds = (doneTime - creationTime)/1000;
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
            if (item.dueDate == ""){
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
            if (item.dueDate == ""){
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
        <div className="ToDoList">
            <table className="todo-table">
                <thead>
                    <tr>
                        <th>Mark</th>
                        <th>Name</th>
                        <th><button onClick={(e) => handlePrioritySort(e)}>Priority &lt;&gt; </button></th>
                        <th><button onClick={(e) => handleDateSort(e)}>Due Date &lt;&gt; </button></th>
                        <th>State</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {!isLoading && currentToDos.map((item:any) => (
                        <tr key={item.id} style={ToDoRowStyle(item)}>
                            <td><button onClick={(e) => {
                                handleCheck(e,item)}}>
                            Toggle</button></td>
                            <td>{item.name}</td>
                            <td>{item.priority}</td>
                            <td>{item.dueDate}</td>
                            <td>{item.doneFlag ? "Done" : "Undone"}</td>
                            <td><button onClick={() => {
                                setId(item.id);
                                setName(item.name);
                                setPriority(item.priority);
                                setDueDate(item.dueDate);
                                setCreationDate(item.creationDate);
                                setDoneDate(item.doneDate);
                                setDoneFlag(item.doneFlag);
                                toggleModal();
                            }}>Edit</button></td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pageControls">
                { currentPage != 1 && <button onClick={handlePaginatePrev}>{currentPage-1}</button>}
                {currentPage}
                {toDos.length > currentPage*10 && <button onClick={handlePaginateNext}>{currentPage+1}</button>}
            </div>
            {modal &&
                <div className="Modal">
                    <form onSubmit={(e) => handleEdit(e)}>
                        <h1>Edit To-Do</h1>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}></input>
                        <button type="submit">Edit To Do</button>
                        <button onClick={(e) => handleDelete(e)}>Delete To Do</button>
                    </form>
                </div>
            }
        </div>
    );
}

export default ToDoList;