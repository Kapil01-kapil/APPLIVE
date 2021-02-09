
import React from 'react';
import { Platform } from 'react-native';
import {
    GET_PRICE_FETCHING,
    GET_PRICE_SUCCESS,
    GET_PRICE_FAILURE,
    GET_PRICE_CLEARDATA,


} from '../../types';
import { checkNetwork } from '../../../utils'
import { url } from '../../../api'
import axios from 'axios';

export const get_price = (request_data) => {
    return (dispatch) => {
        checkNetwork()
            .then(state => {
                if (state.isConnected == true) {
                    dispatch({ type: GET_PRICE_FETCHING });

                    axios.post(url.GET_PRICE, request_data)
                        .then(function (response) {
                            console.log('API RESPONSE *******', JSON.stringify(response))

                            if (response.data.responseStatus == 1) {
                                // update_user_token(dispatch, response.data.token)
                                get_price_request_success(dispatch, response.data.result);

                            } else {
                                // alert(response.data.msg)
                                get_price_request_failure(dispatch, response.data.msg)
                            }
                        })
                        .catch(function (error) {
                            console.log('API RESPONSE ERROR *******',
                                JSON.stringify(error));
                                get_price_request_failure(dispatch, 'We apologize, a technical error has occurred.')
                        });
                }
                else {
                    get_price_request_failure(dispatch, 'Your device is not connected to internet.')
                }
            })
    };
};


const get_price_request_success = (dispatch, data) => {
    dispatch({ type: GET_PRICE_SUCCESS, payload: data});
};

const get_price_request_failure = (dispatch, error) => {
    dispatch({ type: GET_PRICE_FAILURE, payload: error });
};


export const get_price_clear_data = () => {
    return (dispatch) => {
        dispatch({
            type: GET_PRICE_CLEARDATA,
            payload: ""
        });
    }

};
