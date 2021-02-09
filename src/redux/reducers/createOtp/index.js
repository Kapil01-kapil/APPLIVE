import React from "react";
import { Platform } from "react-native";
import {
  CREATE_OTP_FETCHING,
  CREATE_OTP_SUCCESS,
  CREATE_OTP_FAILURE,
} from "../../types";

const initialState = {
  is_success: false,
  createOtp_data: [],
  is_fetching: false,
  error: false,
  msg: "",
};

export default function createOtp(state = initialState, action) {
  switch (action.type) {
    case CREATE_OTP_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case CREATE_OTP_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        createOtp_data: action.payload,
      };
    case CREATE_OTP_FAILURE:
      return {
        ...state,
        is_fetching: false,
        is_success: false,
        error: true,
        msg: action.payload,
      };

    default:
      return state;
  }
}
