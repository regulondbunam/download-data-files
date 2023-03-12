import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    width: '120px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function OptionFilter({
    column: { filterValue, preFilteredRows, setFilter = [], id },
}) {
    const [open, setOpen] = React.useState(false);
    const [FilterState, setFilterState] = React.useState([{ logic: "^^", equal: "??", value: "" }]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(FilterState)
    return (
        <div>
            <Button variant="contained" sx={{ width: "100%" }} onClick={handleOpen}>
                {FilterState[0].value === ""
                    ? "Set Filter"
                    : "Edit Filter"
                }
            </Button>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {`${id} filter builder values`}
                    </Typography>
                    <div>
                        {FilterState.map((filter, index) => {
                            return <FilterParameter filter={filter} filterIndex={index} filterState={FilterState} setFilterState={setFilterState} key={`filter_${index}_${id}`} />
                        })}
                    </div>
                    <br />
                    <Stack
                        direction="row"
                        justifyContent={"space-between"}
                        spacing={2}
                    >
                        <Tooltip title="Reset Filter">
                            <Button onClick={() => {
                                setFilter(undefined)
                                setFilterState([{ logic: "^^", equal: "??", value: "" }])
                                handleClose()
                            }} >
                                <DeleteIcon sx={{ fontSize: "20px" }} />
                            </Button>
                        </Tooltip>
                        <Button onClick={() => {
                            setFilter(FilterState)
                            handleClose()
                        }} variant="contained" color='secondary' >set filter</Button>
                        <Button onClick={handleClose} color='secondary' >cancel</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    )
}

function FilterParameter({ filter, setFilterState, filterState, filterIndex }) {
    const { equal, logic, value } = filter
    const updateFilterState = (equal, logic, value) => {
        let filters = filterState.map((filterS, index) => {
            if (index === filterIndex) {
                return { equal, logic, value }
            }
            return filterS
        })
        setFilterState(filters)
    }
    const newFilterState = () => {
        if (filterState.length <= 7) {
            setFilterState([...filterState, { logic: "&&", equal: "??", value: "" }])
        }else{
            alert("limit of filters reached")
        }
    }
    const deleteFilterState = () => {
        let filters = []
        filterState.forEach((filterS, index) => {
            if (index !== filterIndex) {
                filters.push(filterS)
            }
        })
        setFilterState(filters)
    }

    return (
        <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
        >
            {logic === "^^"
                ? <Item></Item>
                : <FormControl variant="standard" sx={{ m: 1, width: 110 }}>
                    <InputLabel id="demo-simple-select-standard-label">Logic add</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={logic}
                        onChange={(event) => {
                            let logicValue = event.target.value
                            updateFilterState(equal, logicValue, value)
                        }}
                        label="Logic add"
                    >
                        <MenuItem value={'&&'}>And</MenuItem>
                        <MenuItem value={'||'}>Or</MenuItem>
                    </Select>
                </FormControl>
            }
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Equal Expression</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={equal}
                    onChange={(event) => { updateFilterState(event.target.value, logic, value) }}
                    label="Equal Expression"
                >
                    <MenuItem value={'??'}>Like</MenuItem>
                    <MenuItem value={'!??'}>Not Like</MenuItem>
                    <MenuItem value={'=='}>Equal</MenuItem>
                    <MenuItem value={'!=='}>Not Equal</MenuItem>
                </Select>
            </FormControl>
            {equal.match(/\?\?/)
                ? <TextField label="word" sx={{ width: 200 }} variant="standard" />
                : <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[]}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} variant="standard" label="term" />}
                />
            }
            <Stack
                direction="row"
                spacing={1}
            >

                {logic !== "^^"
                    ? (
                        <Tooltip title="Clean Filter">
                            <IconButton
                                onClick={deleteFilterState}
                                color="primary" aria-label="upload picture" component="label">
                                <DeleteIcon sx={{ fontSize: "20px" }} />
                            </IconButton>
                        </Tooltip>
                    )
                    : (
                        <Tooltip title="Add filter">
                            <IconButton
                                onClick={newFilterState}
                                color="primary" aria-label="upload picture" component="label">
                                +
                            </IconButton>
                        </Tooltip>
                    )}
            </Stack>
        </Stack>
    )
}