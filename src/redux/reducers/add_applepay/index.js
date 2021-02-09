
import React from 'react';
import { Platform} from 'react-native';
import {
    ADD_APPLE_FETCHING,
    ADD_APPLE_SUCCESS,
    ADD_APPLE_FAILURE,
    ADD_APPLE_CLEARDATA,

} from '../../types';

const initialState = {
    is_success: false,
    is_fetching: false,
    add_applepay_data: [],
    error: false,
    msg: "",
}

export default function add_applepay(state = initialState, action) {

    switch(action.type) {
        case ADD_APPLE_FETCHING:
            return {
                ...state,
                is_fetching: true,
                is_success: false,
                error: false,
            }
        case ADD_APPLE_SUCCESS:
            return {
                ...state,
                is_fetching: false,
                is_success: true,
                add_applepay_data: action.payload
            }
        case ADD_APPLE_FAILURE:
            return {
                ...state,
                is_fetching: false,
                is_success: false,
                error: true,
                msg: action.payload
            }
        case ADD_APPLE_CLEARDATA:
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