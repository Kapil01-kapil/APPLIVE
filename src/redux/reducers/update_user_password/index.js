import React from "react";
import { Platform } from "react-native";
import {
  UPDATE_USER_PASSWORD_FETCHING,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_FAILURE,
} from "../../types";

const initialState = {
  is_success: false,
  update_password_data: [],
  is_fetching: false,
  error: false,
  msg: "",
};

export default function update_user_password(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_PASSWORD_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case UPDATE_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        update_password_data: action.payload,
      };
    case UPDATE_USER_PASSWORD_FAILURE:
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
