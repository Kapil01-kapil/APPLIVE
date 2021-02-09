import React from "react";
import { Platform } from "react-native";
import {
  ADD_VEHICLE_FETCHING,
  ADD_VEHICLE_SUCCESS,
  ADD_VEHICLE_FAILURE,
  ADD_VEHICLE_CLEARDATA,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const add_vehicle = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: ADD_VEHICLE_FETCHING });

        axios
          .post(url.ADD_VEHICLE, request_data)
          .then(function (response) {
            // console.log("API RESPONSE *******", JSON.stringify(response));

            if (response.data.responseStatus == 1) {
              // update_user_token(dispatch, response.data.token)
              add_request_success(dispatch, response.data.result);
            } else {
              // alert(response.data.msg)
              add_request_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            add_request_failure(
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

const add_request_success = (dispatch, data) => {
  dispatch({ type: ADD_VEHICLE_SUCCESS, payload: data });
};

const add_request_failure = (dispatch, error) => {
  dispatch({ type: ADD_VEHICLE_FAILURE, payload: error });
};

export const add_vehicle_clear_data = () => {
  return (dispatch) => {
    dispatch({
      type: ADD_VEHICLE_CLEARDATA,
      payload: "",
    });
  };
};
