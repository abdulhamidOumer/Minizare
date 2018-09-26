import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './main.css'

const Toaster = ({message, iconAction, iconRight, iconLeft, background, itemsBackground})=>{
    let iconToShow = (<FontAwesomeIcon style={{color:itemsBackground}} className='toaster-right-icon toaster-items' icon={iconRight}/>)
    if(iconAction)
        iconToShow = (<FontAwesomeIcon style={{color:itemsBackground}} className='toaster-right-icon toaster-items' icon={iconRight} onClick={iconAction}/>)
    
    return(
        <div className='toaster' style={{background:background}}>
            <FontAwesomeIcon style={{color:itemsBackground}} className='toaster-left-icon toaster-items' icon={iconLeft}/>
            <p style={{color:itemsBackground}} className='toaster-message toaster-items'>{message}</p>
            {iconToShow}
        </div>
    )

}

export default Toaster
