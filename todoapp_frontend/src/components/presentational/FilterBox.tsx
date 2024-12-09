import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";

const FilterBox = ({ update, setUpdate, setSearchParameters }: { update: boolean, setUpdate: Function, setSearchParameters: any }) => {

    const [searchName, setSearchName] = useState("");
    const [searchPriority, setSearchPriority] = useState("All");
    const [searchState, setSearchState] = useState("All");


    const HandleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setSearchParameters([searchName, searchPriority, searchState])
    }

    return (
        <Container className="FilterBox">
            <form>
                <Stack spacing={2}>
                    <TextField label="Name" variant="outlined" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                    <Select value={searchPriority} onChange={(e) => setSearchPriority(e.target.value)}>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                    </Select>
                    <Select value={searchState} onChange={(e) => setSearchState(e.target.value)}>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="true">Done</MenuItem>
                        <MenuItem value="false">Undone</MenuItem>
                    </Select>
                    <Button variant="contained" type="submit" id="SearchBox">Search</Button>
                </Stack>
            </form>
        </Container>
    );
}

export default FilterBox;