import React, { useState } from "react"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export function ColumnSelector({
    getToggleHideAllColumnsProps,
    allColumns,
    columnsInfo
}) {

    const [Show, setShow] = useState(true);

    const handleShow = () => {
        setShow(!Show)
    }

    console.log(columnsInfo);

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                },
                width: '100%'
            }}
        >
            <Paper elevation={3} sx={{ width: '100%' }} >
                <Stack direction="row" alignItems="left" spacing={1}>
                    <IconButton aria-label="hide" onClick={(handleShow)} >
                        {Show ? <KeyboardArrowUpIcon /> : < KeyboardArrowDownIcon />}
                    </IconButton>
                    <div>
                        <h2  >Column Selector</h2>
                    </div>
                </Stack>
                <div>
                    {Show && (
                        <div style={{ marginLeft: "5%" }} >
                            <p>Select the columns to show or hide in table</p>
                            <div>
                                <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />
                                Show All
                            </div>
                            <Box>
                                <div>
                                    {allColumns.map(column => {
                                        let columnInfo = {}
                                        try {
                                            let colNum = column.id.split(")")
                                            columnInfo = columnsInfo.find(col => col.name.toLowerCase().match(colNum[1].toLowerCase()))
                                        } catch (error) {
                                            console.log(columnsInfo);
                                            console.error("get column description", error);
                                        }

                                        return (
                                            <div key={column.id}>
                                                    <label>
                                                        <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                                                        {columnInfo?.description
                                                            ? columnInfo.description
                                                            : column.id
                                                        }
                                                    </label>
                                            </div>
                                        )
                                    })}


                                </div>
                            </Box>
                            <br />
                            <div  >
                                <button onClick={() => {
                                    const element = document.getElementById("riTable");
                                    element.scrollIntoView();
                                }} >View Table</button>
                            </div>
                        </div>
                    )}

                </div>
                <br />
            </Paper>
        </Box>
    )

}
/**
 * 
 */


const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return <input type="checkbox" ref={resolvedRef} {...rest} />
    }
)

