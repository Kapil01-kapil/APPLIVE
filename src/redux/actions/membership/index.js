import React from "react";
import { Platform } from "react-native";
import {
  SUBSCRIBE_FETCHING,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_FAILURE,
  SUBSCRIBE_CLEARDATA,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const membership = (request_data) => {
  console.log("request_data_membership", request_data);
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: SUBSCRIBE_FETCHING });

        axios
          .post(url.SUBSCRIBE, request_data)
          .then(function (response) {
            console.log("membership *******", JSON.stringify(response));

            if (response.data.responseStatus == 1) {
              // update_user_token(dispatch, response.data.token)
              membership_success(dispatch, response.data.result);
            } else {
              // alert(response.data.msg)
              membership_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            membership_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        membership_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const membership_success = (dispatch, data) => {
  dispatch({ type: SUBSCRIBE_SUCCESS, payload: data });
};

constmembership_failure = (dispatch, error) => {
  dispatch({ type: SUBSCRIBE_FAILURE, payload: error });
};

export const membership_clear_data = () => {
  return (dispatch) => {
    dispatch({
      type: SUBSCRIBE_CLEARDATA,
      payload: "",
    });
  };
};
