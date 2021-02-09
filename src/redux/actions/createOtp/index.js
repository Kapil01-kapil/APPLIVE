import React from "react";
import { Platform } from "react-native";
import {
  CREATE_OTP_FETCHING,
  CREATE_OTP_SUCCESS,
  CREATE_OTP_FAILURE,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api/api_config";
import axios from "axios";

export const createOtp = (request_data) => {
  return (dispatch) => {
    console.log("request_data", request_data);
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: CREATE_OTP_FETCHING });

        axios
          .post(url.CREATE_OTP, request_data)
          .then(function (response) {
            console.log(
              "API RESPONSE createOtp",
              JSON.stringify(response.data)
            );

            if (response.data.responseStatus === 1) {
              console.log(
                "API RESPONSE  OTP createOtp",
                JSON.stringify(response.data)
              );
              createOtp_request_success(dispatch, response.data);
              // update_user_token(dispatch, response.data.token)
            } else {
              //alert(response.data.msg);
              createOtp_request_failure(dispatch, response.data.msg);
              // createOtp_request_failure(
              //   dispatch,
              //   "We apologize, a technical error has occurred."
              // );
              console.log(
                "API RESPONSE ERROR *******",
                JSON.stringify(response)
              );
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            createOtp_request_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        console.log("API RESPONSE *******", JSON.stringify(response));
        createOtp_request_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const createOtp_request_success = (dispatch, data) => {
  dispatch({
    type: CREATE_OTP_SUCCESS,
    payload: { data },
  });
};

const createOtp_request_failure = (dispatch, error) => {
  dispatch({ type: CREATE_OTP_FAILURE, payload: error });
};
