import { Container, List, ListItem, ListItemText, ListSubheader, Stack } from "@mui/material";
import { useDataContext } from "../../context/TimeDataContext";
import { formatData } from "../container/formatData";

const TimeComponent = () => {
    const timeData = useDataContext();

    const { stringTotal, stringHigh, stringMedium, stringLow } = formatData(timeData);

    return (
            <Stack direction="row" maxWidth="lg" sx={{width: '100%', justifyContent: "center"}} spacing={2}>
                <Stack className="timeColumn">
                    <List>
                        <ListItem>
                            <ListItemText primary="Average Time to Finish Tasks" secondary={`${stringTotal}`}/>
                        </ListItem>
                    </List>
                </Stack>
                <Stack className="timeColumn">
                    <List subheader={<ListSubheader>Average Time to Finish Tasks by Priority</ListSubheader>}>
                        <ListItem>
                            <ListItemText primary="Low" secondary={`${stringLow}`}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Medium" secondary={`${stringMedium}`}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="High" secondary={`${stringHigh}`}/>
                        </ListItem>
                    </List>
                </Stack>
            </Stack>
    );
}

export default TimeComponent;