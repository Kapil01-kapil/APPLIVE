
import React from 'react';
import { Platform} from 'react-native';
import {
    VEHICLE_DROPDOWN_FETCHING,
    VEHICLE_DROPDOWN_SUCCESS,
    VEHICLE_DROPDOWN_FAILURE 
} from '../../types';

const initialState = {
    is_success: false,
    vehicle_dropdown_data: [],
    is_fetching: false,
    error: false,
    msg: "",
}

export default function vehicle_dropdown(state = initialState, action) {

    switch(action.type) {
        case VEHICLE_DROPDOWN_FETCHING:
            return {
                ...state,
                is_fetching: true,
                is_success: false,
                error: false,
            }
        case VEHICLE_DROPDOWN_SUCCESS:
            return {
                ...state,
                is_fetching: false,
                is_success: true,
                vehicle_dropdown_data: action.payload
            }
        case VEHICLE_DROPDOWN_FAILURE:
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