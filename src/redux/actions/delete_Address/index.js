import React from "react";
import { Platform } from "react-native";
import {
  DELETE_LOCATION_FETCHING,
  DELETE_LOCATION_SUCCESS,
  DELETE_LOCATION_FAILURE,
  DELETE_LOCATION_CLEARDATA,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const delete_Address = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: DELETE_LOCATION_FETCHING });

        axios
          .post(url.DELETE_LOCATION, request_data)
          .then(function (response) {
            console.log("API RESPONSE *******", JSON.stringify(response));

            if (response.data.responseStatus == 1) {
              // update_user_token(dispatch, response.data.token)
              delete_Address_success(dispatch, response.data.result);
            } else {
              // alert(response.data.msg)
              delete_Address_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            delete_Address_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        delete_Address_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const delete_Address_success = (dispatch, data) => {
  dispatch({ type: DELETE_LOCATION_SUCCESS, payload: data });
};

const delete_Address_failure = (dispatch, error) => {
  dispatch({ type: DELETE_LOCATION_FAILURE, payload: error });
};

export const delete_Address_clear_data = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_LOCATION_CLEARDATA,
      payload: "",
    });
  };
};
