import React from "react";
import { Platform, RefreshControlBase } from "react-native";
import {
  FUELTYPEPRICE_FETCHING,
  FUELTYPEPRICE_SUCCESS,
  FUELTYPEPRICE_FAILURE,
  FUELTYPEPRICE_CLEARDATA,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const fuelTypePrice = (request_data) => {
  console.log("request_data_fuelTypePrice", JSON.stringify(request_data));
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: FUELTYPEPRICE_FETCHING });

        axios
          .post(url.FUELTYPEPRICE, request_data)
          .then(function (response) {
            // console.log("API RESPONSE *******", JSON.stringify(response));

            if (response.data.responseStatus == 1) {
              // update_user_token(dispatch, response.data.token)
              fuelTypePrice_request_success(dispatch, response.data);
            } else {
              // alert(response.data.msg)
              fuelTypePrice_request_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            fuelTypePrice_request_failure(
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

const fuelTypePrice_request_success = (dispatch, data) => {
  dispatch({ type: FUELTYPEPRICE_SUCCESS, payload: data });
};

const fuelTypePrice_request_failure = (dispatch, error) => {
  dispatch({ type: FUELTYPEPRICE_FAILURE, payload: error });
};

export const fuelTypePrice_vehicle_clear_data = () => {
  return (dispatch) => {
    dispatch({
      type: FUELTYPEPRICE_CLEARDATA,
      payload: "",
    });
  };
};
