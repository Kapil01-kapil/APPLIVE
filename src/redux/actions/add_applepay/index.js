
import React from 'react';
import { Platform } from 'react-native';
import {
    ADD_APPLE_FETCHING,
    ADD_APPLE_SUCCESS,
    ADD_APPLE_FAILURE,
    ADD_APPLE_CLEARDATA,

} from '../../types';
import { checkNetwork } from '../../../utils'
import { url } from '../../../api'
import axios from 'axios';

export const add_applepay = (request_data) => {
    return (dispatch) => {
        checkNetwork()
            .then(state => {
                if (state.isConnected == true) {
                    dispatch({ type: ADD_APPLE_FETCHING });

                    axios.post(url.CHARGE_APPLE, request_data)
                        .then(function (response) {
                            console.log('API RESPONSE *******', JSON.stringify(response))

                            if (response.data.responseStatus == 1) {
                                // update_user_token(dispatch, response.data.token)
                                add_applepay_request_success(dispatch, response.data);

                            } else {
                                // alert(response.data.msg)
                                add_applepay_request_failure(dispatch, response.data.msg)
                            }
                        })
                        .catch(function (error) {
                            console.log('API RESPONSE ERROR *******',
                                JSON.stringify(error));
                                add_applepay_request_failure(dispatch, 'We apologize, a technical error has occurred.')
                        });
                }
                else {
                    add_applepay_request_failure(dispatch, 'Your device is not connected to internet.')
                }
            })
    };
};


const add_applepay_request_success = (dispatch, data) => {
    dispatch({ type: ADD_APPLE_SUCCESS, payload: data});
};

const add_applepay_request_failure = (dispatch, error) => {
    dispatch({ type: ADD_APPLE_FAILURE, payload: error });
};


export const add_applepay_clear_data = () => {
    return (dispatch) => {
        dispatch({
            type: ADD_APPLE_CLEARDATA,
            payload: ""
        });
    }

};