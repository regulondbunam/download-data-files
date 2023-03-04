import { useState } from "react";
import { formatJsonTable } from "./formatData";
import WebServices from "../../../webservices/WebServices";
import Style from "./style.module.css"
import SelectFilter from "./selectFilter";
import Divider from '@mui/material/Divider';
import TableList from "./tableList";
//import Button from '@mui/material/Button';

export function List({ attributesEnabled, datamartType, title, ComponentState = () => { } }) {
    const [ObjectsData, setObjectsData] = useState();
    const [FilterData, setFilterData] = useState();
    if (!ObjectsData) {
        return <WebServices
            datamart_name={"getObjectList"}
            variables={{ datamartType: datamartType }}
            getData={(data) => {
                const jsonTable = formatJsonTable(data);
                setObjectsData(jsonTable);
                setFilterData(jsonTable)
            }}
            getState={(state) => {
                const titleState = {
                    loading: "Loading list of " + datamartType + "... wait a moment",
                    done: `${title} List`,
                    error: "sorry we have a problem ... :( try again later"
                }
                ComponentState({ state: state, title: titleState[state] })
            }}
        />
    }
    //console.log(FilterData);
    return (
        <div className={Style.mainDiv}>
            <SelectFilter ObjectsData={ObjectsData} setFilterData={setFilterData} attributesEnabled={attributesEnabled} />
            <br />
            <Divider />
            <TableList data={FilterData.data} columns={FilterData.columns} link={`/${datamartType}/`} />
        </div>
    )
}
/*
 <div>
            <Button size="small" variant="text">Advanced Search</Button>
            <Button size="small" variant="text">Download Options</Button>
            </div>
*/