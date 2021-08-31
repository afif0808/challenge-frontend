const baseURL = "http://localhost:8080/provinces/"

async function getProvinceList() {
    const resp = await fetch(baseURL, { method: "GET" })
    
    if (resp.ok == false) {
        throw new Error("error occured")
    }

    return await resp.json()
}


async function createProvince(province) {
    const req = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(province)
    }
    const resp = await fetch(baseURL, req)
    if (resp.ok == false) {
        throw new Error("error occured")
    }

    return await resp.json()
}

export {getProvinceList,createProvince}



