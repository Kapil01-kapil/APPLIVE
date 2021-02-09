import React from "react";
import { Platform } from "react-native";
import {
  ORDER_CREATE_FETCHING,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_CLEARDATA,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const order_create = (request_data) => {
  console.log("request_data_order_create", JSON.stringify(request_data));
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: ORDER_CREATE_FETCHING });

        axios
          .post(url.ORDER_CREATE, request_data)
          .then(function (response) {
            console.log("API RESPONSE *******", JSON.stringify(response));

            if (response.data.responseStatus == 1) {
              // update_user_token(dispatch, response.data.token)
              order_create_request_success(dispatch, response.data.msg);
            } else {
              // alert(response.data.msg)
              order_create_request_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            order_create_request_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        order_create_request_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const order_create_request_success = (dispatch, data) => {
  dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
};

const order_create_request_failure = (dispatch, error) => {
  dispatch({ type: ORDER_CREATE_FAILURE, payload: error });
};

export const order_create_clear_data = () => {
  return (dispatch) => {
    dispatch({
      type: ORDER_CREATE_CLEARDATA,
      payload: "",
    });
  };
};
