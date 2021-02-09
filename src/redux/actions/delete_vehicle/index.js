import React from "react";
import { Platform } from "react-native";
import {
  DELETE_VEHICLE_FETCHING,
  DELETE_VEHICLE_SUCCESS,
  DELETE_VEHICLE_FAILURE,
  DELETE_VEHICLE_CLEARDATA,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const delete_vehicle = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: DELETE_VEHICLE_FETCHING });

        axios
          .post(url.DELETE_VEHICLE, request_data)
          .then(function (response) {
            console.log("API RESPONSE *******", JSON.stringify(response));

            if (response.data.responseStatus == 1) {
              // update_user_token(dispatch, response.data.token)
              delete_vehicle_success(dispatch, response.data.result);
            } else {
              // alert(response.data.msg)
              delete_vehicle_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            delete_vehicle_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        delete_vehicle_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const delete_vehicle_success = (dispatch, data) => {
  dispatch({ type: DELETE_VEHICLE_SUCCESS, payload: data });
};

const delete_vehicle_failure = (dispatch, error) => {
  dispatch({ type: DELETE_VEHICLE_FAILURE, payload: error });
};

export const delete_vehicle_clear_data = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_VEHICLE_CLEARDATA,
      payload: "",
    });
  };
};
