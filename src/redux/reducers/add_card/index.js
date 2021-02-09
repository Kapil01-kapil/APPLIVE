
import React from 'react';
import { Platform} from 'react-native';
import {
    ADD_CARD_FETCHING,
    ADD_CARD_SUCCESS,
    ADD_CARD_FAILURE,
    ADD_CARD_CLEARDATA,

} from '../../types';

const initialState = {
    is_success: false,
    is_fetching: false,
    add_card_data: [],
    error: false,
    msg: "",
}

export default function add_card(state = initialState, action) {

    switch(action.type) {
        case ADD_CARD_FETCHING:
            return {
                ...state,
                is_fetching: true,
                is_success: false,
                error: false,
            }
        case ADD_CARD_SUCCESS:
            return {
                ...state,
                is_fetching: false,
                is_success: true,
                add_card_data: action.payload
            }
        case ADD_CARD_FAILURE:
            return {
                ...state,
                is_fetching: false,
                is_success: false,
                error: true,
                msg: action.payload
            }
        case ADD_CARD_CLEARDATA:
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