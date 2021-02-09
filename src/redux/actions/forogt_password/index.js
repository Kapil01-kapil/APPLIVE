import React from "react";
import { Platform } from "react-native";
import {
  FORGOT_PASSWORD_FETCHING,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api/api_config";
import axios from "axios";

export const forgot_password = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: FORGOT_PASSWORD_FETCHING });

        axios
          .post(url.FORGOT_PASSWORD, request_data)
          .then(function (response) {
            console.log(
              "API RESPONSE forgot_password",
              JSON.stringify(response.data)
            );

            if (response.data.responseStatus === 1) {
              forgot_request_success(dispatch, response.data);
              // update_user_token(dispatch, response.data.token)
            } else {
              alert(response.data.msg);
              forgot_request_failure(
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
            forgot_request_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        console.log("API RESPONSE *******", JSON.stringify(response));
        forgot_request_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const forgot_request_success = (dispatch, data) => {
  dispatch({
    type: FORGOT_PASSWORD_SUCCESS,
    payload: { data },
  });
};

const forgot_request_failure = (dispatch, error) => {
  dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error });
};
