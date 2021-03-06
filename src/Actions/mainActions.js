import React from 'react'
import CurrencyHolder from '../Components/CurrencyOption'
import store from '../Store'
import {getExchangeRate, getHistoryData} from '../modules/CurrencyModule'
import{getDataFromApi} from '../modules/dataSenderModule'
import {getCurrencyTo} from './ConversionBoxActions'
import {initiateAllStores, getCellObjectValue, addValueToCellObject, addKeyValueObjects,getAllStoreValues} from '../modules/idbOperations'
import {changeActiveTheme} from '../Actions/topBarActions'
import {faExclamationTriangle, faTimes} from '@fortawesome/fontawesome-free-solid'
const populateCountriesOnline = ()=>{
    return(dispatch)=>{
        const path = 'https://free.currencyconverterapi.com/api/v5/countries?apiKey=baad9301ee94175f54d7'
        getDataFromApi(path).then(res=>{
            if(res.hasOwnProperty('results')){
                dispatch({type:"POPULATE_COUNTRIES",payload:res.results});
                dispatch(getUserCountry(res.results));
                addKeyValueObjects(res.results,'countries').then((res)=>{
                    console.log(res)
                }).catch(err=>{
                    console.log(err);
                })
            }

        }).catch(err=>{
            console.log(err);
        })
    }
}

export const populateCountries = ()=>{
    return(dispatch)=>{
        getAllStoreValues('countries').then(res=>{
            if(res && res.length > 0){
                dispatch({type:"POPULATE_COUNTRIES",payload:res});
                dispatch(getUserCountry(res));
            }
            else{
                dispatch(populateCountriesOnline())
            }
        }).catch(err=>{
            console.log(err)
            dispatch(populateCountriesOnline())
        })

    }
}

const changeUserCountry = (countriesList,clientCountry)=>{
    return(dispatch)=>{
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
}

const getUserCountryFromIp = ()=>{
    const path = 'https://geoip-db.com/json/'
    return new Promise((resolve, reject)=>{
        getDataFromApi(path).then(res=>{
            if(res.hasOwnProperty('country_name')){
                const clientCountry = res.country_name.toLowerCase();
                addValueToCellObject(clientCountry,'country','preferences')
                resolve(clientCountry)
            }
            else{
                reject("ERROR")
            }
        }).catch(err=>{
            reject(err)
        })
    })

}

export const getUserCountry = (countriesList)=>{
    return(dispatch)=>{

        getCellObjectValue('country','preferences').then(res=>{
            if(res){
                dispatch(changeUserCountry(countriesList, res))
            }
            else{
                getUserCountryFromIp().then(result=>{
                    dispatch(changeUserCountry(countriesList, result))
                })    
            }
            dispatch(populateCurrencyComponents(countriesList))
            
        }).catch(err=>{

            getUserCountryFromIp().then(res=>{
                dispatch(changeUserCountry(countriesList, res))
            })
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
            dispatch({type:"CHANGE_CURRENT_RATE",payload:{value:res, from, to}})
            if(store.getState().calculate){
                dispatch({type:"INITIATE_CALCULATION",payload:{num:store.getState().calculate.num,ready:true,update:store.getState().calculate.update}});
            }
            
        }).catch(err=>{
            console.log(err);
        })


    }
}


export const getCurrentChart = (fromDate, toDate)=>{
    
    return(dispatch)=>{
        const firstCurrency = store.getState().changeFrom.id
        const secondCurrency = getCurrencyTo(store.getState().changeFrom,'id')
        const exchangeHistory = store.getState().exchangeHistory
        if(exchangeHistory){
            if(exchangeHistory.hasOwnProperty(`${firstCurrency}_${secondCurrency}`) || exchangeHistory.hasOwnProperty(`${secondCurrency}_${firstCurrency}`)){
                const dates = []
                let count = 0
                for(let key in exchangeHistory[`${firstCurrency}_${secondCurrency}`]){
                    if(count === 0)
                        dates[0] = key
                    else
                        dates[1] = key
                    count++
                }
                if(fromDate === dates[0] && toDate === dates[1]){
                    dispatch({type:"SAVE_EXCHANGE_HISTORY",payload:{...exchangeHistory,updated:exchangeHistory.updated+1}});
                    return
                }
            }
        }
        
        dispatch({type:"NULL_HISTORY"})
        getHistoryData(firstCurrency, secondCurrency, fromDate, toDate).then(res=>{
            dispatch({type:"SAVE_EXCHANGE_HISTORY",payload:{...res,updated:0,lastUpdated:new Date()}});

        }).catch(err=>{
            if(err.error === 'Free version only allows up to 1 year earlier.'){
                const message = "History is only avialable for 1 year earlier currently"
                const background = "var(--error-color)"
                const itemsBackground = "white"
                const iconRight = faTimes
                const iconLeft = faExclamationTriangle

                dispatch({type:"SHOW_TOASTER",payload:{message, background, itemsBackground, iconRight, iconLeft}});
            }
        })
        

    }
}


export const getPreferences = ()=>{
    return(dispatch)=>{
        initiateAllStores()

        getCellObjectValue('theme','preferences').then(val=>{
            if(val){
                dispatch(changeActiveTheme(val))
            }
            else{
                dispatch(changeActiveTheme('LIGHT'))
            }
            
            dispatch(populateCountries())
        }).catch(err=>{
            console.log(err)
            const currentTheme = store.getState().theme
            addValueToCellObject(currentTheme,'theme','preferences')
            dispatch(populateCountries())
        })
    }
} 