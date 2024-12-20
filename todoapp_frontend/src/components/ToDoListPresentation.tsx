import { Button, Container, Dialog, MenuItem, Select, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface ToDo {
    id: number;
    name: string;
    priority: string;
    dueDate: string;
    creationDate: string;
    doneDate?: string;
    doneFlag: boolean;
}

interface ToDoData {
    id?: number;
    name: string;
    priority: string;
    dueDate: string;
    creationDate?: string;
    doneDate?: string;
    doneFlag: boolean;
}

interface ToDoListPresentationProps {
    isLoading: boolean;
    currentToDos: ToDo[];
    currentPage: number;
    toDos: ToDo[];
    open: boolean;
    todoData: ToDoData;
    handlePrioritySort: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleDateSort: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleCheck: (e: React.MouseEvent<HTMLButtonElement>, item: ToDo) => void;
    handleOpen: () => void;
    handleClose: () => void;
    handleEdit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handlePaginatePrev: () => void;
    handlePaginateNext: () => void;
    setTodoData: any;
    ToDoRowStyle: (item: ToDo) => React.CSSProperties;
}

export const ToDoListPresentation: React.FC<ToDoListPresentationProps> = ({
    isLoading,
    currentToDos,
    currentPage,
    toDos,
    open,
    todoData,
    handlePrioritySort,
    handleDateSort,
    handleCheck,
    handleOpen,
    handleClose,
    handleEdit,
    handleDelete,
    handlePaginatePrev,
    handlePaginateNext,
    setTodoData,
    ToDoRowStyle
}) => {
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
                            <TableCell><Button variant="contained" onClick={(e) => {
                                handleCheck(e,item)}}>
                            Toggle</Button></TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.priority}</TableCell>
                            <TableCell>{item.dueDate}</TableCell>
                            <TableCell>{item.doneFlag ? "Done" : "Undone"}</TableCell>
                            <TableCell><Button variant="contained" onClick={() => {
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
            <Container className="pageControls" sx={{justifyItems: "center", alignItems: "center"}}>
                <Stack direction="row" spacing={2}>
                { (currentPage !== 1 ) && <Button onClick={handlePaginatePrev}>{currentPage-1}</Button>}
                <Button disabled>{currentPage}</Button>
                {toDos.length > currentPage*10 && <Button onClick={handlePaginateNext}>{currentPage+1}</Button>}
                </Stack>
            </Container>
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
                        <Button type="submit"><EditIcon/>Edit To Do</Button>
                        <Button onClick={(e) => handleDelete(e)}><DeleteIcon/>Delete To Do</Button>
                    </form>
                </Container>
            </Dialog>
        </Container>
    );
}
