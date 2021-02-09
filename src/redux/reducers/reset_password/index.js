import React from "react";
import { Platform } from "react-native";
import {
  FORGOT_UPADATE_PASSWORD_FAILURE,
  FORGOT_UPADATE_PASSWORD_FETCHING,
  FORGOT_UPADATE_PASSWORD_SUCCESS,
} from "../../types";

const initialState = {
  is_success: false,
  forgot_update_password_data: [],
  is_fetching: false,
  error: false,
};

export default function forgot_password(state = initialState, action) {
  switch (action.type) {
    case FORGOT_UPADATE_PASSWORD_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case FORGOT_UPADATE_PASSWORD_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        forgot_update_password_data: action.payload,
      };
    case FORGOT_UPADATE_PASSWORD_FAILURE:
      return {
        ...state,
        is_fetching: false,
        is_success: false,
        error: true,
      };

    default:
      return state;
  }
}
