import React from 'react'
import './main.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const InfoTab = ({active,icon,onClick})=>{
    let color = 'var(--inactive-color)'

    if(active){
        color = 'var(--primary-color-one)'
    }

    return(
        <div className='a-tab-container'>
        <div className='info-tab' onClick={onClick}>
            <FontAwesomeIcon icon={icon} className='tab-icon' style={{color:color}}/>
        </div>
        </div>
    )
}

export default InfoTab