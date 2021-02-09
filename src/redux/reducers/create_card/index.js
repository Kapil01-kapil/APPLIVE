
import React from 'react';
import { Platform} from 'react-native';
import {
    CREATE_CARD_FETCHING,
    CREATE_CARD_SUCCESS,
    CREATE_CARD_FAILURE,
    CREATE_CARD_CLEARDATA,

} from '../../types';

const initialState = {
    is_success: false,
    is_fetching: false,
    create_card_data: [], 
    error: false, 
    msg: "",
}

export default function create_card(state = initialState, action) {

    switch(action.type) {
        case CREATE_CARD_FETCHING:
            return {
                ...state,
                is_fetching: true,
                is_success: false,
                error: false,
            }
        case CREATE_CARD_SUCCESS:
            return {
                ...state,
                is_fetching: false,
                is_success: true,
                create_card_data: action.payload
            }
        case CREATE_CARD_FAILURE:
            return {
                ...state,
                is_fetching: false,
                is_success: false,
                error: true,
                msg: action.payload
            }
        case CREATE_CARD_CLEARDATA:
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