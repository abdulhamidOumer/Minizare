import React,{Component} from 'react'
import './main.css'
import {connect} from "react-redux"
import {closePopUp} from '../../Actions/VariousActions'

class PopUp extends Component{
    closeModal = ()=>{
        if(this.props.PopUp==='CURRENCY_OPTIONS')
            this.props.dispatch(closePopUp('currency'));
        else
            this.props.dispatch(closePopUp())
    }

    render(){
        let closeButton = (<button href="#" aria-label="Close Modal Box" onClick={this.closeModal.bind(this)} className="close">&times;</button>)
        if(this.props.PopUp === 'INFO_POP_UP')
            closeButton = null

        return(
            <div className="pop-up-container" id="pop-up-container">
                {closeButton}
                <div>
                    {this.props.element}
                </div>
            </div>
        )
    }
}

PopUp = connect(store=>{
    return{
        PopUp:store.PopUp
    }
})(PopUp)


export default PopUp