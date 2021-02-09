
import React from 'react';
import { Platform} from 'react-native';
import {
    GET_FAQ_FETCHING,
    GET_FAQ_SUCCESS,
    GET_FAQ_FAILURE,
    GET_FAQ_CLEARDATA,

} from '../../types';

const initialState = {
    is_success: false,
    is_fetching: false,
    get_faq_data: [],
    error: false,
    msg: "",
}

export default function get_faq(state = initialState, action) {

    switch(action.type) {
        case GET_FAQ_FETCHING:
            return {
                ...state,
                is_fetching: true,
                is_success: false,
                error: false,
            }
        case GET_FAQ_SUCCESS:
            return {
                ...state,
                is_fetching: false,
                is_success: true,
                get_faq_data: action.payload
            }
        case GET_FAQ_FAILURE:
            return {
                ...state,
                is_fetching: false,
                is_success: false,
                error: true,
                msg: action.payload
            }
        case GET_FAQ_CLEARDATA:
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