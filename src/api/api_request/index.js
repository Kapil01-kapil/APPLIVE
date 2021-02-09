import axios from 'axios';
export async function make_axios_request(url, method, headers, dataParams) {
    requestPayload=
    {
     url:url,
     method:method,
     headers:headers,
     request:dataParams 
    } 
    return dataParams ? axios({
        method: method,
        url: url,
        data: dataParams,
        headers: headers,
        timeout: 180000,
    }) : axios({
        method: method,
        url: url,
        headers: headers,
        data: null,
        timeout: 180000,
    })

}