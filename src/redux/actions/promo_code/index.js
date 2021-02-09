import React from "react";
import { Platform } from "react-native";
import {
  PROMO_CODE_FETCHING,
  PROMO_CODE_SUCCESS,
  PROMO_CODE_FAILURE,
  PROMO_CODE_CLEARDATA,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const promo_code = (request_data) => {
  return (dispatch) => {
    console.log("request_datapayment", request_data);
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: PROMO_CODE_FETCHING });

        axios
          .post(url.PROMO_CODE, request_data)
          .then(function (response) {
            console.log("API RESPONSE promo_code", JSON.stringify(response));
            promo_code_success(dispatch, response.data);
            // if (response.data.responseStatus == 1) {
            //   // update_user_token(dispatch, response.data.token)
            //   promo_code_success(dispatch, response.data);
            // } else {
            //   // alert(response.data.msg);
            //   promo_code_failure(dispatch, response.data.msg);
            // }
          })
          .catch(function (error) {
            // alert(error.response.data.message);
            promo_code_failure(dispatch, error.response.data.message);
            console.log(
              "API RESPONSE ERROR *******",
              JSON.stringify(error.response.data.message)
            );
            promo_code_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        promo_code_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const promo_code_success = (dispatch, data) => {
  dispatch({ type: PROMO_CODE_SUCCESS, payload: data });
};

const promo_code_failure = (dispatch, error) => {
  dispatch({ type: PROMO_CODE_FAILURE, payload: error });
};

export const promo_code_clear_data = () => {
  return (dispatch) => {
    dispatch({
      type: PROMO_CODE_CLEARDATA,
      payload: "",
    });
  };
};
