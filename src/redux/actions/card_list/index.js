import React from "react";
import { Platform } from "react-native";
import {
  CARD_LIST_FETCHING,
  CARD_LIST_SUCCESS,
  CARD_LIST_FAILURE,
  CARD_LIST_CLEARDATA,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const card_list = (request_data) => {
  console.log("request_data", request_data);
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: CARD_LIST_FETCHING });

        axios
          .post(url.USER_PROFILE, request_data)
          .then(function (response) {
            console.log(
              "API RESPONSE kapils",
              JSON.stringify(response.data)
            );

            if (response.data.responseStatus == 1) {
              var datas = response.data;
              console.log("kapil REspone", datas.data.paymentMethods);

              card_list_request_success(
                dispatch,
                response.data.data.paymentMethods
              );
            } else {
              // alert(response.data.msg)
              card_list_request_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            card_list_request_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        card_list_request_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const card_list_request_success = (dispatch, data) => {
  dispatch({ type: CARD_LIST_SUCCESS, payload: data });
};

const card_list_request_failure = (dispatch, error) => {
  dispatch({ type: CARD_LIST_FAILURE, payload: error });
};

export const card_list_clear_data = () => {
  return (dispatch) => {
    dispatch({
      type: CARD_LIST_CLEARDATA,
      payload: "",
    });
  };
};
