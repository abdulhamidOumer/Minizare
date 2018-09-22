import React,{Component} from 'react'
import './main.css'
import {connect} from "react-redux"
import {closePopUp} from '../../Actions/VariousActions'

class PopUp extends Component{
    closeModal = ()=>{
        this.props.dispatch(closePopUp());
    }

    render(){
        return(
            <div className="pop-up-container" id="pop-up-container">
                <button href="#" aria-label="Close Modal Box" onClick={this.closeModal.bind(this)} className="close">&times;</button>
                <div>
                    {this.props.element}
                </div>
            </div>
        )
    }
}

PopUp = connect()(PopUp)


export default PopUp