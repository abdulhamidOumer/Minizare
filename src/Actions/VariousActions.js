import {populateCurrencyComponents} from './mainActions'
import Store from '../Store'

export const closePopUp = (type=null)=>{
    return(dispatch)=>{
        dispatch({type:"CLOSE_POP_UP"});
        if(type==='currency')
            dispatch(populateCurrencyComponents(Store.getState().countries))
    }
}

export const showFullLoader = ()=>{
    return(dispatch)=>{
        dispatch({type:"SHOW_FULL_SCREEN_LOADER"});
    }
}

export const showToaster = (toasterItems)=>{
    return(dispatch)=>{
        dispatch({type:"SHOW_TOASTER",payload:toasterItems})
    }
}

export const closeToaster = ()=>{
    return(dispatch)=>{
        dispatch({type:"CLOSE_TOASTER"});
    }
}

export const showPopUp = (name)=>{
    return(dispatch)=>{
        dispatch({type:"SHOW_POP_UP",payload:name})
    }
}

export const updateInfoPopUp = (type, title,message,icon, onOk, onCancel, buttons)=>{
    return(dispatch)=>{
        dispatch({type:"SHOW_POP_UP",payload:"INFO_POP_UP"})
        dispatch({type:"UPDATE_INFO_POP_UP", payload:{title, message, type, icon, onOk, onCancel, buttons}})
    }
}