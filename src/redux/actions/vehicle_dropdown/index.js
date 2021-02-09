import React from "react";
import { Platform } from "react-native";
import {
  VEHICLE_DROPDOWN_FETCHING,
  VEHICLE_DROPDOWN_SUCCESS,
  VEHICLE_DROPDOWN_FAILURE,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const vehicle_dropdown = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: VEHICLE_DROPDOWN_FETCHING });

        axios
          .post(url.VEHICLE_DROPDOWN, request_data)
          .then(function (response) {
            console.log("API RESPONSE *******", JSON.stringify(response));

            if (response.data.responseStatus == 1) {
              // update_user_token(dispatch, response.data.token)
              var dropdownData = {
                make: response.data.make,
                color: response.data.color,
                model: response.data.model,
                fuel_type: response.data.fuel_type,
              };
              vehicle_dropdown_request_success(dispatch, dropdownData);
            } else {
              // alert(response.data.msg)
              vehicle_dropdown_request_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            vehicle_dropdown_request_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        vehicle_dropdown_request_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};
const vehicle_dropdown_request_success = (dispatch, data) => {
  dispatch({ type: VEHICLE_DROPDOWN_SUCCESS, payload: { data } });
};

const vehicle_dropdown_request_failure = (dispatch, error) => {
  dispatch({ type: VEHICLE_DROPDOWN_FAILURE, payload: error });
};
