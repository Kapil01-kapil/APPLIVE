import React from "react";
import { Platform } from "react-native";
import {
  PROMO_CODE_FETCHING,
  PROMO_CODE_SUCCESS,
  PROMO_CODE_FAILURE,
  PROMO_CODE_CLEARDATA,
} from "../../types";

const initialState = {
  is_success: false,
  is_fetching: false,
  promo_code_data: [],
  error: false,
  msg: "",
};

export default function promo_code(state = initialState, action) {
  switch (action.type) {
    case PROMO_CODE_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case PROMO_CODE_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        promo_code_data: action.payload,
      };
    case PROMO_CODE_FAILURE:
      return {
        ...state,
        is_fetching: false,
        is_success: false,
        error: true,
        msg: action.payload,
      };
    case PROMO_CODE_CLEARDATA:
      return {
        ...state,
        error: false,
        msg: "",
      };

    default:
      return state;
  }
}
