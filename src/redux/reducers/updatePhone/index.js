import React from "react";
import { Platform } from "react-native";
import {
  UPDATE_PHONE_FETCHING,
  UPDATE_PHONE_SUCCESS,
  UPDATE_PHONE_FAILURE,
  UPDATE_PHONE_CLEARDATA,
} from "../../types";

const initialState = {
  is_success: false,
  updatePhone_data: [],
  is_fetching: false,
  error: false,
  msg: "",
};

export default function updatePhone(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PHONE_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case UPDATE_PHONE_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        updatePhone_data: action.payload,
      };
    case UPDATE_PHONE_FAILURE:
      return {
        ...state,
        is_fetching: false,
        is_success: false,
        error: true,
        msg: action.payload,
      };
    case UPDATE_PHONE_CLEARDATA:
      return {
        ...state,
        error: false,
        msg: "",
      };
    default:
      return state;
  }
}
