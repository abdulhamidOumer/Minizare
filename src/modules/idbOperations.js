import idb from 'idb'

export const initiateAllStores = ()=>{
    let MinizareDb = idb.open('Minizare',4, (upgradeDb)=>{
        switch(upgradeDb.oldVersion){
            case 0:{
                upgradeDb.createObjectStore('preferences')
            }
            // eslint-disable-next-line
            case 1:{
                let countriesStore = upgradeDb.createObjectStore('countries',{keyPath:'id'});
                countriesStore.createIndex('currencyId','currencyId')
                countriesStore.createIndex('countryName', 'name')
            }
            // eslint-disable-next-line
            case 2:{
                let exchangeHistoryStore = upgradeDb.createObjectStore('exchange-history',{keyPath:'exchange_id'})
                exchangeHistoryStore.createIndex('date','date')
            }
            // eslint-disable-next-line
            case 3:{
                let exchangeRateStore = upgradeDb.createObjectStore('exchange-rates',{keyPath:'exchange_id'})
                exchangeRateStore.createIndex('last_updated','last_updated');
            }
            // eslint-disable-next-line
            default:
                break
        }
    })

    return MinizareDb
}

export const addValueToCellObject = (value, key, store)=>{
    let MinizareDb = initiateAllStores()

    return new Promise((resolve, reject)=>{
        MinizareDb.then((db)=>{
            let transaction = db.transaction(store,'readwrite')
            let objectStore = transaction.objectStore(store)
            objectStore.put(value, key)
            return transaction.complete
        }).then(()=>{
            resolve("VALUE_ADDED")
        }).catch(err=>{
            reject(err)
        })
    })

}

export const getCellObjectValue = (key,store, timeDifference=null)=>{
    let MinizareDb = initiateAllStores()

    return new Promise((resolve, reject)=>{
        MinizareDb.then((db)=>{
            let transaction = db.transaction(store)
            let objectStore = transaction.objectStore(store)
            return objectStore.get(key)
        }).then((val)=>{
            if(timeDifference){
                dateAndTimeDifference(store,key, timeDifference.dateVariable).then(difference=>{
                    resolve({val,difference})
                })
            }
            else
                resolve(val)
        }).catch(err=>{
            reject(err)
        })
    })
}

export const deleteCellObjectValue = (key,store)=>{
    let MinizareDb = initiateAllStores()

    return new Promise((resolve, reject)=>{
        MinizareDb.then((db)=>{
            let transaction = db.transaction(store,'readwrite')
            let objectStore = transaction.objectStore(store)
            return objectStore.delete(key)
        }).then((val)=>{
            resolve("DELETED")
        }).catch(err=>{
            reject(err)
        })
    })
}

export const addKeyValueObjects = (values,store, dataType='keyval')=>{
    let MinizareDb = initiateAllStores()
    
    return new Promise((resolve, reject)=>{
        MinizareDb.then((db)=>{
            let transaction = db.transaction(store,'readwrite')
            let objectStore = transaction.objectStore(store)
            
            if(dataType === 'array'){

                for(let value of values){
                    objectStore.put(value)
                }
            }
            else{
                for(let key in values){
                    objectStore.put(values[key])
                }
            }
            

            return transaction.complete
        }).then(()=>{
            resolve("VALUES_ADDED")
        }).catch(err=>{
            reject(err)
        })
    })
}

export const getAllStoreValues = (store,index=null)=>{
    let MinizareDb = initiateAllStores()
    return new Promise((resolve, reject)=>{
        
        MinizareDb.then((db)=>{
            const transaction = db.transaction(store)
            const objectStore = transaction.objectStore(store)
            if(index){
                const the_index = objectStore.index(index)
                return the_index.getAll()
            }
            else{
                return objectStore.getAll()
            }
        }).then((values)=>{
            resolve(values)
        }).catch(err=>{
            reject(err)
        })

    })
}

const dateAndTimeDifference = (store, key, dateVariable)=>{
    return new Promise((resolve, reject)=>{
        getCellObjectValue(key,store).then(res=>{
            const storeDate = res[dateVariable]
            const compareToDate = new Date()
            let difference = Math.abs(compareToDate - storeDate)/36e5
            resolve(difference)
        }).catch(err=>{
            resolve(0)
        })
    })
}