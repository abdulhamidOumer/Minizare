import React,{Component} from 'react'
import {connect} from 'react-redux'
import Loading from '../Loading'
import './main.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class InfoPopUp extends Component{
    constructor(props){
        super(props)
        this.state = {
            buttons:null,
            loading:null
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.infoPopUpState !== prevProps.infoPopUpState){
            const currentState = this.props.infoPopUpState
            this.updatePopUp(currentState)
        }
    }

    componentWillMount(){
        const currentState = this.props.infoPopUpState
        this.updatePopUp(currentState)
    }

    cancel(){
        const currentState = this.props.infoPopUpState
        this.props.dispatch(currentState.onCancel())
    }

    ok(){
        const currentState = this.props.infoPopUpState
        this.props.dispatch(currentState.onOk())
    }

    updatePopUp(currentState){
        const  okButton = (<button key='ok' className='popup-buttons' onClick={this.ok.bind(this)}>{currentState.buttons[0]}</button>)
        const  cancelButton = (<button key='cancel' className='popup-buttons' onClick={this.cancel.bind(this)}>{currentState.buttons[1]}</button>)

        switch(currentState.type){
            case "NORMAL":{
                this.setState({buttons:[okButton], loading:null})
                break
            }
            case "CONFIRMATION":{
                this.setState({buttons:[okButton, cancelButton], loading:null})
                break
            }
            case "LOADING":{
                this.setState({buttons:[okButton], loading:(<Loading />)})
                break
            }
            default:
                this.setState({buttons:[okButton], loading:null})
                break
        }
    }

    render(){
        const currentState = this.props.infoPopUpState
        return(
            <div className='info-pop-up'>
                <div className='icon-wraper full-bg'><FontAwesomeIcon className='popup-icon' icon={currentState.icon}/></div>
                <h3 className = 'popup-title'>{currentState.title}</h3>
                {this.state.loading}
                <p className='popup-message'>{currentState.message}</p>
                <div className='initial-div'>{this.state.buttons}</div>
            </div>
        )
    }
}

InfoPopUp = connect(store=>{
    return{
        infoPopUpState:store.infoPopUpState
    }
})(InfoPopUp)

export default InfoPopUp