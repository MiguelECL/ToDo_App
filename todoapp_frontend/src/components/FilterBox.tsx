import { SyntheticEvent, useState } from "react";

const FilterBox = ({update, setUpdate, setSearchParameters}:{update:boolean, setUpdate:Function, setSearchParameters:any}) => {

    const [searchName, setSearchName] = useState("");
    const [searchPriority, setSearchPriority] = useState("All");
    const [searchState, setSearchState] = useState("All");


    const HandleSubmit = (e:SyntheticEvent) => {
            e.preventDefault();
            setSearchParameters([searchName, searchPriority, searchState])
    }
     
    return ( 
        <div className="FilterBox">
            <form onClick={HandleSubmit}>
                <label>Name: <input value={searchName} type="text" onChange={(e) => setSearchName(e.target.value)} placeholder="Filter by name..."></input></label><br/>
                <label>Priority: 
                    <select value={searchPriority} onChange={(e) => setSearchPriority(e.target.value)}>
                        <option value="All">All</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </label><br/>
                <span>
                    <label>State: 
                        <select value={searchState} onChange={(e) => setSearchState(e.target.value)}>
                            <option value="All">All</option>
                            <option value="true">Done</option>
                            <option value="false">Undone</option>
                        </select>
                    </label>
                    <button type="submit" id="SearchBox">Search</button>
                </span>
            </form>

        </div>
     );
}
 
export default FilterBox;