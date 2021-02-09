
import React from 'react';
import { Platform} from 'react-native';
import {
    ADD_VEHICLE_FETCHING,
    ADD_VEHICLE_SUCCESS,
    ADD_VEHICLE_FAILURE,
    ADD_VEHICLE_CLEARDATA,

} from '../../types';

const initialState = {
    is_success: false,
    is_fetching: false,
    added_vahecle: [],
    error: false,
    msg: "",
}

export default function add_vehicle(state = initialState, action) {

    switch(action.type) {
        case ADD_VEHICLE_FETCHING:
            return {
                ...state,
                is_fetching: true,
                is_success: false,
                error: false,
            }
        case ADD_VEHICLE_SUCCESS:
            return {
                ...state,
                is_fetching: false,
                is_success: true,
                added_vahecle: action.payload
            }
        case ADD_VEHICLE_FAILURE:
            return {
                ...state,
                is_fetching: false,
                is_success: false,
                error: true,
                msg: action.payload
            }
        case ADD_VEHICLE_CLEARDATA:
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