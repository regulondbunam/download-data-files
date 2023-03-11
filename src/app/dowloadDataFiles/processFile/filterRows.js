export default function filterRows(rows, id, filterValue) {
    if (!filterValue) {
        return rows
    }
    const filteredRows = [];
    rows.forEach((row) => {
        let rowFlag = false
        let rowValue = row.values[id]
        let arrayCondition = []
        filterValue.forEach((filter) => {
            let filterFlag = false
            const { logic, equal, value = "" } = filter
            switch (equal) {
                case "==":
                    filterFlag = rowValue.search(value) >= 0
                    break;
                case "!==":
                    filterFlag = rowValue.search(value) < 0
                    break;
                case "??":
                    filterFlag = rowValue.toLowerCase().search(value.toLowerCase()) >= 0
                    break;
                case "!??":
                    filterFlag = rowValue.toLowerCase().search(value.toLowerCase()) >= 0
                    break;
                default:
                    filterFlag = rowValue.toLowerCase().search(value.toLowerCase()) >= 0
                    break;
            }
            arrayCondition.push({ logic: logic, filterFlag: filterFlag })
        })
        arrayCondition.forEach((condition) => {
            switch (condition.logic) {
                case "||":
                    rowFlag = rowFlag || condition.filterFlag
                    break;
                case "&&":
                    rowFlag = rowFlag && condition.filterFlag
                    break;
                default:
                    rowFlag = condition.filterFlag
                    break;
            }
        })
        if (rowFlag) {
            filteredRows.push(row)
        }
    });
    return filteredRows;
}