import React from 'react';
import { Platform} from 'react-native';
import {
    USER_LOGIN_FETCHING,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGIN_CLEARDATA,

} from '../../types';

const initialState = {
    is_success: false,
    login_data: [],
    is_fetching: false,
    error: false,
    msg: "",
}

export default function user_login(state = initialState, action) {

    switch(action.type) {
        case USER_LOGIN_FETCHING:
            return {
                ...state,
                is_fetching: true,
                is_success: false,
                error: false,
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                is_fetching: false,
                is_success: true,
                login_data: action.payload
            }
        case USER_LOGIN_FAILURE:
            return {
                ...state,
                is_fetching: false,
                is_success: false,
                error: true,
                msg: action.payload
            }
            case USER_LOGIN_CLEARDATA:
                return {
                    ...state,
                    error: false,
                    msg: ""
                }
            
        default:
            return state
    }
}