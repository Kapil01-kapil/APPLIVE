import React from "react";
import { Platform } from "react-native";
import {
  CREATE_ADDRESS_FETCHING,
  CREATE_ADDRESS_SUCCESS,
  CREATE_ADDRESS_FAILURE,
  CREATE_ADDRESS_CLEARDATA,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const create_Address = (request_data) => {
  console.log("create_Addressrequest_data", request_data);
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: CREATE_ADDRESS_FETCHING });

        axios
          .post(url.CRATE_ADDRESS, request_data)
          .then(function (response) {
            console.log("API RESPONSE *******", JSON.stringify(response));

            if (response.data.responseStatus == 1) {
              // update_user_token(dispatch, response.data.token)
              create_Address_success(dispatch, response.data.result);
            } else {
              // alert(response.data.msg)
              create_Addresss_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            create_Address_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        create_Address_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const create_Address_success = (dispatch, data) => {
  dispatch({ type: CREATE_ADDRESS_SUCCESS, payload: data });
};

const create_Address_failure = (dispatch, error) => {
  dispatch({ type: CREATE_ADDRESS_FAILURE, payload: error });
};

export const create_Address_clear_data = () => {
  return (dispatch) => {
    dispatch({
      type: CREATE_ADDRESS_CLEARDATA,
      payload: "",
    });
  };
};
