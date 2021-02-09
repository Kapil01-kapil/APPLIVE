import React from "react";
import { Platform } from "react-native";
import {
  CANCEL_SUBSCRIBE_FETCHING,
  CANCEL_SUBSCRIBE_SUCCESS,
  CANCEL_SUBSCRIBE_FAILURE,
  CANCEL_SUBSCRIBE_CLEARDATA,
} from "../../types";

const initialState = {
  is_success: false,
  is_fetching: false,
  cancel_membership_data: [],
  error: false,
  msg: "",
};

export default function cancel_mambership(state = initialState, action) {
  switch (action.type) {
    case CANCEL_SUBSCRIBE_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case CANCEL_SUBSCRIBE_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        cancel_membership_data: action.payload,
      };
    case CANCEL_SUBSCRIBE_FAILURE:
      return {
        ...state,
        is_fetching: false,
        is_success: false,
        error: true,
        msg: action.payload,
      };
    case CANCEL_SUBSCRIBE_CLEARDATA:
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
