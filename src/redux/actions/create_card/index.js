
import React from 'react';
import { Platform } from 'react-native';
import {
    CREATE_CARD_FETCHING,
    CREATE_CARD_SUCCESS,
    CREATE_CARD_FAILURE,
    CREATE_CARD_CLEARDATA,

} from '../../types';
import { checkNetwork } from '../../../utils'
import { url } from '../../../api'
import axios from 'axios';

export const create_card = (request_data) => {
    return (dispatch) => {
        checkNetwork()
            .then(state => {
                if (state.isConnected == true) {
                    dispatch({ type: CREATE_CARD_FETCHING });

                    axios.post(url.CREATE_CARD, request_data)
                        .then(function (response) {
                            console.log('API RESPONSE *******', JSON.stringify(response))

                            if (response.data.responseStatus == 1) {
                                // update_user_token(dispatch, response.data.token)
                                create_card_request_success(dispatch, response.data.card_token);

                            } else {
                                // alert(response.data.msg)
                                create_card_request_failure(dispatch, response.data.msg)
                            }
                        })
                        .catch(function (error) {
                            console.log('API RESPONSE ERROR *******',
                                JSON.stringify(error));
                                create_card_request_failure(dispatch, 'We apologize, a technical error has occurred.')
                        });
                }
                else {
                    create_card_request_failure(dispatch, 'Your device is not connected to internet.')
                }
            })
    };
};


const create_card_request_success = (dispatch, data) => {
    dispatch({ type: CREATE_CARD_SUCCESS, payload: data});
};

const create_card_request_failure = (dispatch, error) => {
    dispatch({ type: CREATE_CARD_FAILURE, payload: error });
};


export const create_card_clear_data = () => {
    return (dispatch) => {
        dispatch({
            type: CREATE_CARD_CLEARDATA,
            payload: ""
        });
    }

};