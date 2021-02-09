import React from "react";
import { Platform } from "react-native";
import {
  SERVICELOCATIONSERVICE_FAILURE,
  SERVICELOCATIONSERVICE_FETCHING,
  SERVICELOCATIONSERVICE_SUCCESS,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api/api_config";
import axios from "axios";

export const ServiceLocationService = (request_data) => {
  console.log("ServiceLocationService", request_data);
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: SERVICELOCATIONSERVICE_FETCHING });

        axios
          .post(url.SERVICELOCATIONSERVICE, request_data)
          .then(function (response) {
            // console.log('API RESPONSE *******', JSON.stringify(response))

            if (response.data.responseStatus === 1) {
              serviceLocationService_request_success(dispatch, response.data);
              // update_user_token(dispatch, response.data.token)
            } else {
              alert(response.data.msg);
              serviceLocationService_request_failure(
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
            serviceLocationService_request_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        console.log("API RESPONSE *******", JSON.stringify(response));
        serviceLocationService_request_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const serviceLocationService_request_success = (dispatch, data) => {
  dispatch({
    type: SERVICELOCATIONSERVICE_SUCCESS,
    payload: { data },
  });
};

const serviceLocationService_request_failure = (dispatch, error) => {
  dispatch({ type: SERVICELOCATIONSERVICE_FAILURE, payload: error });
};
