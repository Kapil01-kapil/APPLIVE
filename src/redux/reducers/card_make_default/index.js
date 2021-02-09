
import React from 'react';
import { Platform} from 'react-native';
import {
    MAKE_CARD_DEFAULT_FETCHING,
    MAKE_CARD_DEFAULT_SUCCESS,
    MAKE_CARD_DEFAULT_FAILURE,
    MAKE_CARD_DEFAULT_CLEARDATA,

} from '../../types';

const initialState = {
    is_success: false,
    is_fetching: false,
    make_card_default_data: [], 
    error: false,
    msg: "",
}

export default function make_card_default(state = initialState, action) {

    switch(action.type) {
        case MAKE_CARD_DEFAULT_FETCHING:
            return {
                ...state,
                is_fetching: true,
                is_success: false,
                error: false,
            }
        case MAKE_CARD_DEFAULT_SUCCESS:
            return {
                ...state,
                is_fetching: false,
                is_success: true,
                msg: action.payload
            }
        case MAKE_CARD_DEFAULT_FAILURE:
            return {
                ...state,
                is_fetching: false,
                is_success: false,
                error: true,
                msg: action.payload
            }
        case MAKE_CARD_DEFAULT_CLEARDATA:
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