import base64 from "react-native-base64";
const qs = require("qs");
export const BASE_URL = "http://65.1.26.221:1337/v3/";
//export const BASE_URL = "https://ezfill.app/staging-api/v3/";

//export const BASE_URL = "https://ez-fillapi.fundflu.com/api/";
export const Paypal_Base_url = "https://api.sandbox.paypal.com/";

export const PROJECT_TOKEN = "cff32f1932c6c9aa300a4773b41dc6bc";
export const API_secret = "e9af8cddb8a3429be0bd10e5b3c41f77";

export const url = {
  USER_LOGIN: BASE_URL + "user/login",
  USER_SOCIAL_LOGIN: BASE_URL + "user/sociallogin",
  USER_REGISTER: BASE_URL + "user/createNew",
  USER_OTP_Verify: BASE_URL + "user/verifyOtp",
  FORGOT_PASSWORD: BASE_URL + "user/forgotpassword",
  FORGOT_UPDATE_PASSWORD: BASE_URL + "user/forgotUpdatePassword",
  ADD_VEHICLE: BASE_URL + "vehicle/create",
  CRATE_ADDRESS: BASE_URL + "address/create",
  VEHICLEINFO: BASE_URL + "vehicleinfo/find",

  ADDRESS_DELETE: BASE_URL + "address/delete",

  SAVE_NOT_MATCHED: BASE_URL + "address/saveNotMatched",

  SERVICELOCATIONSERVICE: BASE_URL + "servicelocation/ServiceLocationService",

  SAVED_VEHICLE: BASE_URL + "user/findOne",
  DELETE_VEHICLE: BASE_URL + "vehicle/delete",
  VEHICLE_DROPDOWN: BASE_URL + "vehicleinfo/find",
  ORDER_CREATE: BASE_URL + "order/create",
  ORDER_HISTORY: BASE_URL + "order/find",
  SUBSCRIBE: BASE_URL + "user/subscribe",
  CANCEL_SUBSCRIBE: BASE_URL + "user/cancelSubscription",
  ORDER_STRIPE_PROFILE: BASE_URL + "order/createStripeProfile",
  USER_PROFILE: BASE_URL + "user/findOne",
  UPDATE_USER_PROFILE: BASE_URL + "user/updateProfile",
  UPDATE_USER_PASSWORD: BASE_URL + "user/updatePassword",
  ADD_PAYMENT_METHOD: BASE_URL + "order/addPaymentMethod",

  CREATE_CARD: BASE_URL + "order/createCardToken",
  ADD_CARD: BASE_URL + "order/addCard",
  CARD_LIST: BASE_URL + "order/cardList",

  CARD_MAKE_DEFAULT: BASE_URL + "order/makeDefault",
  GET_PRICE: BASE_URL + "price/find",
  GET_FAQ: BASE_URL + "page/findOne",

  GET_LOCATION: BASE_URL + "address/find",
  SAVE_LOCATION: BASE_URL + "address/create",
  DELETE_LOCATION: BASE_URL + "address/delete",
  CHARGE_APPLE: BASE_URL + "order/charge",

  SERVICELOCATIONSERVICE: BASE_URL + "service/search",
  DELETE_PAYMENT: BASE_URL + "order/deleteCard",

  CREATE_OTP: BASE_URL + "user/createOtp",
  VERIFICATION_OTP: BASE_URL + "user/verifyOtp",

  PROMO_CODE: BASE_URL + "sys-promocode/apply",

  ORDER_DELETE: BASE_URL + "order/removeRecurringService",

  UPDATE_PHONE: BASE_URL + "user/updatePhone",
  MEMBERSHIP_LIST: BASE_URL + "membership/list",
  FUELTYPELIST: BASE_URL + "fuelTypeList",
  FUELTYPEPRICE: BASE_URL + "fuelTypePrice",
};
export const paypalurl = {
  tokengenerate: Paypal_Base_url + "v1/oauth2/token",
  paymentgetpage: Paypal_Base_url + "v1/payments/payment",
};
export const PAYPAL_CLIENT =
  "AeEoIvl6cY87crWO6mLkzgbVYpd4gDYk_OK_cFJyz49G7E6vtzBNl3UseBKI5Ml-zMQ-052-5iiVc_9n";
export const FreshChat_APP_ID = "49bb23d2-8fa1-47d9-ba92-de499bbe2b28";
export const FreshChat_APP_KEY = "eaaeaa8f-a676-47f1-93fc-d8e74e6363bd";

("AeEoIvl6cY87crWO6mLkzgbVYpd4gDYk_OK_cFJyz49G7E6vtzBNl3UseBKI5Ml-zMQ-052-5iiVc_9n");
export const PAYPAL_SECRET =
  "EHnrnE19Q8-IVr7DWt_vS0Dy562zINs000pQT3dj3WssGpnCSoDquA4AbBeEVORMZkvDN__IS0kKGMns";
export var basicAuth = base64.encode(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`);
export const data = {
  grant_type: "client_credentials",
};
export const options = {
  method: "post",
  headers: new Headers({
    Authorization: `Basic ${basicAuth}`,
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Credentials": true,
  }),
  body: qs.stringify(data),
};
export const http_methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELET",
  HEAD: "HEAD",
  PATCH: "PATCH",
};
