import React from "react"
import { useAsyncDebounce } from "react-table"
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

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
        <Box
            component="form"
            sx={{ display: 'flex', alignItems: 'flex-end', paddingLeft: "5%", paddingRight: "2%" }}
            noValidate
            autoComplete="off"
        >
            <div style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between"
            }}>
                <div>
                    <FilterAltIcon sx={{ fontSize: 40 }} />
                    <TextField label={`Global search in ${count} elements:`} variant="outlined"
                        value={value || ""}
                        size="small"
                        onChange={e => {
                            setValue(e.target.value);
                            onChange(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <Button>Download Table</Button>
                </div>

            </div>

        </Box>
    )
}

/**
 *<span>
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
 */