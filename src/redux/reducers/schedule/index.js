import React from "react";
import { Platform } from "react-native";
import {
  SCHEDULE_FETCHING,
  SCHEDULE_SUCCESS,
  SCHEDULE_FAILURE,
  SCHEDULE_CLEARDATA,
} from "../../types";

const initialState = {
  is_success: false,
  is_fetching: false,
  schedule: [],
  error: false,
  msg: "",
};

export default function schedule(state = initialState, action) {
  switch (action.type) {
    case SCHEDULE_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case SCHEDULE_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        schedule: action.payload,
      };
    case SCHEDULE_FAILURE:
      return {
        ...state,
        is_fetching: false,
        is_success: false,
        error: true,
        msg: action.payload,
      };
    case SCHEDULE_CLEARDATA:
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
