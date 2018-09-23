import idb from 'idb'

export const initiateAllStores = ()=>{
    let MinizareDb = idb.open('Minizare',2, (upgradeDb)=>{
        switch(upgradeDb.oldVersion){
            case 0:{
                upgradeDb.createObjectStore('preferences')
            }
            case 1:{
                let countriesStore = upgradeDb.createObjectStore('countries',{keyPath:'id'});
                countriesStore.createIndex('currencyId','currencyId')
                countriesStore.createIndex('countryName', 'name')
                break
            }
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

export const getCellObjectValue = (key,store)=>{
    let MinizareDb = initiateAllStores()

    return new Promise((resolve, reject)=>{
        MinizareDb.then((db)=>{
            let transaction = db.transaction(store)
            let objectStore = transaction.objectStore(store)
            return objectStore.get(key)
        }).then((val)=>{
            resolve(val)
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

