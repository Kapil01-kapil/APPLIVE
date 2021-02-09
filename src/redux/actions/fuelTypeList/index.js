import React from "react";
import { Platform } from "react-native";
import {
  FUELTYPELIST_FETCHING,
  FUELTYPELIST_SUCCESS,
  FUELTYPELISTS_SUCCESS,
  FUELTYPELIST_FAILURE,
  FUELTYPELIST_CLEARDATA,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const fuelTypeList = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: FUELTYPELIST_FETCHING });

        axios
          .post(url.FUELTYPELIST, request_data)
          .then(function (response) {
            // console.log("API RESPONSE *******", JSON.stringify(response));

            if (response.data.responseStatus == 1) {
              // update_user_token(dispatch, response.data.token)
              fuelTypeLists_request_success(dispatch, response.data);
              fuelTypeList_request_success(dispatch, response.data.data.res);
            } else {
              // alert(response.data.msg)
              fuelTypeList_request_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            fuelTypeList_request_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        fuelTypeList_request_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const fuelTypeList_request_success = (dispatch, data) => {
  dispatch({ type: FUELTYPELIST_SUCCESS, payload: data });
};
const fuelTypeLists_request_success = (dispatch, data) => {
  dispatch({ type: FUELTYPELISTS_SUCCESS, payload: data });
};
const fuelTypeList_request_failure = (dispatch, error) => {
  dispatch({ type: FUELTYPELIST_FAILURE, payload: error });
};

export const fuelTypeList_vehicle_clear_data = () => {
  return (dispatch) => {
    dispatch({
      type: FUELTYPELIST_CLEARDATA,
      payload: "",
    });
  };
};
