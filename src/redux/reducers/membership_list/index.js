import React from "react";
import { Platform } from "react-native";
import {
  MEMBERSHIP_LIST_FETCHING,
  MEMBERSHIP_LIST_SUCCESS,
  MEMBERSHIPS_LIST_SUCCESS,
  MEMBERSHIP_LIST_FAILURE,
  MEMBERSHIP_LIST_CLEARDATA,
} from "../../types";

const initialState = {
  is_success: false,
  is_successs: false,
  is_fetching: false,
  membership_list_data: [],
  memberships_list_data: [],
  error: false,
  msg: "",
};

export default function membership_list(state = initialState, action) {
  switch (action.type) {
    case MEMBERSHIP_LIST_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case MEMBERSHIP_LIST_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        membership_list_data: action.payload,
      };
    case MEMBERSHIPS_LIST_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_successs: true,
        memberships_list_data: action.payload,
      };
    case MEMBERSHIP_LIST_FAILURE:
      return {
        ...state,
        is_fetching: false,
        is_success: false,
        error: true,
        msg: action.payload,
      };
    case MEMBERSHIP_LIST_CLEARDATA:
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
