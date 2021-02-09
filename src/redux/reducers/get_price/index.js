
import React from 'react';
import { Platform} from 'react-native';
import {
    GET_PRICE_FETCHING,
    GET_PRICE_SUCCESS,
    GET_PRICE_FAILURE,
    GET_PRICE_CLEARDATA,

} from '../../types';

const initialState = {
    is_success: false,
    is_fetching: false,
    get_price_data: [],
    error: false,
    msg: "",
}

export default function get_price(state = initialState, action) {

    switch(action.type) {
        case GET_PRICE_FETCHING:
            return {
                ...state,
                is_fetching: true,
                is_success: false,
                error: false,
            }
        case GET_PRICE_SUCCESS:
            return {
                ...state,
                is_fetching: false,
                is_success: true,
                get_price_data: action.payload
            }
        case GET_PRICE_FAILURE:
            return {
                ...state,
                is_fetching: false,
                is_success: false,
                error: true,
                msg: action.payload
            }
        case GET_PRICE_CLEARDATA:
            return {
                ...state,
                is_success: false,
                error: false,
                msg: ""
            }
            
        default:
            return state
    }
}