import {sendDataToApi} from '../modules/dataSenderModule'
import {updateInfoPopUp, closePopUp} from './VariousActions'
import {faCheck, faPaperPlane}  from '@fortawesome/fontawesome-free-solid'
import Store from '../Store'

const onOkClick = ()=>{
    
    return(dispatch)=>{
        dispatch(sendMessageToDeveloper())
    }
    
}

const onCancelClick = ()=>{
    return(dispatch)=>{
        dispatch(closePopUp())
    }
    
}

export const sendMessageToDeveloper = ()=>{
    return(dispatch)=>{
        const message = Store.getState().devMessage

        dispatch(updateInfoPopUp('LOADING','Sending message to developer',null,faPaperPlane, onCancelClick, onCancelClick, ['Ok', 'Cancel']))
        sendDataToApi('https://us-central1-abduapi-70ff6.cloudfunctions.net/DevMessenger/AddMessage',{message:message},dispatch,'POST').then(res=>{
            dispatch(updateInfoPopUp('NORMAL','Message sent' ,'Your message was sent to the app developer successfully.', faCheck, onCancelClick, onCancelClick, ['Ok', 'Cancel']))
        }).catch(err=>{
            console.log(err)
        })
    }
}

export const initiateSendMessage = (messageToSend)=>{
    return(dispatch)=>{
        const message = 'Your message will be sent to the developer. Make sure to add all the necessary information and contact information.'
        dispatch(updateInfoPopUp('CONFIRMATION','Send Message To Developer',message,faPaperPlane, onOkClick, onCancelClick, ['Send', 'Cancel']))
        dispatch({type:"SAVE_DEV_MESSAGE", payload:messageToSend})
    }
}