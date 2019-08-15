import {getDataFromApi} from './dataSenderModule'
import {getCellObjectValue,addKeyValueObjects, deleteCellObjectValue} from './idbOperations'

export const getExchangeRate = (from, to)=>{
    return new Promise((resolve, reject)=>{
        const exchange_id = `${from}_${to}`
        getExchangeFromStore(exchange_id).then(res=>{
            if(res.difference > 1){
                getExchangeFromApi(exchange_id, from, to).then(result=>{
                    resolve(result.val)
                }).catch(err=>{
                    //show toast message
                    console.log(`Please connect to the internet difference: ${res.difference.toFixed(0)}`);
                    resolve(res.val.value)
                })
            }
            else{
                resolve(res.val.value)    
            }
            
            
        }).catch(err=>{
            getExchangeFromApi(exchange_id, from, to).then(res=>{
                resolve(res.val)
            }).catch(err=>{
                reject(err)
            })
        })
    })
}


const getExchangeFromApi = (exchange_id, from, to)=>{
    const path = `https://free.currencyconverterapi.com/api/v6/convert?q=${exchange_id}&apiKey=baad9301ee94175f54d7`;

    return new Promise((resolve, reject)=>{
        getDataFromApi(path).then(res=>{
            if(res.hasOwnProperty('results')){
                resolve(res.results[`${exchange_id}`]);
                const last_updated = new Date()
                const value = res.results[`${exchange_id}`].val

                const resultToStore = [{exchange_id,last_updated,value,from,to}]
                addKeyValueObjects(resultToStore, 'exchange-rates').catch(err=>{
                    console.log(err)
                })

            }
            else{
                reject("ERROR")
            }
        }).catch(err=>{
            reject(err);
        })
    })
}

const getExchangeFromStore = (exchange_id)=>{
    return new Promise((resolve,reject)=>{
        getCellObjectValue(exchange_id, 'exchange-rates',{dateVariable:'last_updated'}).then(res=>{
            if(res){
                resolve(res)
            }
            else{
                reject('RETRIVAL_ERROR')
            }
        }).catch(err=>{
            reject(err)
        })
    })
}

const getHistoryFromStore = (exchange_id)=>{
    return new Promise((resolve, reject)=>{
        getCellObjectValue(exchange_id,'exchange-history').then(res=>{
            if(res){
                resolve(res)
            }
            else{
                reject('RETRIVAL_ERROR')
            }
        }).catch(err=>{
            reject(err);
        })
    })
}

export const getHistoryData = (firstCurrrency, secondCurrency, fromDate, toDate)=>{
    
    return new Promise((resolve, reject)=>{
        const exchange_1 = `${firstCurrrency}_${secondCurrency}`
        const exchange_2 = `${secondCurrency}_${firstCurrrency}`
        const date = `${fromDate}-${toDate}`

        getHistoryFromStore(exchange_1).then(res=>{
            const result_1 = res.historyData;
            getHistoryFromStore(exchange_2).then(res=>{
                if(res.date === date){
                    const result = {}
                    result[exchange_1]=result_1
                    result[exchange_2]=res.historyData
                    resolve(result)
                    console.log("Served From Offline store")
                }
                else{
                    //delete from store
                    deleteCellObjectValue(exchange_1,'exchange-history').then(res=>{
                        deleteCellObjectValue(exchange_2,'exchange-history')
                    })
                    getHistoryFromApi(firstCurrrency,secondCurrency,fromDate,toDate).then(res=>{
                        resolve(res)
                    }).catch(err=>{
                        reject(err)
                    })
                }
            }).catch(err=>{
                getHistoryFromApi(firstCurrrency,secondCurrency,fromDate,toDate).then(res=>{
                    resolve(res)
                }).catch(err=>{
                    reject(err)
                })
            })
            
        }).catch(err=>{
            getHistoryFromApi(firstCurrrency,secondCurrency,fromDate,toDate).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    })

}   

const getHistoryFromApi = (firstCurrrency, secondCurrency, fromDate, toDate)=>{
    const path = `https://free.currencyconverterapi.com/api/v6/convert?q=${firstCurrrency}_${secondCurrency},${secondCurrency}_${firstCurrrency}&compact=ultra&date=${fromDate}&endDate=${toDate}&apiKey=baad9301ee94175f54d7`

    return new Promise((resolve, reject)=>{

        getDataFromApi(path).then(res=>{
            if(res.hasOwnProperty(`${firstCurrrency}_${secondCurrency}`)){
                const history = []
                for(let key in res){
                    const date = `${fromDate}-${toDate}`
                    const exchange_id = key
                    const historyData = res[key]
                    history.push({date,exchange_id,historyData})
                }

                addKeyValueObjects(history,'exchange-history', 'array').catch(err=>{console.log(err)})
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