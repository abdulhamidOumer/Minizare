import {getDataFromApi} from './dataSenderModule'

export const getExchangeRate = (from, to)=>{
    const path = `https://free.currencyconverterapi.com/api/v6/convert?q=${from}_${to}`;

    return new Promise((resolve, reject)=>{
        getDataFromApi(path).then(res=>{
            if(res.hasOwnProperty('results')){
                resolve(res.results[`${from}_${to}`]);
            }
            else{
                reject("ERROR")
            }
        }).catch(err=>{
            reject(err);
        })
    })
}

export const getHistoryData = (firstCurrrency, secondCurrency, fromDate, toDate)=>{
    const path = `https://free.currencyconverterapi.com/api/v6/convert?q=${firstCurrrency}_${secondCurrency},${secondCurrency}_${firstCurrrency}&compact=ultra&date=${fromDate}&endDate=${toDate}`

    return new Promise((resolve, reject)=>{
        getDataFromApi(path).then(res=>{
            if(res.hasOwnProperty(`${firstCurrrency}_${secondCurrency}`)){
                resolve(res);
            }
            else{
                reject("ERROR")
            }
        }).catch(err=>{
            reject(err)
        })
    })

}   