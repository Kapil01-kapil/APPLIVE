import React from "react";
import { Platform } from "react-native";
import {
  DELETE_LOCATION_FETCHING,
  DELETE_LOCATION_SUCCESS,
  DELETE_LOCATION_FAILURE,
  DELETE_LOCATION_CLEARDATA,
} from "../../types";

const initialState = {
  is_success: false,
  is_fetching: false,
  delete_Address_data: [],
  error: false,
  msg: "",
};

export default function delete_Address(state = initialState, action) {
  switch (action.type) {
    case DELETE_LOCATION_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case DELETE_LOCATION_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        delete_Address_data: action.payload,
      };
    case DELETE_LOCATION_FAILURE:
      return {
        ...state,
        is_fetching: false,
        is_success: false,
        error: true,
        msg: action.payload,
      };
    case DELETE_LOCATION_CLEARDATA:
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
