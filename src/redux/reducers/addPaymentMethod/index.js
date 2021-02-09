import React from "react";
import { Platform } from "react-native";
import {
  ADD_PAYMENT_SUCCESS,
  ADD_PAYMENT_FAILURE,
  ADD_PAYMENT_CLEARDATA,
  ADD_PAYMENT_FETCHING,
} from "../../types";

const initialState = {
  is_success: false,
  is_fetching: false,
  add_payment_data: [],
  error: false,
  msg: "",
};

export default function addPaymentMethod(state = initialState, action) {
  switch (action.type) {
    case ADD_PAYMENT_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case ADD_PAYMENT_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        add_payment_data: action.payload,
      };
    case ADD_PAYMENT_FAILURE:
      return {
        ...state,
        is_fetching: false,
        is_success: false,
        error: true,
        msg: action.payload,
      };
    case ADD_PAYMENT_CLEARDATA:
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
