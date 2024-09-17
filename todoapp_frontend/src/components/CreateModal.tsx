import { SyntheticEvent, useState } from "react";

const CreateModal = ({update, setUpdate}:{update:boolean, setUpdate:Function}) => {

    const [modal, setModal] = useState(false);
    
    const [name, setName] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");
    const [doneFlag, setdoneFlag] = useState(false);
    const [doneDate, setDoneDate] = useState("");

    const toggleModal = () => {
        setModal(!modal)
    }

    const handleAddToDo = (e:SyntheticEvent) => {
        e.preventDefault();

        console.log(Date.now())
        let id = (Date.now());
        let creationDate = new Date().toISOString();
        console.log(creationDate);
        // if name is not empty
        if (name.trim() !==  ""){
            let Add = {id, name, priority, dueDate, doneFlag, doneDate, creationDate};
            console.log(Add);
            console.log(JSON.stringify(Add));

            fetch("http://localhost:9090/todos",{
                method:"POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(Add)
            }).then(() => {
                console.log("posted data");
                setUpdate(!update);
            })
            setName("");
        } 
        toggleModal();
    }

    return (  
        <div>
            <button className="addbutton" onClick={toggleModal}>Add To Do</button>
            {modal && 
                <div className="Modal">
                    <form onSubmit={(e) => handleAddToDo(e)}>
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