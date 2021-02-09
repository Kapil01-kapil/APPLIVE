import React from "react";
import { Platform } from "react-native";
import {
  GET_FAQ_FETCHING,
  GET_FAQ_SUCCESS,
  GET_FAQ_FAILURE,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const get_faq = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: GET_FAQ_FETCHING });

        axios
          .post(url.GET_FAQ, request_data)
          .then(function (response) {
            console.log("API RESPONSE *******", JSON.stringify(response));

            if (response.data.responseStatus == 1) {
              // update_user_token(dispatch, response.data.token)
              get_faq_request_success(dispatch, response.data.data);
            } else {
              // alert(response.data.msg)
              get_faq_request_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            get_faq_request_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        get_faq_request_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const get_faq_request_success = (dispatch, data) => {
  dispatch({ type: GET_FAQ_SUCCESS, payload: data });
};

const get_faq_request_failure = (dispatch, error) => {
  dispatch({ type: GET_FAQ_FAILURE, payload: error });
};

export const get_faq_clear_data = () => {
  return (dispatch) => {
    dispatch({
      type: GET_FAQ_CLEARDATA,
      payload: "",
    });
  };
};
