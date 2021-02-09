import React from "react";
import { Platform } from "react-native";
import {
  SAVED_VEHICLE_FETCHING,
  SAVED_VEHICLE_SUCCESS,
  SAVED_VEHICLE_FAILURE,
  SAVED_VEHICLE_CLEARDATA,
  SAVED_VEHICLE_SUCCESSS,
  DELETE_VEHICLE_FETCHING,
  DELETE_VEHICLE_SUCCESS,
  DELETE_VEHICLE_FAILURE,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const saved_vehicle = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: SAVED_VEHICLE_FETCHING });

        axios
          .post(url.SAVED_VEHICLE, request_data)
          .then(function (response) {
            // console.log(
            //   "API RESPONSE fetch saved vehicals*******",
            //   JSON.stringify(response)
            // );

            if (response.data.responseStatus == 1) {
              // update_user_token(dispatch, response.data.token)
              saved_request_success(dispatch, response.data.data.vehicles);
              saved_request_successs(dispatch, response.data.data.addresses);
            } else {
              // alert(response.data.msg)
              saved_request_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log(
              "API RESPONSE ERROR Saved vehicle*******",
              JSON.stringify(error)
            );
            saved_request_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        saved_request_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};
const saved_request_success = (dispatch, data) => {
  dispatch({ type: SAVED_VEHICLE_SUCCESS, payload: { data } });
};
const saved_request_successs = (dispatch, data) => {
  dispatch({ type: SAVED_VEHICLE_SUCCESSS, payload: { data } });
};

const saved_request_failure = (dispatch, error) => {
  dispatch({ type: SAVED_VEHICLE_FAILURE, payload: error });
};

export const saved_vehicle_clear_data = () => {
  return (dispatch) => {
    dispatch({
      type: SAVED_VEHICLE_CLEARDATA,
      payload: "",
    });
  };
};
