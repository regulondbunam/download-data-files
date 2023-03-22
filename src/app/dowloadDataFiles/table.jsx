import React from 'react';
import GlobalFilter from './tableComponents/GlobalFilter'
import { useTable, useBlockLayout, useGlobalFilter, useResizeColumns, useSortBy, useFilters } from 'react-table'
//import { matchSorter } from 'match-sorter'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { FixedSizeList } from 'react-window'
import scrollbarWidth from './scrollbarWidth'
import { TableStyles } from "./styledComponents"
import Style from './table.module.css'
import { ColumnSelector } from './tableComponents/ColumnSelector'
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SortIcon from '@mui/icons-material/Sort';
import filterRows from './processFile/filterRows';
import { OptionFilter } from './processFile/filters';

export default function Table({ columns, data, riData }) {

    const _nRows = 20
    const defaultColumn = React.useMemo(
        () => ({
            width: 150,
            Filter: OptionFilter,
        }),
        []
    )
    const filterTypes = React.useMemo(
        () => ({
            fuzzyText: filterRows,
        }),
        []
    )

    const scrollBarSize = React.useMemo(() => scrollbarWidth(), [])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        totalColumnsWidth,
        state,
        preGlobalFilteredRows,
        prepareRow,
        setGlobalFilter,
        allColumns,
        getToggleHideAllColumnsProps,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes,
        },
        useFilters, // useFilters!
        useGlobalFilter, // useGlobalFilter!
        useBlockLayout,
        useGlobalFilter,
        useSortBy,
        useResizeColumns
    )

    // use row to download filtered data 
    //console.log(rows)

    const itemSize = 30
    const heightTable = _nRows * itemSize
    const itemScroll = heightTable / rows.length
    const itemsView = heightTable / itemSize
    let thumbHeight = itemsView * itemScroll
    if (thumbHeight > heightTable) thumbHeight = 0
    let listRef = React.createRef();

    const RenderRow = React.useCallback(
        ({ index, style }) => {

            const row = rows[index]
            prepareRow(row)
            return (
                <div
                    {...row.getRowProps({
                        style,
                    })}
                >
                    {row.cells.map(cell => {
                        return (
                            <div {...cell.getCellProps()} className="td">
                                {cell.render('Cell')}
                            </div>
                        )
                    })}
                </div>
            )
        },
        [prepareRow, rows]
    )
    // Render the UI for your table
    return (
        <div>
            <div className={Style.author_row}  >
                <ColumnSelector columnsInfo={riData.metadata.columns} getToggleHideAllColumnsProps={getToggleHideAllColumnsProps} allColumns={allColumns} />
            </div>
            <div id='riTable' >
                <Box>
                    <Paper elevation={3} sx={{ width: '100%' }} >
                        <Stack direction="row" alignItems="left" spacing={1}>
                            <div style={{ marginLeft: "50px" }} >
                                <h2>RI Table</h2>
                            </div>
                        </Stack>
                        <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                    </Paper>
                </Box>

            </div>
            <div style={{ display: "grid", gridTemplateColumns: "auto 10px" }} >
                <TableStyles className={Style.window_table}>
                    <div {...getTableProps()} className="table">
                        <div >
                            {headerGroups.map(headerGroup => (
                                <div {...headerGroup.getHeaderGroupProps()} className="tr">
                                    {headerGroup.headers.map(column => (
                                        <div>
                                            <div {...column.getHeaderProps()} className="th" >
                                                {column.render('Header')}
                                                <div
                                                    {...column.getResizerProps()}
                                                    className={`resizer ${column.isResizing ? 'isResizing' : ''
                                                        }`}
                                                />
                                            </div>
                                            <div style={{ display: "flex" }} >
                                                <div style={{ width: "50px" }} className="th"  >
                                                    <div{...column.getSortByToggleProps()} >
                                                        {column.isSorted
                                                            ? <SortByAlphaIcon fontSize="small" />
                                                            : <SortIcon fontSize="small" />}
                                                    </div>
                                                </div>
                                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                                            </div>

                                        </div>

                                    ))}
                                </div>
                            ))}
                        </div>

                        <div  {...getTableBodyProps()} >
                            <FixedSizeList
                                height={heightTable}
                                itemCount={rows.length}
                                itemSize={itemSize}
                                width={totalColumnsWidth + scrollBarSize}
                                className={Style.bodyTableAuthor}
                                ref={listRef}
                                onItemsRendered={({
                                    visibleStartIndex,
                                }) => {
                                    let thumb = document.getElementById("scrollThumb")
                                    if (thumb) {
                                        if ((itemScroll * visibleStartIndex) > heightTable) {
                                            thumb.style.top = `${heightTable}px`
                                        } else {
                                            thumb.style.top = `${itemScroll * visibleStartIndex}px`
                                        }

                                    }
                                }}
                            >
                                {RenderRow}
                            </FixedSizeList>
                        </div>
                    </div>
                </TableStyles>
                <div className={Style.scrollIndicator} id="scrollIndicator_author"
                    style={{ height: `${heightTable}px` }}
                    onClick={e => {
                        let ind = e.target
                        ind = ind.getBoundingClientRect()
                        let sel = (e.clientY - ind.top) * (rows.length / heightTable)
                        console.log(sel);
                        listRef.current.scrollToItem(sel)
                    }} >
                    <div className={Style.scrollThumb} id='scrollThumb' style={{ height: `${thumbHeight}px` }} ></div>
                </div>
            </div>

        </div>

    )
}