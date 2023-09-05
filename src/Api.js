const Api = async (url,methodsObj) => {
    let jsonData,resMsg;
    try{
        const response  = await fetch(url,methodsObj)
        if(response.status === 200)
            jsonData = await response.json()
        else{
            const ResMsg = await response.json()
            throw(ResMsg)
        }
    }
    catch(err){
        resMsg = err.message
    }
    finally{
        return {resMsg,jsonData}
    }
}

export default Api