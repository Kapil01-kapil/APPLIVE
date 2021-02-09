import React from "react";
import { Platform } from "react-native";
import {
  SAVED_LOCATION_FETCHING,
  SAVED_LOCATION_SUCCESS,
  SAVED_LOCATION_FAILURE,
  SAVED_LOCATION_CLEARDATA,
  SAVED_LOCATION_SUCCESSS,
  DELETE_ADDRESS,
} from "../../types";
import { checkNetwork } from "../../../utils";
import { url } from "../../../api";
import axios from "axios";

export const saved_location = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        dispatch({ type: SAVED_LOCATION_FETCHING });

        axios
          .post(url.SAVED_VEHICLE, request_data)
          .then(function (response) {
            // console.log(
            //   "API RESPONSE fetch saved vehicals*******",
            //   JSON.stringify(response)
            // );

            if (response.data.responseStatus == 1) {
              // update_user_token(dispatch, response.data.token)
              saved_location_success(dispatch, response.data.data.addresses);
              saved_location_successs(dispatch, response.data.data.addresses);
            } else {
              // alert(response.data.msg)
              saved_location_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log(
              "API RESPONSE ERROR Saved vehicle*******",
              JSON.stringify(error)
            );
            saved_location_failure(
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
const saved_location_success = (dispatch, data) => {
  dispatch({ type: SAVED_LOCATION_SUCCESS, payload: { data } });
};
const saved_location_successs = (dispatch, data) => {
  dispatch({ type: SAVED_LOCATION_SUCCESSS, payload: { data } });
};

const saved_location_failure = (dispatch, error) => {
  dispatch({ type: SAVED_LOCATION_FAILURE, payload: error });
};

export const saved_location_locar_clear_data = () => {
  return (dispatch) => {
    dispatch({
      type: SAVED_LOCATION_CLEARDATA,
      payload: "",
    });
  };
};

// export const delete_Address = (request_data) => {
//   return async (dispatch, getState) => {
//     const token = getState().user_auth.user_auth_token;
//     const response = await axios.post(url.ADDRESS_DELETE, request_data);

//     if (!response.status) {
//       throw new Error("Something went wrong!");
//     }
//     console.log(response);
//     dispatch({ type: DELETE_ADDRESS, pid: item_id });
//   };
// };
