export const sendDataToApi = (path,data,dispatch=null,method='POST')=>{
    
    data = JSON.stringify(data);

    return new Promise((resolve,reject)=>{

        fetch(path,{
                method:method,
                headers:{'Accept':'application/json','Content-Type':'application/json'},
                body:data
            }).then(apiResponse=>{
                //Add Error Handler Module
                if(apiResponse.status === 200){
                    
                    try{
                        apiResponse.json().then(jsonResponse=>{
                            resolve(jsonResponse);
                        })
                    }
                    catch(e){
                        resolve(null)
                    }
                    

                }
                else{
                    reject({errorType:'STATUS_CODE',error:apiResponse.status})    
                }

            }).catch(error=>{
                reject({errorType:'FETCH_ERROR',error})
            })
            
    });

}


export const getDataFromApi = (path,method='GET')=>{
    
    return new Promise((resolve,reject)=>{

        fetch(path,{
                method:method,
                headers:{'Accept':'application/json'}
            }).then(apiResponse=>{
                //Add Error Handler Module
                if(apiResponse.status === 200){

                    apiResponse.json().then(jsonResponse=>{

                        resolve(jsonResponse);
                    })

                }
                else{
                    apiResponse.json().then(jsonResponse=>{

                        reject(jsonResponse);
                    })    
                }

            }).catch(error=>{
                reject({errorType:'FETCH_ERROR',error})
            })
            
    });

}


