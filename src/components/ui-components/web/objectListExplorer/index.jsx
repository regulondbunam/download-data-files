import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { List } from './list';
import { Cover } from '../cover/Cover';

export default function ObjectListExplorer({attributesEnabled,datamartType, title = ""} ) {
    const [ComponentState, setComponentState] = useState({title:title,state:"done"});
    return (
        <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: "100%",
        },
      }}
    >
      <Paper elevation={3} >
        <Cover state={ComponentState.state} coverBackgroundStile={{opacity: "0.5", height:"15px"}} />
        <h2>{ComponentState.title}</h2>
        <List attributesEnabled={attributesEnabled} title={title} datamartType={datamartType} ComponentState={(cState)=>{setComponentState(cState)}} />
      </Paper>
    </Box>

    )
}
