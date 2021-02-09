
import React from 'react';
import { Platform } from 'react-native';
import {
    MAKE_CARD_DEFAULT_FETCHING,
    MAKE_CARD_DEFAULT_SUCCESS,
    MAKE_CARD_DEFAULT_FAILURE,
    MAKE_CARD_DEFAULT_CLEARDATA,

} from '../../types';
import { checkNetwork } from '../../../utils'
import { url } from '../../../api'
import axios from 'axios';

export const make_card_default = (request_data) => {
    return (dispatch) => {
        checkNetwork()
            .then(state => {
                if (state.isConnected == true) {
                    dispatch({ type: MAKE_CARD_DEFAULT_FETCHING });

                    axios.post(url.CARD_MAKE_DEFAULT, request_data)
                        .then(function (response) {
                            console.log('API RESPONSE *******', JSON.stringify(response))

                            if (response.data.responseStatus == 1) {
                                // update_user_token(dispatch, response.data.token)
                                make_card_default_request_success(dispatch, response.data.msg);

                            } else {
                                // alert(response.data.msg)
                                make_card_default_request_failure(dispatch, response.data.msg)
                            }
                        })
                        .catch(function (error) {
                            console.log('API RESPONSE ERROR *******',
                                JSON.stringify(error));
                                make_card_default_request_failure(dispatch, 'We apologize, a technical error has occurred.')
                        });
                }
                else {
                    make_card_default_request_failure(dispatch, 'Your device is not connected to internet.')
                }
            })
    };
};


const make_card_default_request_success = (dispatch, data) => {
    dispatch({ type: MAKE_CARD_DEFAULT_SUCCESS, payload: data});
};

const make_card_default_request_failure = (dispatch, error) => {
    dispatch({ type: MAKE_CARD_DEFAULT_FAILURE, payload: error });
};


export const make_card_default_clear_data = () => {
    return (dispatch) => {
        dispatch({
            type: MAKE_CARD_DEFAULT_CLEARDATA,
            payload: ""
        });
    }

};