import React from 'react';
import GlobalFilter from './tableComponents/GlobalFilter'
import { useTable, useBlockLayout, useGlobalFilter, useResizeColumns, useSortBy } from 'react-table'
import { FixedSizeList } from 'react-window'
import scrollbarWidth from './scrollbarWidth'
import { TableStyles } from "./styledComponents"
import Style from './table.module.css'
import { ColumnSelector } from './tableComponents/ColumnSelector'

export default function Table({columns, data}) {
    
    const _nRows = 20
    const defaultColumn = React.useMemo(
        () => ({
            width: 150,
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
        },

        useBlockLayout,
        useGlobalFilter,
        useSortBy,
        useResizeColumns
    )

    // use row to download filtered data 
    console.log(rows)

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
            <ColumnSelector getToggleHideAllColumnsProps={getToggleHideAllColumnsProps} allColumns={allColumns} />
            </div>
            <div className={Style.author_row}  >
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "auto 10px" }} >
                <TableStyles className={Style.window_table}>
                    <div {...getTableProps()} className="table">
                        <div>
                            {headerGroups.map(headerGroup => (
                                <div {...headerGroup.getHeaderGroupProps()} className="tr">
                                    {headerGroup.headers.map(column => (
                                        <div {...column.getHeaderProps(column.getSortByToggleProps())} className="th" >
                                            {column.render('Header')}
                                            <div
                                                {...column.getResizerProps()}
                                                className={`resizer ${column.isResizing ? 'isResizing' : ''
                                                    }`}
                                            />
                                            <div>
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? <i className='bx bx-sort-a-z' />
                                                        : <i className='bx bx-sort-z-a' />
                                                    : <i className='bx bx-sort-alt-2' />}
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            ))}
                        </div>

                        <div {...getTableBodyProps()} >
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