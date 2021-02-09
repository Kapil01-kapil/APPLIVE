import React from "react";
import { Platform } from "react-native";
import {
  UPDATE_USER_PROFILE_FETCHING,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api/api_config";
import axios from "axios";

export const update_user_profile = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: UPDATE_USER_PROFILE_FETCHING });

        axios
          .post(url.UPDATE_USER_PROFILE, request_data)
          .then(function (response) {
            console.log("API RESPONSE *******", JSON.stringify(response));

            if (response.data.responseStatus == true) {
              register_request_success(dispatch, response.data.result);
              // update_user_token(dispatch, response.data.token)
            } else {
              alert(response.data.msg);
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

const register_request_success = (dispatch, data) => {
  dispatch({
    type: UPDATE_USER_PROFILE_SUCCESS,
    payload: { data },
  });
};

const register_request_failure = (dispatch, error) => {
  dispatch({ type: UPDATE_USER_PROFILE_FAILURE, payload: error });
};
