import { SyntheticEvent, useState } from "react";

const CreateModal = ({update, setUpdate}:{update:boolean, setUpdate:Function}) => {

    const [modal, setModal] = useState(false);

    const [name, setName] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");
    // if you are not using the setters , probably there is no need of using de useSate hook
    const [doneFlag, setdoneFlag] = useState(false);
    const [doneDate, setDoneDate] = useState("");

    const toggleModal = () => {
        setModal(!modal)
    }

    const handleAddToDo = (e:SyntheticEvent) => {
        e.preventDefault();

        console.log(Date.now()) // don't left console logs in your code, it's ok use it when developing but you need to remove when pushing to you main branch
        let id = (Date.now());
        let creationDate = new Date().toISOString();
        console.log(creationDate);// don't left console logs in your code, it's ok use it when developing but you need to remove when pushing to you main branch
        // if name is not empty
        if (name.trim() !==  ""){
            let Add = {id, name, priority, dueDate, doneFlag, doneDate, creationDate};
            console.log(Add);// don't leave console logs in your code, it's ok use it when developing but you need to remove when pushing to you main branch
            console.log(JSON.stringify(Add)); // don't leave console logs in your code, it's ok use it when developing but you need to remove when pushing to you main branch

            /* try to use async functions to avoid the use of .then and .catch
             is not wrong to use them, but with async functions your code is more maintainable
             */
            fetch("http://localhost:9090/todos",{
                method:"POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(Add)
            }).then(() => {
                setName("");
                setUpdate(!update);
            }).catch(error => {
                console.log(error);
            })
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
