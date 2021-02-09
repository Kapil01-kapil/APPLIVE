
import React from 'react';
import { Platform } from 'react-native';
import {
     ADD_PAYPAL_FETCHING,
    ADD_PAYPAL_SUCCESS,
    ADD_PAYPAL_FAILURE,

} from '../../types';
import { checkNetwork } from '../../../utils'
import { paypalurl ,options } from '../../../api'
import axios from 'axios';
export const add_paypal = (dataDetail) => {
    return (dispatch) => {
        checkNetwork()
            .then(state => {
                if (state.isConnected == true) {
                    dispatch({ type: ADD_PAYPAL_FETCHING });
            fetch(paypalurl.tokengenerate, options)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            fetch(paypalurl.paymentgetpage, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${responseJson.access_token}`,
                    },
                    body: JSON.stringify(dataDetail),
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson);

                        const { id, links } = responseJson;
                        const approvalUrl = links.find(
                        (data) => data.rel == "approval_url"
                        );
                        add_paypal_request_success(dispatch, approvalUrl.href);
                        // this.setState({
                        // paymentId: id,
                        // approvalUrl: approvalUrl.href,
                        // });
                    })
                    .catch((err) => {
                        console.log({ ...err });
                    });
                })
                .catch((err) => {
                    console.log({ ...err });
                });

                //     axios.post(paypalurl.tokengenerate, request_data)
                //         .then(function (response) {
                //             console.log('API RESPONSE *******', JSON.stringify(response))

                //             if (response.data.responseStatus == 1) {
                //                 // update_user_token(dispatch, response.data.token)
                //                 add_paypal_request_success(dispatch, response.data.result);

                //             } else {
                //                 // alert(response.data.msg)
                //                 add_paypal_request_failure(dispatch, response.data.msg)
                //             }
                //         })
                //         .catch(function (error) {
                //             console.log('API RESPONSE ERROR *******',
                //                 JSON.stringify(error));
                //                 add_paypal_request_failure(dispatch, 'We apologize, a technical error has occurred.')
                //         });
                // }

            
            }
            
                else {
                    add_paypal_request_failure(dispatch, 'Your device is not connected to internet.')
                 }
             })
    };
};


const add_paypal_request_success = (dispatch, data) => {
    dispatch({ type: ADD_PAYPAL_SUCCESS, payload: data});
};

const add_paypal_request_failure = (dispatch, error) => {
    dispatch({ type: ADD_PAYPAL_FAILURE, payload: error });
};