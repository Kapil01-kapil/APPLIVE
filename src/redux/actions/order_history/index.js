import React from "react";
import { Platform } from "react-native";
import {
  ORDER_HISTORY_FETCHING,
  ORDER_HISTORY_SUCCESS,
  ORDER_HISTORY_FAILURE,
  ORDER_HISTORY_CLEARDATA,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const order_history = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        axios
          .post(url.ORDER_HISTORY, request_data)
          .then(function (response) {
            console.log("orderhistory", JSON.stringify(response));

            if (response.data.responseStatus == 1) {
              // update_user_token(dispatch, response.data.token)
              order_history_request_success(dispatch, response.data.orders);
            } else {
              // alert(response.data.msg)
              order_history_request_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            order_history_request_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        order_history_request_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const order_history_request_success = (dispatch, data) => {
  dispatch({ type: ORDER_HISTORY_SUCCESS, payload: data });
};

const order_history_request_failure = (dispatch, error) => {
  dispatch({ type: ORDER_HISTORY_FAILURE, payload: error });
};

export const order_history_clear_data = () => {
  return (dispatch) => {
    dispatch({
      type: ORDER_HISTORY_CLEARDATA,
      payload: "",
    });
  };
};
