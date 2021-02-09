import { combineReducers } from "redux";
import user_login from "../user_login";
import user_register from "../user_register";
import user_auth from "../user_auth";
import add_vehicle from "../add_vehicle";
import saved_vehicle from "../saved_vehicle";
import vehicle_dropdown from "../vehicle_dropdown";
import order_create from "../order_create";
import order_history from "../order_history";
import boat_dropdown from "../boat_dropdown";
import ServiceLocationService from "../ServiceLocationService";
import add_card from "../add_card";
import create_card from "../create_card";
import card_list from "../card_list";
import make_card_default from "../card_make_default";
import user_social_login from "../user_social_login";
import get_price from "../get_price";
import get_faq from "../get_faq";
import saveNotMatched from "../saveNotMatched";
import forgot_password from "../forgot_password";
import reset_password from "../reset_password";
import saved_location from "../saved_location";
import delete_Address from "../delete_Address";
import create_Address from "../create_Address";
import delete_vehicle from "../delete_vehicle";
import schedule from "../schedule";
import membership from "../membership";
import add_applepay from "../add_applepay";
import add_Paypal from "../add_Paypal";
import payment_delete from "../payment_delete";
import update_user_password from "../update_user_password";
import createOtp from "../createOtp";
import cancel_mambership from "../cancel_mambership";
import promo_code from "../promo_code";
import updatePhone from "../updatePhone";
import recurringService from "../recurringService";

import addPaymentMethod from "../addPaymentMethod";

import membership_list from "../membership_list";

import fuelTypeList from "../fuelTypeList";
import fuelTypePrice from "../fuelTypePrice";
export default combineReducers({
  membership_list: membership_list,
  fuelTypeList: fuelTypeList,
  fuelTypePrice: fuelTypePrice,
  addPaymentMethod: addPaymentMethod,
  recurringService: recurringService,
  updatePhone: updatePhone,
  update_user_password: update_user_password,
  user_login: user_login,
  schedule: schedule,
  createOtp: createOtp,
  payment_delete: payment_delete,
  membership: membership,
  user_register: user_register,
  create_Address: create_Address,
  user_auth: user_auth,
  delete_vehicle: delete_vehicle,
  delete_Address: delete_Address,
  saved_location: saved_location,
  ServiceLocationService: ServiceLocationService,
  forgot_password: forgot_password,
  reset_password: reset_password,
  add_vehicle: add_vehicle,
  saved_vehicle: saved_vehicle,
  vehicle_dropdown: vehicle_dropdown,
  saveNotMatched: saveNotMatched,
  order_create: order_create,
  order_history: order_history,
  boat_dropdown: boat_dropdown,
  add_card: add_card,
  create_card: create_card,
  card_list: card_list,
  make_card_default: make_card_default,
  user_social_login: user_social_login,
  get_price: get_price,
  get_faq: get_faq,
  add_applepay: add_applepay,
  add_Paypal: add_Paypal,
  cancel_mambership: cancel_mambership,
  promo_code: promo_code,
});
