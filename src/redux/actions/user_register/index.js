import React from "react";
import { Platform } from "react-native";
import {
  USER_REGISTER_FETCHING,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_AUTH,
  USER_DATA,
  USER_CLEAR_DATA,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api/api_config";
import axios from "axios";

export const register_user = (request_data) => {
  return (dispatch) => {
    console.log("register_user", request_data);
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: USER_REGISTER_FETCHING });

        axios
          .post(url.USER_REGISTER, request_data)
          .then(function (response) {
            console.log("API RESPONSE *******", JSON.stringify(response.data));

            if (response.data.responseStatus == 1) {
              update_user_token(dispatch, response.data.result.user_token);
              register_request_success(dispatch, response.data.result);
              // update_user_token(dispatch, response.data.token)
            } else {
              // alert(response.data.msg);
              register_request_failure(dispatch, response.data.msg);
              register_request_failure(
                dispatch,
                "We apologize, a technical error has occurred."
              );
              console.log(
                "API RESPONSE ERROR *******",
                JSON.stringify(response)
              );
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            register_request_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        console.log("API RESPONSE *******", JSON.stringify(response));
        register_request_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

export const create_stripe_account = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        axios
          .post(url.ORDER_STRIPE_PROFILE, request_data)
          .then(function (response) {
            if (response.data.responseStatus == true) {
              console.log(
                "API RESPONSE *******",
                JSON.stringify(response.data.msg)
              );
            } else {
              console.log(
                "API RESPONSE ERROR *******",
                JSON.stringify(response)
              );
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
          });
      } else {
        console.log("API RESPONSE *******", JSON.stringify(response));
      }
    });
  };
};

const register_request_success = (dispatch, data) => {
  dispatch({
    type: USER_DATA,
    payload: { data },
  });
  dispatch({
    type: USER_REGISTER_SUCCESS,
    payload: { data },
  });
};

const register_request_failure = (dispatch, error) => {
  dispatch({ type: USER_REGISTER_FAILURE, payload: error });
};

const update_user_token = (dispatch, data) => {
  dispatch({ type: USER_AUTH, payload: data });
};

export const user_data_clear_data = () => {
  return (dispatch) => {
    dispatch({
      type: USER_CLEAR_DATA,
      payload: "",
    });
  };
};
