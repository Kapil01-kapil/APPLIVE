import React from "react";
import { Platform } from "react-native";
import {
  SERVICELOCATIONSERVICE_FAILURE,
  SERVICELOCATIONSERVICE_SUCCESS,
  SERVICELOCATIONSERVICE_FETCHING,
} from "../../types";

const initialState = {
  is_success: false,
  serviceLocationService_data: [],
  is_fetching: false,
  error: false,
};

export default function serviceLocationService(state = initialState, action) {
  switch (action.type) {
    case SERVICELOCATIONSERVICE_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case SERVICELOCATIONSERVICE_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        serviceLocationService_data: action.payload,
      };
    case SERVICELOCATIONSERVICE_FAILURE:
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
