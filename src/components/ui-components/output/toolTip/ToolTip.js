import React, { useState } from 'react';
import Styles from './ToolTip.module.css'

const ToolTip = ({
    autoShow = true,
    children,
    TipBox = TipDefault,
    tip = '',
    display = false,
    style = {}
}) => {
    const [show,setShow] = useState(display)
    if(autoShow){
        return ( 
            <div style={style} onMouseOver={()=>{setShow(true)}} onMouseLeave={()=>{setShow(!show)}}>
                {children}
                {
                    show
                    ?<TipBox>{tip}</TipBox>
                    :null
                }
            </div> 
            );
    }else{
        return ( 
            <div style={style}>
                {children}
                {
                    display
                    ?<TipBox>{tip}</TipBox>
                    :null
                }
            </div> 
            );
    }
    
}

const TipDefault = ({children}) => {
    return ( 
        <div className={Styles.tooltip}>
            {children}
        </div>
     );
}

 
export default ToolTip;