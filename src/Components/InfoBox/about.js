import React from 'react'
import './main.css'
import Logo from '../../images/logo/logo.png'

const About = ()=>{
    return(
        <div>
            <div className='center-contents-div'>
                <img className='tab-logo' src={Logo} alt='Minizare'/>
            </div>
            <p className='tab-paragraph middle'>
                Minizare is an open source currency conveter web app powered by the free currency converter API. currently
                Minizare supports about 156 currencies and 201 countries internationally.<br/>
            </p>
            <p className='tab-paragraph footer-paragraph'>Version 0.1.0 </p> <p className='tab-paragraph footer-paragraph powered'>Powered By: <a href='http://free.currencyconverterapi.com' target='_blank' rel="noopener noreferrer">Free currency converter API</a></p>
        </div>
    )   
}

export default About