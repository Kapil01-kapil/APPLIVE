import React from "react";
import { Platform } from "react-native";
import {
  USER_LOGIN_FETCHING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_AUTH,
  USER_DATA,
  USER_LOGIN_CLEARDATA,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const login_user = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: USER_LOGIN_FETCHING });

        axios
          .post(url.USER_LOGIN, request_data)
          .then(function (response) {
            console.log("API RESPONSE *******", JSON.stringify(response));

            if (response.data.responseStatus == 1) {
              update_user_token(dispatch, response.data.result.user_token);
              login_request_success(dispatch, response.data.result);
            } else {
              // alert(response.data.msg)
              login_request_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            login_request_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        login_request_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const login_request_success = (dispatch, data) => {
  dispatch({
    type: USER_DATA,
    payload: { data },
  });
  dispatch({
    type: USER_LOGIN_SUCCESS,
    payload: { data },
  });
};

const login_request_failure = (dispatch, error) => {
  dispatch({ type: USER_LOGIN_FAILURE, payload: error });
};

const update_user_token = (dispatch, data) => {
  dispatch({ type: USER_AUTH, payload: data });
};

export const user_login_clear_data = () => {
  console.log("<= hello =>");
  return (dispatch) => {
    dispatch({
      type: USER_LOGIN_CLEARDATA,
      payload: "",
    });
  };
};
