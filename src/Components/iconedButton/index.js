import React,{Component} from 'react'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './main.css'

class IconedButton extends Component{
    render(){
        let color = 'var(--inactive-color)';
        if(this.props.active)
            color = 'var(--primary-color-one)'
        return(
            <button className='iconed-button' onClick={this.props.onClick}>
                <FontAwesomeIcon style={{color:color}} icon={this.props.icon} className='button-icon'/><br/><br/>
                <label className='button-discription'>{this.props.discription}</label>
            </button>
        )
    }
} 

IconedButton = connect(store=>{
    return{

    }
})(IconedButton)

export default IconedButton