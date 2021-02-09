import { Text, Platform } from 'react-native';
import NetInfo from "@react-native-community/netinfo";


export const NO_NETWORK_CODE = -1
export const INTERNET_AVAIL_CODE = 200
export const RECORD_NOT_FOUND = 404
export const AUTH_EXPIRED_CODE = 401
export const REQUEST_TIMEOUT_CODE = 0


export const NO_NETWORK_MESSAGE = "Your device is not connected to internet."
export const INTERNET_AVAIL_MESSAGE = "Internet present"
export const REQUEST_TIMEOUT = "Request timed out"


// check if network connection is available or not
// this method returns a promise
export const checkNetwork = () => {
    console.warn('Checking network =====>');

    return NetInfo.fetch();
};


export const buildURLQuery = obj => {
    return Object.entries(obj)
        .map(pair => pair.map(encodeURIComponent).join('='))
        .join('&');
}

export const getFormData = object => {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object.key));
    return formData;
}
