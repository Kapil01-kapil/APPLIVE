import React from 'react';
import { Platform} from 'react-native';
import {
    UPDATE_USER_PROFILE_FETCHING,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAILURE,

} from '../../types';

const initialState = {
    is_success: false,
    update_profile_data: [],
    is_fetching: false,
    error: false
}

export default function update_user_profile(state = initialState, action) {

    switch(action.type) {
        case UPDATE_USER_PROFILE_FETCHING:
            return {
                ...state,
                is_fetching: true,
                is_success: false,
                error: false,
            }
        case UPDATE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                is_fetching: false,
                is_success: true,
                update_profile_data: action.payload
            }
        case UPDATE_USER_PROFILE_FAILURE:
            return {
                ...state,
                is_fetching: false,
                is_success: false,
                error: true
            }

        default:
            return state
    }

}