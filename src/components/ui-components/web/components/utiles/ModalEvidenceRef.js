import React from 'react';
import Modal from '../../../output/modal/Modal'

const ModalER = ({
    cit,
    title,
    classNameModal,
    k,
}) => {
   // let evidence = ""
    //let references = ""
    const evi = cit?.evidence
    const pub = cit?.publication
    const code = evi?.code, name = evi?.name, type = evi?.type, id_evi = evi?.id
    const pmid = pub?.pmid ,citation = pub?.citation, id_pub = pub?.id
    let link = ''
    let styleStrong = {}
    try {
    if (evi?.type === "Strong") {
        styleStrong = { fontWeight: "bold" }
    }
    if(pub?.url){
        link = `<a href="${pub?.url}" target="_blank" rel="noopener noreferrer" >Go to Refence</a>`
    }
    let eviref = ''
    if(id_evi){
        eviref += `
        <h2>Evidence</h1>
        <h1>${code?`${code}:`:''} ${name?name:''}
            <br>${type?`(${type})`:''}
        </h1>
        `
    }
    if(id_pub){
        eviref += `
            <h2>Reference:</h2>
            <h2>${link}</h2>
            <p>${pmid?`pmid: ${pmid}`:''}</p>
            <p class="citation">${citation?citation:''}</p>
        `
    }
    return ( 
        <Modal className={`aBase ${classNameModal}`} style={styleStrong} title={title} info={eviref} />
     );
    } catch (error) {
        console.log("edivence error: ", error)
        return (<></>);
    }

}

export default ModalER;