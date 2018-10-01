import React from 'react'
import './main.css'
import {faInfoCircle} from '@fortawesome/fontawesome-free-solid'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const FloatingButton = ({text, onClick})=>{
    return(
        <div onClick={onClick} className='floating-button'>
            <FontAwesomeIcon className='floating-icon' icon={faInfoCircle} />
            <label className='floating-name'>{text}</label>
        </div>
    )
}

export default FloatingButton