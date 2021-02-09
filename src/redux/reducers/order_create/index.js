
import React from 'react';
import { Platform} from 'react-native';
import {
   
ORDER_CREATE_FETCHING,
ORDER_CREATE_SUCCESS,
ORDER_CREATE_FAILURE,
ORDER_CREATE_CLEARDATA,

} from '../../types';

const initialState = {
    is_success: false,
    is_fetching: false,
    error: false,
    msg: "",
}

export default function order_create(state = initialState, action) {

    switch(action.type) {
        case ORDER_CREATE_FETCHING:
            return {
                ...state,
                is_fetching: true,
                is_success: false,
                error: false,
            }
        case ORDER_CREATE_SUCCESS:
            return {
                ...state,
                is_fetching: false,
                is_success: true,
                msg: action.payload
            }
        case ORDER_CREATE_FAILURE:
            return {
                ...state,
                is_fetching: false,
                is_success: false,
                error: true,
                msg: action.payload
            }
        case ORDER_CREATE_CLEARDATA:
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