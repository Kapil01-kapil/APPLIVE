import React from "react";
import { Platform } from "react-native";
import {
  RECURRING_FETCHING,
  RECURRING_SUCCESS,
  RECURRING_FAILURE,
  RECURRING_CLEARDATA,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const recurringService = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: RECURRING_FETCHING });

        axios
          .post(url.ORDER_DELETE, request_data)
          .then(function (response) {
            console.log("API RESPONSE *******", JSON.stringify(response));
            recurringService_success(dispatch, response);
            if (response.data.responseStatus == 1) {
              // update_user_token(dispatch, response.data.token)
              recurringService_success(dispatch, response.data.result);
            } else {
              // alert(response.data.msg)
              recurringService_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            recurringService_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        recurringService_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const recurringService_success = (dispatch, data) => {
  dispatch({ type: RECURRING_SUCCESS, payload: data });
};

const recurringService_failure = (dispatch, error) => {
  dispatch({ type: RECURRING_FAILURE, payload: error });
};

export const recurringService_clear_data = () => {
  return (dispatch) => {
    dispatch({
      type: RECURRING_CLEARDATA,
      payload: "",
    });
  };
};
