import React,{Component} from 'react'
import {connect} from 'react-redux'
import './main.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/fontawesome-free-solid'
import {menuDisplayActions} from '../../Actions/topBarActions'

class TopBar extends Component{
    
    menuDisplay(){
        if(this.props.topMenu){
            this.props.dispatch(menuDisplayActions('HIDE'))
        }
        else{
            this.props.dispatch(menuDisplayActions('SHOW'))
        }

    }

    render(){
        return(
            <div className='top-bar-div'>
                <h1 className='main-title'>Minizare</h1>
                <FontAwesomeIcon icon={faBars} onClick={this.menuDisplay.bind(this)} className='menu-button' />
            </div>
        )
    }
}

TopBar = connect(store=>{
    return{
        topMenu:store.topMenu
    }
})(TopBar)

export default TopBar
