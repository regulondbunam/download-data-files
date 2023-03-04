import React, { useState } from 'react';
import ToolTip from '../../output/toolTip/ToolTip'
import { IconButton } from '../../input/Buttons'
import Style from './Phrase.module.css'
import Cursor from './resources/cursorIcon.png'

const Phrase = ({
    term,
    style,
    phraseData
}) => {
    const [visible, setVisible] = useState(false)
    const [idphrase, setidPhrase] = useState(0)
    const [ancla, setAncla] = useState(false)
    //console.log(phraseData)

    const TipPhrase = () => {
        if (phraseData === undefined) {
            return <></>
        }
        //console.log(phraseData)
        const phrase = phraseData.phrases[idphrase]
        const nPhrases = phraseData.phrases.length
        let pagControl = <></>
        if (nPhrases > 1) {
            let arrwStyleL = {}
            let arrwStyleR = {}
            console.log(nPhrases, "-", idphrase)
            if (nPhrases - 1 === idphrase) { arrwStyleR = { display: 'none' } }
            if (idphrase === 0) { arrwStyleL = { display: 'none' } }
            pagControl = <> <IconButton onClick={() => { setidPhrase(idphrase - 1) }} style={arrwStyleL} icon="keyboard_arrow_left" className={Style.phraseIconButton} />
                <IconButton onClick={() => { setidPhrase(idphrase + 1) }} style={arrwStyleR} icon='keyboard_arrow_right' className={Style.phraseIconButton} />
            </>
        }
        let pinStyle = {}
        if (ancla) {
            pinStyle = { color: "#000000", backgroundColor: "#CC9900" }
        }
        try {
            return (
                <div className={Style.phraseTip} onMouseLeave={() => { if (!ancla) { setVisible(false) } }}>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <div>
                                        <div>
                                            <IconButton onClick={() => { setVisible(false) }} icon='clear' iconStyle={{fontSize: '18px'}} className={Style.phraseIconButton} />
                                            <IconButton onClick={() => { setAncla(!ancla) }} style={pinStyle} iconStyle={{fontSize: '18px'}} icon='push_pin' className={Style.phraseIconButton} />
                                        </div>
                                    </div>
                                </th>
                                <th>
    
                                </th>
                                <th>
                                <div style={{display: 'flex', flexDirection: "row-reverse"}}>
                                    <div>
                                    <IconButton icon='help' iconStyle={{fontSize: '18px'}} className={Style.phraseIconButton} />
                                    </div>
                                </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="3">
                                    <div>
                                        <div style={{ width: '60%' }}>
                                            <b>PMID:<a href="/phrases" rel="noopener noreferrer">{` ${phraseData.pmid}`}</a></b>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3">
                                    <div className="phraseBody">
                                        <p><a href="/phrases" rel="noopener noreferrer">{`"${phrase.phrase}"`}</a></p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3">
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                        <div className="phraseFooter">
                                            {pagControl}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )    
        } catch (error) {
            return <></>
        }
        
    }



    return (
        <ToolTip style={style} TipBox={TipPhrase} autoShow={false} display={visible}>
            <div>
                {term}
                {
                    phraseData === undefined
                        ? <></>
                        : <div style={{ cursor: `url(${Cursor}), auto`, width: "100%", height: '2px', backgroundColor: '#72A7C7' }}
                            onClick={() => { setVisible(!visible) }}
                        ></div>
                }

            </div>
        </ToolTip>
    )

}

export default Phrase;