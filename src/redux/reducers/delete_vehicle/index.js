import React from "react";
import { Platform } from "react-native";
import {
  DELETE_VEHICLE_FETCHING,
  DELETE_VEHICLE_SUCCESS,
  DELETE_VEHICLE_FAILURE,
  DELETE_VEHICLE_CLEARDATA,
} from "../../types";

const initialState = {
  is_success: false,
  is_fetching: false,
  delete_vehicle_data: [],
  error: false,
  msg: "",
};

export default function delete_vehicle(state = initialState, action) {
  switch (action.type) {
    case DELETE_VEHICLE_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case DELETE_VEHICLE_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        delete_vehicle_data: action.payload,
      };
    case DELETE_VEHICLE_FAILURE:
      return {
        ...state,
        is_fetching: false,
        is_success: false,
        error: true,
        msg: action.payload,
      };
    case DELETE_VEHICLE_CLEARDATA:
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
