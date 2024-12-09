import { SyntheticEvent, useState } from "react";
import { handleAddToDo } from "../container/handleAddTodo";
import { Button, Container, Dialog, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

const CreateModal = ({ update, setUpdate }: { update: boolean, setUpdate: Function }) => {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [dueDateDayjs, setDueDateDayjs] = useState<Dayjs | null>();
    const [doneFlag, setdoneFlag] = useState(false);
    const [doneDate, setDoneDate] = useState("");

    let id = (Date.now());
    let creationDate = new Date().toISOString();
    let dueDate = dayjs(dueDateDayjs).format("YYYY-MM-DD");
    let Add = {
        id,
        name, setName,
        priority, setPriority,
        dueDate,
        doneFlag,
        doneDate,
        creationDate,
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container sx={{ marginTop: 5, marginBottom: 5 }}>
            <Button variant="contained" fullWidth className="addbutton" onClick={handleOpen}>Add To Do</Button>
            <Dialog open={open} onClose={handleClose}>
                <Container maxWidth="lg" sx={{ padding: 5 }}>
                    <form onSubmit={(e) => handleAddToDo(e, Add)}>
                        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)}></TextField>
                        <FormControl>
                            <InputLabel>Priority</InputLabel>
                            <Select label="Priority" defaultValue={"Medium"}>
                                <MenuItem value="High">High</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                            </Select>
                        </FormControl>
                        <DatePicker value={dueDateDayjs} onChange={(newValue) => setDueDateDayjs(newValue)}></DatePicker>
                        <Button type="submit">Add To Do</Button>
                    </form>
                </Container>
            </Dialog>
        </Container>
    );
}

export default CreateModal;