import React from "react";
import { Platform } from "react-native";
import {
  CREATE_ADDRESS_FETCHING,
  CREATE_ADDRESS_SUCCESS,
  CREATE_ADDRESS_FAILURE,
  CREATE_ADDRESS_CLEARDATA,
} from "../../types";

const initialState = {
  is_success: false,
  is_fetching: false,
  create_Address_data: [],
  error: false,
  msg: "",
};

export default function create_Address(state = initialState, action) {
  switch (action.type) {
    case CREATE_ADDRESS_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case CREATE_ADDRESS_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        create_Address_data: action.payload,
      };
    case CREATE_ADDRESS_FAILURE:
      return {
        ...state,
        is_fetching: false,
        is_success: false,
        error: true,
        msg: action.payload,
      };
    case CREATE_ADDRESS_CLEARDATA:
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
