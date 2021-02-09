import React from "react";
import { Platform } from "react-native";
import {
  SUBSCRIBE_FETCHING,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_FAILURE,
  SUBSCRIBE_CLEARDATA,
} from "../../types";

const initialState = {
  is_success: false,
  is_fetching: false,
  membership_data: [],
  error: false,
  msg: "",
};

export default function membership(state = initialState, action) {
  switch (action.type) {
    case SUBSCRIBE_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case SUBSCRIBE_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        membership_data: action.payload,
      };
    case SUBSCRIBE_FAILURE:
      return {
        ...state,
        is_fetching: false,
        is_success: false,
        error: true,
        msg: action.payload,
      };
    case SUBSCRIBE_CLEARDATA:
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
