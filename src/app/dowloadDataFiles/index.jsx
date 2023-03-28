import { useEffect, useState } from "react";
import { Cover } from "../../components/ui-components"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { getRIdata } from "./processFile/RI"
import Table from "./table";

const DESCRIPTION = ""

export default function DownloadDataFile() {

    const [riData, setRiData] = useState();

    useEffect(() => {
        if (!riData) {
            getRIdata(setRiData)
        }
    }, [setRiData, riData])

    return (
        <div>
            <Cover state={!riData ? "loading" : "done"} >
                <h1>Regulatory Interactions</h1>
            </Cover>
            <article>
                {riData ? (
                    <div>
                        <p dangerouslySetInnerHTML={{ __html: DESCRIPTION }} />
                        <Table columns={riData.columns} data={riData.tsvData} riData={riData} />
                        <Box >
                            <Paper elevation={3} sx={{ width: '100%', padding: "0 3% 2% 5%" }} >
                                {
                                    Object.keys(riData.metadata).map(key => {
                                        if (key === "columns") {
                                            return null
                                        }
                                        return (
                                            <div key={key}  >
                                                <h4>{key}</h4>
                                                <p dangerouslySetInnerHTML={{ __html: riData.metadata[key] }} />
                                            </div>
                                        )
                                    })
                                }
                            </Paper>
                        </Box>
                    </div>

                )
            : "loading"
            }

            </article>
        </div>

    )
}