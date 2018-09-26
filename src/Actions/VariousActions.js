import {populateCurrencyComponents} from './mainActions'
import Store from '../Store'

export const closePopUp = ()=>{
    return(dispatch)=>{
        dispatch({type:"CLOSE_POP_UP"});
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