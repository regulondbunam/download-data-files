import React, { useState } from "react"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export function ColumnSelector({
    getToggleHideAllColumnsProps,
    allColumns,
}) {

    const [Show, setShow] = useState(true);

    const handleShow = () => {
        setShow(!Show)
    }

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
                                <Grid container spacing={1}>
                                    {allColumns.map(column => (
                                        <Grid xs="auto" key={column.id}>
                                            <Item>
                                                <label>
                                                    <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                                                    {column.id}
                                                </label>
                                            </Item>
                                        </Grid>
                                    ))}


                                </Grid>
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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

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

