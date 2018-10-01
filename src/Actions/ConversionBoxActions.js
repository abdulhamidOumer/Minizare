import Store from '../Store'
import {populateCurrencyComponents} from './mainActions'

export const showCurrencyOptions = (fromInput)=>{
    return(dispatch)=>{
        dispatch({type:fromInput,payload:"CURRENCY_OPTIONS"})
    }
}

export const changeCurrencyType = (currencyName,currencyID, symbol)=>{
    return(dispatch)=>{
        dispatch({type:"CHANGE_CURRENCY",payload:{name:currencyName,id:currencyID,symbol}})
        
    }
}

export const changeCurrencyFrom = (currency)=>{
    return(dispatch)=>{
        dispatch({type:"CHANGE_CURRENCY_FROM",payload:currency})
    }
}

export const searchCurrency = (searchTerm)=>{
    return(dispatch)=>{
        const lowerSearchTerm = searchTerm.toLowerCase()
        if(lowerSearchTerm === ''){
            dispatch(populateCurrencyComponents(Store.getState().countries))
        }
        else{
            dispatch(populateCurrencyComponents(Store.getState().countries,lowerSearchTerm))
        }

    }
}

export const getCurrencyTo = (fromCurrency,value='name')=>{
    if(fromCurrency.name === Store.getState().upperCurrency.name){
        if(value==='name'){
            return Store.getState().lowerCurrency.name
        }
        else if(value === 'id'){
            return Store.getState().lowerCurrency.id
        }
        else{
            return Store.getState().lowerCurrency
        }
        
    }
    else if(fromCurrency.name === Store.getState().lowerCurrency.name){
        if(value==='name'){
            return Store.getState().upperCurrency.name
        }
        else if(value === 'id'){
            return Store.getState().upperCurrency.id
        }
        else{
            return Store.getState().upperCurrency
        }
    }
}