import { useEffect, useState } from "react";
import {Cover} from "../../components/ui-components"
import { getRIdata } from "./processFile/RI"
import Table from "./table";

const DESCRIPTION = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent leo diam, maximus vitae turpis non, maximus rhoncus dolor. Sed eget mauris molestie, fermentum sapien sit amet, dapibus neque. Quisque posuere ipsum ligula, sit amet suscipit elit auctor nec. Pellentesque lacinia rutrum dui, ut commodo metus elementum in."

export default function DownloadDataFile() {

    const [riData, setRiData] = useState();
    
    useEffect(()=>{
        if (!riData) {
            getRIdata(setRiData)
        }
    },[setRiData, riData])

    console.log(riData);

    return(
        <div>
            <Cover>
            <h1>Regulatory Interactions</h1>
        </Cover>
        <article>
            <p dangerouslySetInnerHTML={{__html: DESCRIPTION}} />
            {riData && (
                 <Table columns={riData.columns} data={riData.tsvData} />
            )}
            <div>
                {riData &&(
                    Object.keys(riData.metadata).map(key=>{
                        if (key==="columns") {
                            return null
                        }
                        return(
                            <div>
                                <h4>{key}</h4>
                                <p dangerouslySetInnerHTML={{__html:riData.metadata[key]}} />
                            </div>
                        )
                    })
                )}
            </div>
        </article>
        </div>
        
    )
}