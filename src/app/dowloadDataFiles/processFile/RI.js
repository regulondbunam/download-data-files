import raw from '../../../resources/RIdata.txt'
import { formatJsonTable } from './formatJsonTable';

export function getRIdata(setRiFileData = ()=>{}) {
    fetch(raw)
        .then(r => r.text())
        .then(text => {
            let riFiledata = formatJsonTable(text)
            setRiFileData(riFiledata)
        });
}