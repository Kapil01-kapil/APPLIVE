import React from "react";
import { Platform } from "react-native";
import {
  SCHEDULE_FETCHING,
  SCHEDULE_SUCCESS,
  SCHEDULE_FAILURE,
  SCHEDULE_CLEARDATA,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const schedule = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: SCHEDULE_FETCHING });

        axios
          .post(url.ADD_VEHICLE, request_data)
          .then(function (response) {
            // console.log("API RESPONSE *******", JSON.stringify(response));

            if (response.data.responseStatus == 1) {
              // update_user_token(dispatch, response.data.token)
              schedule_success(dispatch, response.data.result);
            } else {
              // alert(response.data.msg)
              schedulet_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            schedule_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        add_request_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const schedule_success = (dispatch, data) => {
  dispatch({ type: SCHEDULE_SUCCESS, payload: data });
};

const schedule_failure = (dispatch, error) => {
  dispatch({ type: SCHEDULE_FAILURE, payload: error });
};

export const schedule_clear_data = () => {
  return (dispatch) => {
    dispatch({
      type: SCHEDULE_CLEARDATA,
      payload: "",
    });
  };
};
