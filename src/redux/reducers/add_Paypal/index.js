
import React from 'react';
import { Platform} from 'react-native';
import {
    ADD_PAYPAL_FETCHING,
    ADD_PAYPAL_SUCCESS,
    ADD_PAYPAL_FAILURE,

} from '../../types';

const initialState = {
    is_success: false,
    is_fetching: false,
    add_paypal_data: [],
    error: false,
    msg: "",
}

export default function add_paypal(state = initialState, action) {

    switch(action.type) {
        case ADD_PAYPAL_FETCHING:
            return {
                ...state,
                is_fetching: true,
                is_success: false,
                error: false,
            }
        case ADD_PAYPAL_SUCCESS:
            return {
                ...state,
                is_fetching: false,
                is_success: true,
                add_paypal_data: action.payload
            }
        case ADD_PAYPAL_FAILURE:
            return {
                ...state,
                is_fetching: false,
                is_success: false,
                error: true,
                msg: action.payload
            }
            
        default:
            return state
    }
}