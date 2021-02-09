import React from "react";
import { Platform } from "react-native";
import {
  DELETE_PAYMENT_FETCHING,
  DELETE_PAYMENT_SUCCESS,
  DELETE_PAYMENT_FAILURE,
  DELETE_PAYMENT_CLEARDATA,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const payment_delete = (request_data) => {
  return (dispatch) => {
    console.log("request_datapayment", request_data);
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: DELETE_PAYMENT_FETCHING });

        axios
          .post(url.DELETE_PAYMENT, request_data)
          .then(function (response) {
            console.log("API RESPONSE delete_pament", JSON.stringify(response));

            if (response.data.responseStatus == 1) {
              // update_user_token(dispatch, response.data.token)
              payment_delete_success(dispatch, response.data.result);
            } else {
              // alert(response.data.msg)
              payment_delete_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            payment_delete_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        payment_delete_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const payment_delete_success = (dispatch, data) => {
  dispatch({ type: DELETE_PAYMENT_SUCCESS, payload: data });
};

const payment_delete_failure = (dispatch, error) => {
  dispatch({ type: DELETE_PAYMENT_FAILURE, payload: error });
};

export const payment_delete_clear_data = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_PAYMENT_CLEARDATA,
      payload: "",
    });
  };
};
