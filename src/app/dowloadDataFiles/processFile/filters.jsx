import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
    const [FilterState, setFilterState] = React.useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant="contained" sx={{ width: "100%" }} onClick={handleOpen}>
                {!FilterState
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
                        <FilterParameter />
                    </div>
                    <br />
                    <Stack
                        direction="row"
                        justifyContent={"space-between"}
                        spacing={2}
                    >
                        <Tooltip title="Clean Filter">
                            <Button>
                                <DeleteIcon sx={{ fontSize: "20px" }} />
                            </Button>
                        </Tooltip>
                        <Button onClick={()=>{
                            setFilter([
                                {logic: "^^", equal:"??", value:"promoter"},
                                {logic: "&&", equal:"??", value: "tu"}
                            ])
                            handleClose()
                        }} variant="contained" color='secondary' >set filter</Button>
                        <Button  onClick={handleClose} color='secondary' >cancel</Button>

                    </Stack>

                </Box>

            </Modal>
        </div>
    )
}

function FilterParameter({ setFilter, addFilter }) {
    const [equalExpression, setEqualExpression] = React.useState('like');
    const [logicExpression, setLogicExpression] = React.useState('add');
    const handleChange = (event) => {
        setEqualExpression(event.target.value);
    };
    const handleChangeLogic = (event) => {
        const value = event.target.value
        setLogicExpression(value);
    };

    return (
        <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
        >
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Equal Expression</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={equalExpression}
                    onChange={handleChange}
                    label="Equal Expression"
                >
                    <MenuItem value={'like'}>Like</MenuItem>
                    <MenuItem value={'not like'}>Not Like</MenuItem>
                    <MenuItem value={'equal'}>Equal</MenuItem>
                    <MenuItem value={'not equal'}>Not Equal</MenuItem>
                </Select>
            </FormControl>
            {equalExpression.match('like')
                ? <TextField label="word" sx={{ width: 200 }} variant="standard" />
                : <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[]}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} variant="standard" label="term" />}
                />
            }
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Add filter value</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={logicExpression}
                    onChange={handleChangeLogic}
                    label="Add filter value"
                >
                    <MenuItem value={'add'}>---</MenuItem>
                    <MenuItem value={'and'}>And</MenuItem>
                    <MenuItem value={'or'}>Or</MenuItem>
                </Select>
            </FormControl>
        </Stack>
    )
}