import idb from 'idb'

export const initiateAllStores = ()=>{
    let MinizareDb = idb.open('Minizare',1, (upgradeDb)=>{
        switch(upgradeDb.oldVersion){
            case 0:{
                upgradeDb.createObjectStore('preferences')
            }
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