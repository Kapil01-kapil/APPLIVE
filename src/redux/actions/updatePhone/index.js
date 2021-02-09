import React from "react";
import { Platform } from "react-native";
import {
  UPDATE_PHONE_FETCHING,
  UPDATE_PHONE_SUCCESS,
  UPDATE_PHONE_FAILURE,
  UPDATE_PHONE_CLEARDATA,
  USER_AUTH,
  USER_DATA,
  USER_LOGIN_CLEARDATA,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const updatePhone = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: UPDATE_PHONE_FETCHING });

        axios
          .post(url.UPDATE_PHONE, request_data)
          .then(function (response) {
            console.log("API RESPONSE *******", JSON.stringify(response));

            if (response.data.responseStatus == 1) {
              // update_user_token(dispatch, response.data.token)
              console.log(
                "response.data.result*******",
                JSON.stringify(response.data.result)
              );
              console.log("request_data ", JSON.stringify(request_data));

              update_user_token(dispatch, response.data.result.user_token);
              updatePhone_request_success(dispatch, response.data.result);
            } else {
              // alert(response.data.msg)
              updatePhone_request_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log("request_data ", JSON.stringify(request_data));

            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            updatePhone_request_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        updatePhone_request_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const updatePhone_request_success = (dispatch, data) => {
  dispatch({
    type: USER_DATA,
    payload: { data },
  });
  dispatch({
    type: UPDATE_PHONE_SUCCESS,
    payload: { data },
  });
};

const updatePhone_request_failure = (dispatch, error) => {
  dispatch({ type: UPDATE_PHONE_FAILURE, payload: error });
};

const update_user_token = (dispatch, data) => {
  dispatch({ type: USER_AUTH, payload: data });
};

export const updatePhone_clear_data = () => {
  console.log("<= hello =>");
  return (dispatch) => {
    dispatch({
      type: UPDATE_PHONE_CLEARDATA,
      payload: "",
    });
  };
};
