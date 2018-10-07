import React from 'react'
import './main.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAndroid, faApple} from '@fortawesome/fontawesome-free-brands'
import safariActions from '../../images/icons/saffari-action.png'
import { faDesktop } from '@fortawesome/fontawesome-free-solid';

const HowToInstall = ()=>{
    return(
        <div>
            <div className='center-contents-div'>
                <h3 className='tab-title middle-title'>How To Install Minizare </h3>
            </div>
            <p className='tab-paragraph'>Minizare is a progressive web app (PWA), which means you are
            able to install it to your device regardless of the platform you are using(Android, ios or Desktop).
            Follow the steps below to install Minizare to your device.</p>
            
            <div className='center-contents-div'>
                <div className='icon-wraper'><FontAwesomeIcon icon={faAndroid} className='reading-icons'/></div>
            </div>
            
            <h4 className='tab-title sub'>Android</h4>
            <p className='tab-paragraph sub'>If you are using Chrome for Android you will be asked to add the App to your
            Home screen, Press the 'Add To Home Screen' button when prompted and you are all set. If you are using
             a browser other than chrome or if you are not prompted tap the <FontAwesomeIcon icon='ellipsis-v'/> (options) button then find and preess 'Add To Home Screen'</p>

            <div className='center-contents-div'>
                <div className='icon-wraper'><FontAwesomeIcon icon={faApple} className='reading-icons'/></div>
            </div>

            <h4 className='tab-title sub'>IOS</h4>
            <p className='tab-paragraph sub'>First open Minizare on Safari after that click the <img alt='Safari Action Button' src={safariActions}/> button and scroll 
            through the options then tap the 'Add To Home Screen' button, you are all good to go.</p>
        
            <div className='center-contents-div'>
                <div className='icon-wraper'><FontAwesomeIcon icon={faDesktop} className='reading-icons'/></div>
            </div>
            <h4 className='tab-title sub'>Desktop</h4>
            <p className='tab-paragraph sub'>If you are on Chrome OS you will be prompted to add Minizare to your home screen. If not 
            prompted or you are on a different OS:<br/></p>
            <ol className='tab-lists'>
                <li>Open Minizare on Google Chrome</li>
                <li>Then open the chrome DevTools by pressing 'F12' or 'ctrl + shift + I'</li>
                <li>Go to the <b>Application</b> panel</li>
                <li>Go to the <b>Manifest</b> tab</li>
                <li>Finally find and click <b>Add To Home Screen</b> and make sure the 'open as a window' box is checked when adding the app.</li>
            </ol>
        </div>    
        )
}

export default HowToInstall