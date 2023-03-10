import React from 'react';
import { tsvParse } from "d3"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function OptionFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    console.log(id);

    return (
        <div>
            <Button variant="contained" sx={{width: "100%"}}  onClick={handleOpen}>Set Filter</Button>
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
                </Box>
            </Modal>
        </div>
    )
}

function FilterParameter({setFilter}) {
    const [equalExpression , setEqualExpression] = React.useState('like');

  const handleChange = (event) => {
    setEqualExpression(event.target.value);
  };

    return(
        <div>
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
      <TextField label="Standard" variant="standard" />
        </div>
    )
}

export function formatJsonTable(text = "") {
    let metadata = {
        version: "",
        license: "",
        citation: "",
        contact: "",
        release: "",
        genomeVersion: "",
        dateCreate: "",
        columns: []
    }
    let tsvData = ""
    let textLines = text.split("\n")
    let captureMetadataFlag = undefined
    let captureColumns = false
    textLines.forEach((line) => {
        if (!line.match(/^#/)) {
            tsvData += line + "\n"
        } else {
            if (captureColumns) {
                if (!line.match(/^#\s\(([0-9]*)\)/)) {
                    captureColumns = false
                } else {
                    let columnName = line.match(/\(([0-9]*)\)\s([a-zA-Z])*/gm)
                    metadata.columns.push({
                        name: columnName[0],
                        description: line
                    })
                }
                return 0
            }
            if (captureMetadataFlag) {
                if (line.match(/^#\s([A-Z][a-z]*)/)) {
                    captureMetadataFlag = undefined
                } else {
                    let content = line.split(/^#\s*/)[1]
                    metadata[captureMetadataFlag] += content + "\n"
                    return 0
                }
            }
            if (line.match("##rif-version")) {
                metadata.version = line.split(" ")[1]
                return 0
            }
            if (line.match("# Copies and Copyright-Notice")) {
                captureMetadataFlag = "license"
                return 0
            }
            if (line.match("# Citation")) {
                captureMetadataFlag = "citation"
                return 0
            }
            if (line.match("# Contact")) {
                captureMetadataFlag = "contact"
                return 0
            }
            if (line.match("# Release:")) {
                metadata.release = line
                return 0
            }
            if (line.match("# Genome version:")) {
                metadata.genomeVersion = line
                return 0
            }
            if (line.match("# Created:")) {
                metadata.dateCreate = line
                return 0
            }
            if (line.match("# Columns:")) {
                captureColumns = true
                return 0
            }
        }

    })
    //let dataTest ="Hola\tcomo\testas\t\n10\t20\t30\n10\t20\t30"
    //console.log(tsvData);
    tsvData = tsvParse(tsvData)
    let columns = []
    tsvData.columns.forEach((column) => {
        columns.push({
            Header: column,
            accessor: column,
            Filter: OptionFilter,
            filter: 'Filter Option'
        })
    })
    //console.log(metadata);
    return { metadata, tsvData, columns }
}