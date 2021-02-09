
import React from 'react';
import { Platform} from 'react-native';
import {
    BOAT_DROPDOWN_FETCHING,
    BOAT_DROPDOWN_SUCCESS,
    BOAT_DROPDOWN_FAILURE,
} from '../../types';

const initialState = {
    is_success: false,
    boat_dropdown_data: [],
    is_fetching: false,
    error: false,
    msg: "",
}

export default function boat_dropdown(state = initialState, action) {

    switch(action.type) {
        case BOAT_DROPDOWN_FETCHING:
            return {
                ...state,
                is_fetching: true,
                is_success: false,
                error: false,
            }
        case BOAT_DROPDOWN_SUCCESS:
            return {
                ...state,
                is_fetching: false,
                is_success: true,
                boat_dropdown_data: action.payload
            }
        case BOAT_DROPDOWN_FAILURE:
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