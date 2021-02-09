import React from 'react';
import { Platform} from 'react-native';
import {
    USER_AUTH,
    USER_DATA,
    USER_CLEAR_DATA,

} from '../../types';

const initialState = {
    user_data: {},
    user_auth_token: ''
}

export default function user_auth(state = initialState, action) {

    switch(action.type) {
        case USER_AUTH:
            console.log("Data => " + JSON.stringify(action.payload))
            return {
                ...state,
                user_auth_token: action.payload,
            }
        case USER_DATA:
            console.log("Data => " + JSON.stringify(action.payload))
            return {
                ...state,
                user_data: action.payload,
            }
        case USER_CLEAR_DATA:
            return {
                ...state,
                user_data: {},
                user_auth_token: ''
            }

        default:
            return state
    }

}