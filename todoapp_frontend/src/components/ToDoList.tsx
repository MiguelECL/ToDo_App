import { SyntheticEvent, useEffect, useState } from "react";
import { useDataContext } from "../context/TimeDataContext";

const ToDoList = ({endpoint, searchParameters, update, setUpdate}:{endpoint:string, searchParameters:Array<string>, update:boolean, setUpdate:Function}) => {
   // you left unused parameters

    /*
     there are a lot of states. you can use an object to simplify your code or use useReducer
     because in the long term this code will be unmaintainable and no scalable

     */
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
    const [currentPage, setCurrentPage] = useState(1);
    const [currentToDos, setCurrentToDos] = useState([]);
    const [updateMetrics, setUpdateMetrics] = useState(false);


    const TimeData = useDataContext(); // when naming you context variable use a more explicit name like timeDataContext to differentiate it form other vars
    let prioritySort = ["no","ascending","descending"];
    let dateSort = ["no","ascending","descending"];
    const [indexPrioritySort, setIndexPrioritySort] = useState(0);
    const [indexDateSort, setIndexDateSort] = useState(0);

    //Variables for sorting

    const handlePrioritySort = (e:SyntheticEvent) => {
        if(indexPrioritySort === 2){
            setIndexPrioritySort(0);
        } else {
            setIndexPrioritySort(indexPrioritySort + 1);
            console.log(indexPrioritySort); // avoid left console logs
        }
        setUpdate(!update);
    }

    const handleDateSort = (e:SyntheticEvent) => {
        if(indexDateSort === 2){
            setIndexDateSort(0);
        } else {
            setIndexDateSort(indexDateSort + 1);
            console.log(indexDateSort);  // avoid left console logs
        }
        setUpdate(!update);
    }
/*
let currentPageNumber = currentPage;                // Indicates it's the current page number
let mainSearchParameter = searchParameters[0];      // Reflects the first search parameter
let secondarySearchParameter = searchParameters[1]; // Reflects the second search parameter
let tertiarySearchParameter = searchParameters[2];  // Reflects the third search parameter
let prioritizedSortMethod = prioritySort[indexPrioritySort];  // The prioritized sort method
let dateSortMethod = dateSort[indexDateSort];       // The sort method based on date

# Explanation
currentPageNumber: Clearly states that it’s the current page number.
mainSearchParameter, secondarySearchParameter, tertiarySearchParameter: Clarifies the distinction between the first, second, and third search parameters.
prioritizedSortMethod: Makes it clear that this is the method used for prioritized sorting.
dateSortMethod: Specifies that this is the sorting method based on dates.

 */
    // SEARCH AND SORT PARAMETERS
    let parameter0 = currentPage;
    let parameter1 = searchParameters[0];
    let parameter2 = searchParameters[1];
    let parameter3 = searchParameters[2];
    let parameter4 = prioritySort[indexPrioritySort];
    let parameter5 = dateSort[indexDateSort]


    /*
     it's a best practice to use an async function to avoid the 'cascade' of then's that makes very hard to read

     // Function to build the endpoint URL with all the necessary parameters
const buildEndpointUrl = (baseURL, page, searchName, searchPriority, searchState, sortPriority, sortDate) => {
    return `${baseURL}/todos?page=${page}&searchName=${searchName}&searchPriority=${searchPriority}&searchState=${searchState}&sortPriority=${sortPriority}&sortDate=${sortDate}`;
};

// Base URL for the API
const baseURL = 'http://localhost:9090';

// Async function to fetch data
const fetchToDos = async () => {
    try {
        // First fetch request
        const firstEndpoint = buildEndpointUrl(baseURL, '', parameter1, parameter2, parameter3, parameter4, parameter5);
        const response1 = await fetch(firstEndpoint, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response1.ok) {
            throw new Error('Failed to fetch initial todos');
        }

        const data1 = await response1.json();
        setToDos(data1);

        // Second fetch request with `parameter0` for the page
        const secondEndpoint = buildEndpointUrl(baseURL, parameter0, parameter1, parameter2, parameter3, parameter4, parameter5);
        const response2 = await fetch(secondEndpoint, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response2.ok) {
            throw new Error('Failed to fetch current todos');
        }

        const data2 = await response2.json();
        setCurrentToDos(data2);

        // Update state after fetching data
        setIsLoading(false);
        setUpdateMetrics(prevState => !prevState);

    } catch (error) {
        console.log('Error fetching data:', error);
    }
};

// Call the function to fetch todos
fetchToDos();

     */


    // FETCH DATA GET
    useEffect(() => {
        let finalEndpoint = 'http://localhost:9090/todos?searchName=' + parameter1 + '&searchPriority=' + parameter2 + '&searchState=' + parameter3 + '&sortPriority=' + parameter4 + '&sortDate=' + parameter5;
        fetch(finalEndpoint,{
            method:"GET",
            headers: {"Content-Type":"application/json"}
        }).then(response => {
            if(response.ok){
                return response.json();
        }}).then((data) => {
            setToDos(data);
        }).then(() => {
            let finalEndpoint = 'http://localhost:9090/todos?page=' + parameter0 +'&searchName=' + parameter1 + '&searchPriority=' + parameter2 + '&searchState=' + parameter3 + '&sortPriority=' + parameter4 + '&sortDate=' + parameter5;
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

    const toggleModal = () => {
        setModal(!modal);
    }

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
        }).catch(error => {
            console.log('failed to communicte with API , is the server running? Error: ' + error);
        })
    }

    const handleDelete = (e:SyntheticEvent) => {/// use async functions
        e.preventDefault();

        fetch('http://localhost:9090/todos/'+[id],{
            method:"DELETE",
            headers: {
                "Access-Control-Allow-Origin":"*"
            }
        }).then(() => {
            toggleModal();
            setUpdate(!update);
        }).catch(error => {
            console.log('failed to communicte with API , is the server running? Error: ' + error);
        })
    }

    const handleCheck = (e:SyntheticEvent, item:any) => { /// use async functions
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
            console.log("posted"); // avoid console logs
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
        /*  make more legible the code by destructuring the setters
        const { setTimeTotal ,setTimeHigh ... } = TimeData

         */
        TimeData.setTimeTotal(0);
        TimeData.setTimeHigh(0);
        TimeData.setTimeMedium(0);
        TimeData.setTimeLow(0);
        toDos.map((item:any) => {
            // if item is done, compute difference in minutes that it took to finish said task.
            if(item.doneFlag === true && item.doneDate !== ""){
                console.log("yeah"); // avoid left console logs
                numberOfItems++;
                let creationTime = Date.parse(item.creationDate);
                let doneTime = Date.parse(item.doneDate);
                let differenceSeconds = ((doneTime - creationTime)/(1000)); //seconds
                console.log(differenceSeconds);  // avoid left console logs
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
        console.log(sizeToDos); // avoid left console logs

        if(sizeToDos > currentPage*10){ // if you are using constants declare them in the top of your code ex:  MAX_PAGE = 10
            console.log("here"); // avoid left console logs
            setCurrentPage(currentPage + 1);
            setUpdate(!update);
        }
    }
    //item.doneFlag ? {textDecoration:"line-through",textDecorationColor:"gray",opacity:"0.5"} : {textDecoration:"none"}

    /*
    there are a lot of if statements avoid them in that many because it's hard to read
    const ToDoRowStyle = (item: any) => {
    const itemDate = Date.parse(item.dueDate);
    const timeDifference = itemDate - Date.now();

    // Define color ranges based on the time difference
    const getBackgroundColor = () => {
        if (!item.dueDate) return "";
        if (timeDifference < 604800000) return "FireBrick"; // Less than 7 days
        if (timeDifference < 1.2096E9) return "GoldenRod";  // Less than 14 days
        return "green";                                     // More than 14 days
    };

    // Define style based on if the item is done
    const baseStyle = {
        backgroundColor: getBackgroundColor(),
    };

    // Add additional styles for done items
    if (item.doneFlag) {
        return {
            ...baseStyle,
            textDecoration: "line-through",
            opacity: "0.4"
        };
    }

    return baseStyle;
};

     */


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
            <p className="pageControls">
                { currentPage !== 1 && <button onClick={handlePaginatePrev}>{currentPage-1}</button>}
                {currentPage}
                {toDos.length > currentPage*10 && <button onClick={handlePaginateNext}>{currentPage+1}</button>}
            </p>
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
