import React from "react";
import { Platform } from "react-native";
import {
  ADD_PAYMENT_SUCCESS,
  ADD_PAYMENT_FAILURE,
  ADD_PAYMENT_CLEARDATA,
  ADD_PAYMENT_FETCHING,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const addPaymentMethod = (request_data) => {
  console.log("addPaymentMethod", JSON.stringify(request_data));
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: ADD_PAYMENT_FETCHING });

        axios
          .post(url.ADD_PAYMENT_METHOD, request_data)
          .then(function (response) {
            // console.log("API RESPONSE *******", JSON.stringify(response));

            if (response.data.responseStatus == 1) {
              // update_user_token(dispatch, response.data.token)
              addPaymentMethod_success(dispatch, response.data.result);
            } else {
              // alert(response.data.msg)
              addPaymentMethod_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            addPaymentMethod_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        addPaymentMethod_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const addPaymentMethod_success = (dispatch, data) => {
  dispatch({ type: ADD_PAYMENT_SUCCESS, payload: data });
};

const addPaymentMethod_failure = (dispatch, error) => {
  dispatch({ type: ADD_PAYMENT_FAILURE, payload: error });
};

export const addPaymentMethod_clear_data = () => {
  return (dispatch) => {
    dispatch({
      type: ADD_PAYMENT_CLEARDATA,
      payload: "",
    });
  };
};
