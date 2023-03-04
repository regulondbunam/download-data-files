import {tsvParse} from "d3"
export function formatJsonTable(text="") {
    let metadata = {
        version: "",
        license: "",
        citation: "",
        contact: "",
        release: "",
        genomeVersion: "",
        dateCreate: "",
        columns: []
    }
    let tsvData = ""
    let textLines = text.split("\n")
    let captureMetadataFlag = undefined
    let captureColumns = false
    textLines.forEach((line)=>{
        if (!line.match(/^#/)) {
            tsvData += line+"\n"
        }else{
            if (captureColumns) {
                if (!line.match(/^#\s\(([0-9]*)\)/)) {
                    captureColumns = false
                }else{
                    let columnName = line.match(/\(([0-9]*)\)\s([a-zA-Z])*/gm)
                    metadata.columns.push({
                        name: columnName[0],
                        description: line
                    })
                }
                return 0
            }
            if (captureMetadataFlag) {
                if (line.match(/^#\s([A-Z][a-z]*)/)) {
                    captureMetadataFlag = undefined
                }else{
                    metadata[captureMetadataFlag] += line+"\n"
                    return 0
                }
            }
            if (line.match("##rif-version")) {
                metadata.version = line.split(" ")[1]
                return 0
            }
            if (line.match("# Copies and Copyright-Notice")) {
                captureMetadataFlag = "license"
                return 0
            }
            if (line.match("# Citation")) {
                captureMetadataFlag = "citation"
                return 0
            }
            if (line.match("# Contact")) {
                captureMetadataFlag = "contact"
                return 0
            }
            if (line.match("# Release:")) {
                metadata.release = line
                return 0
            }
            if (line.match("# Genome version:")) {
                metadata.genomeVersion = line
                return 0
            }
            if (line.match("# Created:")) {
                metadata.dateCreate = line
                return 0
            }
            if (line.match("# Columns:")) {
                captureColumns = true
                return 0
            }
        }

    })
    //let dataTest ="Hola\tcomo\testas\t\n10\t20\t30\n10\t20\t30"
    //console.log(tsvData);
    tsvData = tsvParse(tsvData)
    console.log(metadata);
    return {metadata, tsvData}
}