import React from "react";
import { Platform } from "react-native";
import {
  SAVED_VEHICLE_FETCHING,
  SAVED_VEHICLE_SUCCESS,
  SAVED_VEHICLE_FAILURE,
  SAVED_VEHICLE_CLEARDATA,
  SAVED_VEHICLE_SUCCESSS,
} from "../../types";

const initialState = {
  is_success: false,
  saved_vehicle_data: [],
  saved_vehicle_datas: [],
  is_fetching: false,
  error: false,
  msg: "",
};

export default function saved_vehicle(state = initialState, action) {
  switch (action.type) {
    case SAVED_VEHICLE_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case SAVED_VEHICLE_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        saved_vehicle_data: action.payload,
      };
    case SAVED_VEHICLE_SUCCESSS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        saved_vehicle_datas: action.payload,
      };
    case SAVED_VEHICLE_FAILURE:
      return {
        ...state,
        is_fetching: false,
        is_success: false,
        error: true,
        msg: action.payload,
      };
    case SAVED_VEHICLE_CLEARDATA:
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
