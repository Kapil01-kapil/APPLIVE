import React from "react";
import { Platform } from "react-native";
import {
  FUELTYPELIST_FETCHING,
  FUELTYPELIST_SUCCESS,
  FUELTYPELIST_FAILURE,
  FUELTYPELIST_CLEARDATA,
  FUELTYPELISTS_SUCCESS,
} from "../../types";

const initialState = {
  is_success: false,
  is_fetching: false,
  fuelTypeList: [],
  fuelTypeList_datas: [],
  error: false,
  msg: "",
};

export default function fuelTypeList(state = initialState, action) {
  switch (action.type) {
    case FUELTYPELIST_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case FUELTYPELIST_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        fuelTypeList_data: action.payload,
      };
    case FUELTYPELISTS_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        fuelTypeList_datas: action.payload,
      };
    case FUELTYPELIST_FAILURE:
      return {
        ...state,
        is_fetching: false,
        is_success: false,
        error: true,
        msg: action.payload,
      };
    case FUELTYPELIST_CLEARDATA:
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
