import React from "react";
import { Platform } from "react-native";
import {
  SAVE_NOT_MATCHED_FAILURE,
  SAVE_NOT_MATCHED_FETCHING,
  SAVE_NOT_MATCHED_SUCCESS,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api/api_config";
import axios from "axios";

export const saveNotMatched = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: SAVE_NOT_MATCHED_FETCHING });

        axios
          .post(url.SAVE_NOT_MATCHED, request_data)
          .then(function (response) {
            // console.log('API RESPONSE *******', JSON.stringify(response))

            if (response.data.responseStatus === 1) {
              saveNotMatched_request_success(dispatch, response.data);
              // update_user_token(dispatch, response.data.token)
            } else {
              alert(response.data.msg);
              saveNotMatched_request_failure(
                dispatch,
                "We apologize, a technical error has occurred."
              );
              console.log(
                "API RESPONSE ERROR ******* jai",
                JSON.stringify(response)
              );
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            saveNotMatched_request_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        console.log("API RESPONSE *******", JSON.stringify(response));
        saveNotMatched_request_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const saveNotMatched_request_success = (dispatch, data) => {
  dispatch({
    type: SAVE_NOT_MATCHED_SUCCESS,
    payload: { data },
  });
};

const saveNotMatched_request_failure = (dispatch, error) => {
  dispatch({ type: SAVE_NOT_MATCHED_FAILURE, payload: error });
};
