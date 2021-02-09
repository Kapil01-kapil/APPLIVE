import React from "react";
import { Platform } from "react-native";
import {
  DELETE_PAYMENT_FETCHING,
  DELETE_PAYMENT_SUCCESS,
  DELETE_PAYMENT_FAILURE,
  DELETE_PAYMENT_CLEARDATA,
} from "../../types";

const initialState = {
  is_success: false,
  is_fetching: false,
  delete_pament_data: [],
  error: false,
  msg: "",
};

export default function payment_delete(state = initialState, action) {
  switch (action.type) {
    case DELETE_PAYMENT_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case DELETE_PAYMENT_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        delete_pament_data: action.payload,
      };
    case DELETE_PAYMENT_FAILURE:
      return {
        ...state,
        is_fetching: false,
        is_success: false,
        error: true,
        msg: action.payload,
      };
    case DELETE_PAYMENT_CLEARDATA:
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
