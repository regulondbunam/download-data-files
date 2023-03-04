// ver 0,1

import React, { useState } from "react";


export default function Table({ dataTable }) {
    const [_nRows, set_nRows] = useState(5);
    const [currentRow, setCurrentRow] = useState(0);
    const [search, setSearch] = useState("");
    const nColumns = columnsNumber(dataTable.columns)
    const disabledColumns = DisabledColumns(dataTable.columns)
    const rows = dataTable.rows;
    const totalRows = rows.length;

    const filteredRows = () => {
        if (search.length === 0) {
            //console.log(rows.slice(currentRow, currentRow + _nRows));
            return rows.slice(currentRow, currentRow + _nRows);
        }
        let newRows = [];
        let re = new RegExp(search);
        rows.map((row) => {
            let text = row
                .map((data) => {
                    return data.data;
                })
                .join(", ");
            //console.log(text.matchAll(re));
            if (re.test(text)) {
                newRows.push(row);
            }
            return null;
        });
        return newRows;
    };

    const nextPage = () => {
        let tope = Number(currentRow) + Number(_nRows);
        if (tope < totalRows) setCurrentRow(Number(currentRow) + Number(_nRows));
    };

    const prevPage = () => {
        if (currentRow > 0) setCurrentRow(currentRow - _nRows);
    };

    const onSearchChange = ({ target }) => {
        setCurrentRow(0);
        setSearch(target.value);
    };

    return (
        <table className="table_content">
            <thead>
                {
                    /**
                     * <tr>
                    <th>
                        <input type="text" placeholder="Search" onChange={onSearchChange} />
                    </th>
                </tr>
                     */
                }
                <PageControl
                    nColumns={nColumns}
                    prevPage={prevPage}
                    nextPage={nextPage}
                    _nRows={_nRows}
                    set_nRows={set_nRows}
                    onSearchChange={onSearchChange}
                    totalRows={totalRows}
                />
                <tr>
                    {dataTable.columns.map((col, indx) => {
                        if (!disabledColumns[col.value]) {
                            return <th key={`thTable_${indx}`}>{col.name}</th>;
                        }
                        return null
                    })}
                </tr>
            </thead>
            <tbody>
                {filteredRows().map((row, index) => {
                    return (
                        <tr key={`trTable_${index}`}>

                            {row.map((r, indx) => {
                                if (!disabledColumns[r.value]) {
                                    return <td key={`tdTable_${indx}`}>{r.data}</td>;
                                }
                                return null
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

function PageControl({
    nColumns,
    prevPage,
    nextPage,
    set_nRows,
    totalRows,
}) {
    return (
        <tr>
            <th colSpan={nColumns}>
                <button className="pagination" onClick={prevPage}>
                    {"<"}
                </button>
                &nbsp;
                <button className="pagination" onClick={nextPage}>
                    {">"}
                </button>
                &nbsp;
                <select
                    defaultValue={set_nRows}
                    onChange={(e) => {
                        set_nRows(Number(e.target.value));
                    }}
                >
                    {[5, 10, 20, 40, 50, totalRows].map((_nRows) => (
                        <option key={_nRows} value={_nRows}>
                            Show {_nRows}
                        </option>
                    ))}
                </select>
            </th>
        </tr>
    );
}

function columnsNumber(columns) {

    let count = 0
    if (!columns) {
        return count
    }
    columns.forEach(col => {
        if (col.disabled) {
            count++;
        }
    });
    return count;
}

function DisabledColumns(columns) {
    let dis = {}
    columns.forEach(col => {
        dis[col.value] = col.disabled
    });
    return dis
}