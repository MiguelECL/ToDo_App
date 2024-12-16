import { Dayjs } from "dayjs";
import { SyntheticEvent } from "react";

export const handleAddToDo = (e: SyntheticEvent, Add: {
    id: number,
    name: string
    setName: Function
    priority: string,
    setPriority: Function,
    dueDate: string,
    doneFlag: boolean,
    doneDate: string,
    creationDate: string,
}, update: Boolean, setUpdate: Function) => {

    e.preventDefault();
    
    // if name is not empty
    if (Add.name.trim() !== "") {
        console.log(Add);
        console.log(JSON.stringify(Add));

        fetch("http://localhost:9090/todos", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Add)
        }).then(() => {
            Add.setName("");
            setUpdate(!update);
        }).catch(error => {
            console.log(error);
        })
    }
}
