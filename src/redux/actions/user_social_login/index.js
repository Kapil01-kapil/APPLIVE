import React from "react";
import { Platform } from "react-native";
import {
  USER_SOCIAL_LOGIN_FETCHING,
  USER_SOCIAL_LOGIN_SUCCESS,
  USER_SOCIAL_LOGIN_FAILURE,
  USER_SOCIAL_LOGIN_CLEARDATA,
  USER_AUTH,
  USER_DATA,
  USER_LOGIN_CLEARDATA,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const user_social_login = (request_data) => {
  console.log("kapiluser_social_login", JSON.stringify(request_data));
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: USER_SOCIAL_LOGIN_FETCHING });

        axios
          .post(url.USER_SOCIAL_LOGIN, request_data)
          .then(function (response) {
            console.log(
              "API RESPONSEUSER_SOCIAL_LOGIN *******",
              JSON.stringify(response.data)
            );

            if (response.data.responseStatus == 1) {
              // update_user_token(dispatch, response.data.token)
              console.log(
                "response.data.result*******",
                JSON.stringify(response.data.result)
              );
              console.log("request_data ", JSON.stringify(request_data));

              update_user_token(dispatch, response.data.result.user_token);
              login_request_success(dispatch, response.data.result);
            } else {
              // alert(response.data.msg)
              login_request_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log("request_data ", JSON.stringify(request_data));

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
    type: USER_SOCIAL_LOGIN_SUCCESS,
    payload: { data },
  });
};

const login_request_failure = (dispatch, error) => {
  dispatch({ type: USER_SOCIAL_LOGIN_FAILURE, payload: error });
};

const update_user_token = (dispatch, data) => {
  dispatch({ type: USER_AUTH, payload: data });
};

export const user_social_login_clear_data = () => {
  console.log("<= hello =>");
  return (dispatch) => {
    dispatch({
      type: USER_SOCIAL_LOGIN_CLEARDATA,
      payload: "",
    });
  };
};
