import React from "react";
import { Platform } from "react-native";
import {
  ADD_CARD_FETCHING,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAILURE,
  ADD_CARD_CLEARDATA,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const add_card = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: ADD_CARD_FETCHING });

        axios
          .post(url.ADD_CARD, request_data)
          .then(function (response) {
            console.log("API RESPONSE *******", JSON.stringify(response));

            if (response.data.responseStatus == 1) {
              // update_user_token(dispatch, response.data.token)
              add_card_request_success(dispatch, response.data.result);
            } else {
              // alert(response.data.msg)
              add_card_request_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            add_card_request_failure(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        add_card_request_failure(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

const add_card_request_success = (dispatch, data) => {
  dispatch({ type: ADD_CARD_SUCCESS, payload: data });
};

const add_card_request_failure = (dispatch, error) => {
  dispatch({ type: ADD_CARD_FAILURE, payload: error });
};

export const add_card_clear_data = () => {
  return (dispatch) => {
    dispatch({
      type: ADD_CARD_CLEARDATA,
      payload: "",
    });
  };
};
