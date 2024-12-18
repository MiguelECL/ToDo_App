import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";

const FilterBox = ({ update, setUpdate, setSearchParameters }: { update: boolean, setUpdate: Function, setSearchParameters: any }) => {

    const [searchName, setSearchName] = useState("");
    const [searchPriority, setSearchPriority] = useState("All");
    const [searchState, setSearchState] = useState("All");

    const HandleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setSearchParameters([searchName, searchPriority, searchState])
        setUpdate(!update);
    }

    return ( <Container className="FilterBox" maxWidth="lg">
            <Typography variant="h5">Filter</Typography>
            <form onSubmit={HandleSubmit}>
                <Stack spacing={2} direction="row" maxWidth="lg" width="100%">
                    <TextField label="Name" variant="outlined" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                    <FormControl>
                        <InputLabel id="Priority-Label">Priority</InputLabel>
                        <Select labelId="Priority-Label" label="Priority" value={searchPriority} onChange={(e) => setSearchPriority(e.target.value)}>
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="Low">Low</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="Status-Label">Status</InputLabel>
                        <Select labelId="Status-Label" label="Status" value={searchState} onChange={(e) => setSearchState(e.target.value)}>
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="true">Done</MenuItem>
                            <MenuItem value="false">Undone</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" type="submit" id="SearchBox">Search</Button>
                </Stack>
            </form>
        </Container>
    );
}

export default FilterBox;