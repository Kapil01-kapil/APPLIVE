import React from "react";
import { Platform } from "react-native";
import {
  USER_REGISTER_FETCHING,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
} from "../../types";

const initialState = {
  is_success: false,
  register_data: [],
  is_fetching: false,
  error: false,
  msg: "",
};

export default function user_register(state = initialState, action) {
  switch (action.type) {
    case USER_REGISTER_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        register_data: action.payload,
      };
    case USER_REGISTER_FAILURE:
      return {
        ...state,
        is_fetching: false,
        is_success: false,
        error: true,
        msg: action.payload,
      };
    default:
      return state;
  }
}
