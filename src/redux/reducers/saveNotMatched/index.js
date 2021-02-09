import React from "react";
import { Platform } from "react-native";
import {
  SAVE_NOT_MATCHED_FAILURE,
  SAVE_NOT_MATCHED_FETCHING,
  SAVE_NOT_MATCHED_SUCCESS,
} from "../../types";

const initialState = {
  is_success: false,
  saveNotMatched_data: [],
  is_fetching: false,
  error: false,
};

export default function saveNotMatched(state = initialState, action) {
  switch (action.type) {
    case SAVE_NOT_MATCHED_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case SAVE_NOT_MATCHED_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        saveNotMatched_data: action.payload,
      };
    case SAVE_NOT_MATCHED_FAILURE:
      return {
        ...state,
        is_fetching: false,
        is_success: false,
        error: true,
      };

    default:
      return state;
  }
}
