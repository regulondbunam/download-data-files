import raw from '../../../resources/RIdata.txt'
import { formatJsonTable } from './formatJsonTable';

export function getRIdata(setData) {
    fetch(raw)
        .then(r => r.text())
        .then(text => {
            formatJsonTable(text)
            //setData(text)
        });
}