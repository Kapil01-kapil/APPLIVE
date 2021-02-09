import React from "react";
import { Platform } from "react-native";
import {
  FUELTYPEPRICE_FETCHING,
  FUELTYPEPRICE_SUCCESS,
  FUELTYPEPRICE_FAILURE,
  FUELTYPEPRICE_CLEARDATA,
} from "../../types";

const initialState = {
  is_success: false,
  is_fetching: false,
  fuelTypePrice_data: [],
  error: false,
  msg: "",
};

export default function fuelTypePrice(state = initialState, action) {
  switch (action.type) {
    case FUELTYPEPRICE_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case FUELTYPEPRICE_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        fuelTypePrice_data: action.payload,
      };
    case FUELTYPEPRICE_FAILURE:
      return {
        ...state,
        is_fetching: false,
        is_success: false,
        error: true,
        msg: action.payload,
      };
    case FUELTYPEPRICE_CLEARDATA:
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
