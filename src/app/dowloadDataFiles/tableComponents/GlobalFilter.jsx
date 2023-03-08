import React from "react"
import {useAsyncDebounce} from "react-table"
export default function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            <div style={{display: "grid", gridTemplateColumns: "21px auto"}} >
            <i className='bx bx-search-alt' 
                style={{textAlign: "center",fontSize: "21px"}}
                onClick={()=>{
                    let ipt = document.getElementById("input_global_search_authorTable");
                    if(ipt)ipt.focus();
                }}
            />
            <input
                value={value || ""}
                id="input_global_search_authorTable"
                placeholder={`Global search in ${count} elements:`}
                style={{width: "100%", border: "0px"}}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
            />
            </div>
            
        </span>
    )
}