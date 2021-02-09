
import React from 'react';
import { Platform} from 'react-native';
import {
   
ORDER_HISTORY_FETCHING,
ORDER_HISTORY_SUCCESS,
ORDER_HISTORY_FAILURE,
ORDER_HISTORY_CLEARDATA,

} from '../../types';

const initialState = {
    is_success: false,
    is_fetching: false,
    error: false,
    order_history_data: [],
    msg: "",
}

export default function order_history(state = initialState, action) {

    switch(action.type) {
        case ORDER_HISTORY_FETCHING:
            return {
                ...state,
                is_fetching: true,
                is_success: false,
                error: false,
            }
        case ORDER_HISTORY_SUCCESS:
            return {
                ...state,
                is_fetching: false,
                is_success: true,
                order_history_data: action.payload,
            }
        case ORDER_HISTORY_FAILURE:
            return {
                ...state,
                is_fetching: false,
                is_success: false,
                error: true,
                msg: action.payload
            }
        case ORDER_HISTORY_CLEARDATA:
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