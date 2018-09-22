import React from 'react'
import CurrencyHolder from '../Components/CurrencyOption'
import store from '../Store'
import {getExchangeRate, getHistoryData} from '../modules/CurrencyModule'
import{getDataFromApi} from '../modules/dataSenderModule'
import {getCurrencyTo} from './ConversionBoxActions'

export const populateCountries = ()=>{
    return(dispatch)=>{
        const path = 'https://free.currencyconverterapi.com/api/v5/countries'
        getDataFromApi(path).then(res=>{
            if(res.hasOwnProperty('results')){
                dispatch({type:"POPULATE_COUNTRIES",payload:res.results});
                dispatch(getUserCountry(res.results));
            }

        }).catch(err=>{
            console.log(err);
        })
    }
}

export const getUserCountry = (countriesList)=>{
    return(dispatch)=>{
        const path = 'http://ip-api.com/json'
        getDataFromApi(path).then(res=>{
            if(res.hasOwnProperty('country')){
                const clientCountry = res.country.toLowerCase();

                for(let key in countriesList){
                    const currentCountry = countriesList[key].name.toLowerCase()
                    if(clientCountry === currentCountry){
                        let symbol = null

                        if(countriesList[key].hasOwnProperty('currencySymbol')){
                            symbol = countriesList[key]['currencySymbol'];
                        }
                         else{
                             symbol = '$'
                        }

                        dispatch({type:"CHANGE_CURRENCY",payload:{name:countriesList[key].currencyName,id:countriesList[key].currencyId,symbol}}) 
                        
                        break;
                    }
                }
            }
            dispatch(populateCurrencyComponents(countriesList))
        }).catch(err=>{
            console.log(err)
            dispatch(populateCurrencyComponents(countriesList))
        })
    }
}

export const populateCurrencyComponents = (countries,searchTerm=null)=>{
    return(dispatch)=>{
       
        let tempList = []
        
        for(let key in countries){
            const country = countries[key]
            const alpha3 = country['alpha3'].toLowerCase()
            const currencyName = country['currencyName']
            const countryName = country['name']
            let symbol = null

            if(country.hasOwnProperty('currencySymbol')){
                symbol = country['currencySymbol'];
            }
            else{
                symbol = '$'
            }

            const flag = `https://restcountries.eu/data/${alpha3}.svg`

            if(searchTerm){
                if(countryName.toLowerCase().includes(searchTerm) || currencyName.toLowerCase().includes(searchTerm)){
                    tempList.push(<CurrencyHolder currencyId={country.currencyId} country={countryName} currency={currencyName} img={flag} symbol={symbol} key={alpha3}/>)
                }

            }
            else{
                tempList.push(<CurrencyHolder currencyId={country.currencyId} country={countryName} currency={currencyName} img={flag} symbol={symbol} key={alpha3}/>)
            }
            
        }
        if(searchTerm===null){
            tempList.sort((a,b)=>{
                const nameA = a.props.country.toUpperCase()
                const nameB = b.props.country.toUpperCase()
                if (nameA < nameB) {
                    return -1;
                }
                    
                if (nameA > nameB) {
                    return 1;
                }
    
                return 0;
            })
        }
        
        dispatch(getCurrentCurrenciesRate());
        dispatch({type:"POPULATE_CURRENCIES_COMPONENT",payload:tempList})
    }
}

export const getCurrentCurrenciesRate = ()=>{
    return(dispatch)=>{
        const from = store.getState().changeFrom.id
        const to = getCurrencyTo(store.getState().changeFrom,'id')

        dispatch({type:"NULL_CURRENT_RATE"})

        getExchangeRate(from,to).then(res=>{
            dispatch({type:"CHANGE_CURRENT_RATE",payload:{value:res.val, from, to}})
            if(store.getState().calculate){
                dispatch({type:"INITIATE_CALCULATION",payload:{num:store.getState().calculate.num,ready:true,update:store.getState().calculate.update}});
            }
            dispatch(getCurrentChart());
        }).catch(err=>{
            console.log(err);
        })


    }
}

export const getCurrentChart = ()=>{
    return(dispatch)=>{
        const today = new Date()
        const dd = today.getDate()-1;
        const mm = today.getMonth()+1;
        const yyyy = today.getFullYear();

        const dateNow = `${yyyy}-${mm}-${dd}`;
        const fromDate = `${yyyy}-${mm}-${dd-7}`
        const firstCurrency = store.getState().changeFrom.id
        const secondCurrency = getCurrencyTo(store.getState().changeFrom,'id')

        const exchangeHistory = store.getState().exchangeHistory

        if(exchangeHistory){
            if(exchangeHistory.hasOwnProperty(`${firstCurrency}_${secondCurrency}`) || exchangeHistory.hasOwnProperty(`${secondCurrency}_${firstCurrency}`)){
                const current = new Date();
                const oldTime = exchangeHistory.lastUpdated

                const difference = Math.abs(current - oldTime)/36e5
                if(difference < 1){
                    dispatch({type:"SAVE_EXCHANGE_HISTORY",payload:{...exchangeHistory,updated:exchangeHistory.updated+1}});
                    return
                }
                
            }
        }
        

        getHistoryData(firstCurrency, secondCurrency, fromDate, dateNow).then(res=>{
            dispatch({type:"SAVE_EXCHANGE_HISTORY",payload:{...res,updated:0,lastUpdated:new Date()}});
        }).catch(err=>{
            console.log(err);
        })
        }
}