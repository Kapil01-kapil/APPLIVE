import React from "react";
import { Platform } from "react-native";
import {
  RECURRING_FETCHING,
  RECURRING_SUCCESS,
  RECURRING_FAILURE,
  RECURRING_CLEARDATA,
} from "../../types";

const initialState = {
  is_success: false,
  is_fetching: false,
  recurringService_data: [],
  error: false,
  msg: "",
};

export default function recurringService(state = initialState, action) {
  switch (action.type) {
    case RECURRING_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case RECURRING_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        recurringService_data: action.payload,
      };
    case RECURRING_FAILURE:
      return {
        ...state,
        is_fetching: false,
        is_success: false,
        error: true,
        msg: action.payload,
      };
    case RECURRING_CLEARDATA:
      return {
        ...state,
        is_success: false,
        error: false,
        msg: "",
      };

    default:
      return state;
  }
}
