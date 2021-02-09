import React from "react";
import { Platform } from "react-native";
import {
  CANCEL_SUBSCRIBE_FETCHING,
  CANCEL_SUBSCRIBE_SUCCESS,
  CANCEL_SUBSCRIBE_FAILURE,
  CANCEL_SUBSCRIBE_CLEARDATA,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const cancel_membership = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: CANCEL_SUBSCRIBE_FETCHING });

        axios
          .post(url.CANCEL_SUBSCRIBE, request_data)
          .then(function (response) {
            console.log(
              "API RESPONSE cancel_membership *******",
              JSON.stringify(response)
            );

            if (response.data.responseStatus == 1) {
              // update_user_token(dispatch, response.data.token)
              cancle_membership_success(dispatch, response.data.result);
            } else {
              // alert(response.data.msg)
              cancle_membership_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            cancle_membership_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        cancle_membership_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const cancle_membership_success = (dispatch, data) => {
  dispatch({ type: CANCEL_SUBSCRIBE_SUCCESS, payload: data });
};

const cancle_membership_failure = (dispatch, error) => {
  dispatch({ type: CANCEL_SUBSCRIBE_FAILURE, payload: error });
};

export const cancle_membership_clear_data = () => {
  return (dispatch) => {
    dispatch({
      type: CANCEL_SUBSCRIBE_CLEARDATA,
      payload: "",
    });
  };
};
