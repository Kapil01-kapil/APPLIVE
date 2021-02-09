
import React from 'react';
import { Platform} from 'react-native';
import {
    CARD_LIST_FETCHING,
    CARD_LIST_SUCCESS,
    CARD_LIST_FAILURE,
    CARD_LIST_CLEARDATA,

} from '../../types';

const initialState = {
    is_success: false,
    is_fetching: false,
    card_list_data: [],
    error: false,
    msg: "",
}

export default function card_list(state = initialState, action) {

    switch(action.type) {
        case CARD_LIST_FETCHING:
            return {
                ...state,
                is_fetching: true,
                is_success: false,
                error: false,
            }
        case CARD_LIST_SUCCESS:
            return {
                ...state,
                is_fetching: false,
                is_success: true,
                card_list_data: action.payload
            }
        case CARD_LIST_FAILURE:
            return {
                ...state,
                is_fetching: false,
                is_success: false,
                error: true,
                msg: action.payload
            }
        case CARD_LIST_CLEARDATA:
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