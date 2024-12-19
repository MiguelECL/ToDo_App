import { Container, List, ListItem, ListItemText, ListSubheader, Stack, Typography } from "@mui/material";
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
                <Stack className="timeColumn" direction="row">
                    <List>
                        <ListItem>
                            <ListItemText primary="Average Time to Finish Tasks by Priority" secondary={`High: ${stringHigh} - Medium: ${stringMedium} - Low: ${stringLow}`}/>
                        </ListItem>
                    </List>
                </Stack>
            </Stack>
    );
}

export default TimeComponent;