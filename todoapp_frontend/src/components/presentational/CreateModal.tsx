import { SyntheticEvent, useState } from "react";
import { handleAddToDo } from "../container/handleAddTodo";

const CreateModal = ({update, setUpdate}:{update:boolean, setUpdate:Function}) => {

    const [modal, setModal] = useState(false);
    const [name, setName] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");
    const [doneFlag, setdoneFlag] = useState(false);
    const [doneDate, setDoneDate] = useState("");

    let id = (Date.now());
    let creationDate = new Date().toISOString();
    let Add = { 
        id, 
        name, setName,
        priority, setPriority,
        dueDate, setDueDate,
        doneFlag, 
        doneDate, 
        creationDate,
        setModal 
    };

    return (  
        <div>
            <button className="addbutton" onClick={() => {setModal(!modal)}}>Add To Do</button>
            {modal && 
                <div className="Modal">
                    <form onSubmit={(e) => handleAddToDo(e, Add)}>
                        <h1>Add To Do</h1>
                        <input type="text" autoFocus maxLength={120} value={name} onChange={(e) => setName(e.target.value)}></input>
                        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}></input>
                        <button type="submit">Add To Do</button>
                    </form>
                </div>}
        </div>
    );
}
 
export default CreateModal;