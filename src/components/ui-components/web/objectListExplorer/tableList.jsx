import React, { useId } from 'react'
import { useTable, useBlockLayout } from 'react-table'
import { FixedSizeList } from 'react-window'
import { Link } from 'react-router-dom'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Style from "./table.module.css"


export default function TableList({ columns, data }) {

    const defaultColumn = React.useMemo(
        () => ({
            width: 150,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
        },
        useBlockLayout
    )

    const RenderRow = React.useCallback(
        ({ index, style }) => {
            const row = rows[index]
            prepareRow(row)
            return (
                <ListItem
                    sx={{ width: "100%" }}
                    {...row.getRowProps({
                        style,
                    })}
                >
                    {row.cells.map(cell => {
                        let obj = cell.value;
                        //console.log(obj);
                        let statistics = statisticsSet(obj.statistics)
                        let primary = `${obj.datamartType} ${obj.name}`
                        let secondary = ""
                        if (obj.encodedGenes.length > 0) {
                            secondary += `Genes: ${obj.encodedGenes.join(", ")}, `
                        }
                        if (obj.productsName.length > 0) {
                            secondary += `Product: ${obj.productsName.join(", ")}, `
                        }
                        if (obj.sigmulonGeneName) {
                            secondary += `SigmulonGeneName: ${obj.sigmulonGeneName}, `
                        }
                        if (obj.synonyms.length > 0) {
                            secondary += `Synonyms: ${obj.synonyms.join(", ")}`
                        }
                        return (
                            <div {...cell.getCellProps()} style={{ width: "100%" }} className={Style.cell} >
                                <Link to={`/${obj.datamartType}/${obj._id}`}>
                                    <ListElement primary={primary} secondary={secondary} statistics={statistics} />
                                </Link>
                                <Divider />
                            </div>
                        )
                    })}

                </ListItem>
            )
        },
        [prepareRow, rows]
    )

    // Render the UI for your table
    return (
        <div {...getTableProps()}>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }} {...getTableBodyProps()} >
                <FixedSizeList
                    height={550}
                    itemCount={rows.length}
                    itemSize={90}
                    width={"100%"}
                >
                    {RenderRow}
                </FixedSizeList>
            </List>
        </div>
    )
}

/**
cotranscriptionFactors
genes
promoters
sigmaFactors
sites
transcriptionFactors
transcriptionUnits
 */

function statisticsSet(statistics) {
    let statisticsFormat = []
    if (statistics.genes) {
        statisticsFormat.push({
            label: "Genes",
            value: statistics.genes
        })
    }
    if (statistics.promoters) {
        statisticsFormat.push({
            label: "Promoters",
            value: statistics.promoters
        })
    }
    if (statistics.sigmaFactors) {
        statisticsFormat.push({
            label: "Sigma Factors",
            value: statistics.sigmaFactors
        })
    }
    if (statistics.sites) {
        statisticsFormat.push({
            label: "Sites",
            value: statistics.sites
        })
    }
    if (statistics.transcriptionFactors) {
        statisticsFormat.push({
            label: "Transcription Factors",
            value: statistics.transcriptionFactors
        })
    }
    if (statistics.transcriptionUnits) {
        statisticsFormat.push({
            label: "Transcription Units",
            value: statistics.transcriptionUnits
        })
    }
    return statisticsFormat
}

const PRIMARY_STYLE = {
    fontSize: "20px",
    color: "#3d779b",
}

function ListElement({ primary, secondary, statistics }) {
    const id = useId()
    return (
        <div>
            <p style={PRIMARY_STYLE} dangerouslySetInnerHTML={{ __html: primary }} />
            <p dangerouslySetInnerHTML={{ __html: secondary }} />
            {statistics.length > 0 && (
                <table style={{width: "auto"}} >
                    <thead>
                        <tr>
                        {statistics.map((statistic,index)=>{
                            return <th style={{textAlign: 'center'}} key={`statisticFrom${id}_label${index}`} >{statistic.label}</th>
                        })}
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {statistics.map((statistic,index)=>{
                            return <th style={{textAlign: 'center'}}  key={`statisticFrom${id}_value${index}`} >{statistic.value}</th>
                        })}
                        </tr>
                    </tbody>
                </table>
            )}

        </div>
    )
}