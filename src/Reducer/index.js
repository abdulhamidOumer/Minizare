export default (state={
    full_screen_loading:true,
    PopUp:null,
    editNow:null,
    countries:null,
    upperCurrency:{name:"European euro",id:"EUR", symbol:"€"},
    lowerCurrency:{name:"United states dollar", id:"USD", symbol:"$"},
    changeFrom:{name:"European euro",id:"EUR", symbol:"€"},
    calculate:false,
    currentExchangeRate:null,
    currencyListComponents:null,
    exchangeHistory:null,
    topMenu:false,
    theme:'LIGHT',
    toaster:null
},action)=>{
    switch(action.type){
        case "SHOW_POP_UP_UPPER":{
            return {...state,PopUp:action.payload, editNow:"UPPER", full_screen_loading:false}
        }
        
        case "SHOW_POP_UP_LOWER":{
            return {...state,PopUp:action.payload, editNow:"LOWER", full_screen_loading:false}
        }

        case "CLOSE_POP_UP":{
            return {...state, PopUp:null}
        }
        case "POPULATE_COUNTRIES":{
            return {...state,countries:action.payload}
        }

        case "SHOW_FULL_SCREEN_LOADER":{
            return {...state, full_screen_loading:true}
        }

        case "CHANGE_CURRENCY":{
            if(state.editNow === "LOWER"){
                return{...state,lowerCurrency:action.payload}
            }
            else{
                return{...state,upperCurrency:action.payload, changeFrom:action.payload}
            }
        }

        case "CHANGE_CURRENCY_FROM":{
            return {...state, changeFrom:action.payload}
        }
        case "POPULATE_CURRENCIES_COMPONENT":{
            return {...state, currencyListComponents:action.payload, full_screen_loading:false}
        }
        
        case "SHOW_TOP_MENU":{
            return {...state, topMenu:true}
        }

        case "HIDE_TOP_MENU":{
            return {...state, topMenu:false}
        }

        case "CHANGE_THEME":{
            return {...state, theme:action.payload}
        }

        case "CHANGE_CURRENT_RATE":{
            return {...state, currentExchangeRate:action.payload}
        }

        case "NULL_CURRENT_RATE":{
            return {...state, currentExchangeRate:null}
        }
        case "INITIATE_CALCULATION":{
            return {...state, calculate:action.payload}
        }
        case "STOP_CALCULATION":{
            return {...state, calculate:false}
        }
        case "SAVE_EXCHANGE_HISTORY":{
            return {...state, exchangeHistory:action.payload}
        }

        case "SHOW_TOASTER":{
            return {...state, toaster:action.payload}
        }

        case "CLOSE_TOASTER":{
            return {...state, toaster:null}
        }

        case "NULL_HISTORY":{
            return{...state, exchangeHistory:null}
        }
        default:
            break;
    }
    return state;
}