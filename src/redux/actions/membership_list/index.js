import React from "react";
import { Platform } from "react-native";
import {
  MEMBERSHIP_LIST_FETCHING,
  MEMBERSHIP_LIST_SUCCESS,
  MEMBERSHIPS_LIST_SUCCESS,
  MEMBERSHIP_LIST_FAILURE,
  MEMBERSHIP_LIST_CLEARDATA,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const membership_list = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: MEMBERSHIP_LIST_FETCHING });

        axios
          .post(url.MEMBERSHIP_LIST, request_data)
          .then(function (response) {
            console.log("API RESPONSE *******", JSON.stringify(response));

            if (response.data.responseStatus == 1) {
              // update_user_token(dispatch, response.data.token)
              membership_list_request_success(dispatch, response.data);
              memberships_list_request_success(dispatch, response.data.data);
            } else {
              // alert(response.data.msg)
              membership_list_request_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            membership_list_request_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        membership_list_request_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const membership_list_request_success = (dispatch, data) => {
  dispatch({ type: MEMBERSHIP_LIST_SUCCESS, payload: data });
};
const memberships_list_request_success = (dispatch, data) => {
  dispatch({ type: MEMBERSHIPS_LIST_SUCCESS, payload: data });
};

const membership_list_request_failure = (dispatch, error) => {
  dispatch({ type: MEMBERSHIP_LIST_FAILURE, payload: error });
};

export const membership_list_clear_data = () => {
  return (dispatch) => {
    dispatch({
      type: MEMBERSHIP_LIST_CLEARDATA,
      payload: "",
    });
  };
};
