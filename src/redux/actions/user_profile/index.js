import React from "react";
import { Platform } from "react-native";
import { USER_AUTH, USER_DATA, USER_CLEAR_DATA } from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api/api_config";
import axios from "axios";

export const user_profile = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        axios
          .post(url.USER_PROFILE, request_data)
          .then(function (response) {
            console.log("API RESPONSE *******", JSON.stringify(response));

            if (response.data.responseStatus == true) {
              user_request_success(dispatch, response.data.data);
              // update_user_token(dispatch, response.data.token)
            } else {
              alert(response.data.msg);
              user_request_failure(
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
            user_request_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        console.log("API RESPONSE *******", JSON.stringify(response));
        user_request_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const user_request_success = (dispatch, data) => {
  dispatch({
    type: USER_DATA,
    payload: { data },
  });
};

const update_user_token = (dispatch, data) => {
  dispatch({ type: USER_AUTH, payload: data });
};
