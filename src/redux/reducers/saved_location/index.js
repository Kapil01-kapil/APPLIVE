import React from "react";
import { Platform } from "react-native";
import {
  SAVED_LOCATION_CLEARDATA,
  SAVED_LOCATION_FETCHING,
  SAVED_LOCATION_SUCCESS,
  SAVED_LOCATION_SUCCESSS,
  SAVED_LOCATION_FAILURE,
} from "../../types";

const initialState = {
  is_success: false,
  saved_location_data: [],
  saved_location_datas: [],
  is_fetching: false,
  error: false,
  msg: "",
};

export default function saved_vehicle(state = initialState, action) {
  switch (action.type) {
    case SAVED_LOCATION_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case SAVED_LOCATION_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        saved_location_data: action.payload,
      };
    case SAVED_LOCATION_SUCCESSS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        saved_location_datas: action.payload,
      };
    case SAVED_LOCATION_FAILURE:
      return {
        ...state,
        is_fetching: false,
        is_success: false,
        error: true,
        msg: action.payload,
      };
    case SAVED_LOCATION_CLEARDATA:
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
