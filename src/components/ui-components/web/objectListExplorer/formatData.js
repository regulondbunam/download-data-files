export function formatJsonTable(objects = []) {
    let columns = [
        {
            Header: '---',
            accessor: `_data`,
            width: "100%"
        },
    ]
    let data = []
    if (objects.length > 0) {
        objects.forEach(regulon => {
            data.push({
                _data: regulon
            })
        });
    }
    return { columns: columns, data: data }
}