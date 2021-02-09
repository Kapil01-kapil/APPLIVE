// import React, { Component } from "react";
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   TouchableHighlight,
//   Animated,
//   Keyboard,
//   Button,
//   Modal,
//   Platform,
//   ScrollView,
//   Alert,
// } from "react-native";
// import { Icon } from "native-base";
// import { CONST } from "../../utils/constants";
// import BtnWithImage from "../../components/btn_with_image";
// import AssetsImages from "../../res";
// import SafeAreaContainer from "../../components/safearea_container";
// import styles from "./styles";
// import ErrorContainer from "../../components/error_container";
// import HeaderTxt from "../../components/header_txt";
// import { connect } from "react-redux";
// import {
//   order_create,
//   order_create_clear_data,
//   add_applepay,
//   add_applepay_clear_data,
//   promo_code,
//   promo_code_clear_data,
//   membership_clear_data,
//   membership,
//   cancel_membership,
//   recurringService,
//   recurringService_clear_data,
//   user_profile,
//   cancle_membership_clear_data,
//   membership_list,
//   membership_list_clear_data,
// } from "../../redux/actions";
// import Loader from "../../components/loader";
// import TxtFullScreenBtn from "../../components/txt_full_screen_btn";
// import moment from "moment";
// import stripe from "tipsi-stripe";
// stripe.setOptions({
//   publishableKey: "pk_test_AUrE92WoAMzjQEn4fThEEkzR",
//   merchantId: "merchant.com.ezfillapp.consumer",
//   androidPayMode: "test",
// });
// import Colors from "../../constants/Colors";
// import { GooglePay } from "react-native-google-pay";
// const allowedCardNetworks = ["AMEX", "DISCOVER", "JCB", "MASTERCARD", "VISA"];
// const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];
// const stripeRequestData = {
//   cardPaymentMethod: {
//     tokenizationSpecification: {
//       type: "PAYMENT_GATEWAY",
//       gateway: "stripe",
//       gatewayMerchantId: "13474330361229841865",
//       stripe: {
//         publishableKey: "pk_test_AUrE92WoAMzjQEn4fThEEkzR",
//         version: "2018-11-08",
//       },
//     },
//     allowedCardNetworks,
//     allowedCardAuthMethods,
//   },
//   transaction: {
//     totalPrice: "1",
//     totalPriceStatus: "FINAL",
//     currencyCode: "INR",
//   },
//   merchantName: "Ezfill holdings Inc",
// };
// import {
//   FreshChat_APP_ID,
//   FreshChat_APP_KEY,
//   PROJECT_TOKEN,
//   API_secret,
// } from "../../api/api_config";
// import {
//   Freshchat,
//   FreshchatConfig,
//   FaqOptions,
//   ConversationOptions,
//   FreshchatUser,
//   FreshchatMessage,
//   FreshchatNotificationConfig,
// } from "react-native-freshchat-sdk";
// var delivery_Fees = "";
// var vehicleid = [];
// var membershipdata = "";
// class OrderDetails extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: "",
//       bodyTxt: "",
//       isPopUpOpened: false,
//       loading: false,
//       Sussessfull: false,
//       addressName: "",
//       isFromCheckout: false,
//       isPopUpOpeneds: false,
//       promo_codes: false,
//       promo_cods: "",
//       deliveryFee: "",
//       Delivery_fee: false,
//       membership: "no",
//       isPromoCode: "no",
//       remove: false,
//       editable: true,
//       vehicle: {},
//       is_member: true,
//       memberships: true,
//       payment_data: {},
//       isVisible: false, //state of modal default false
//       orderData: {},
//       schedule_str: "",
//       error_msg:
//         "Please check that you've added a valid email\naddress and password.",
//       is_error_msg_shown: false,
//       allowed: false,
//       complete: true,
//       order_id: "",
//       status: null,
//       token: null,
//       amexAvailable: false,
//       membershipTest: false,
//       discoverAvailable: false,
//       masterCardAvailable: false,
//       visaAvailable: false,
//       oderHistory: false,
//       membership_plan: "$9.99",
//       plan_includes: [
//         {
//           title: "Free Deliveries",
//           isAdded: true,
//         },
//         {
//           title: "Weekly Refueling Schedule",
//           isAdded: true,
//         },
//         {
//           title: "Tire Air Pressure Check",
//           isAdded: true,
//         },
//         {
//           title: "24/7 Customer Support",
//           isAdded: true,
//         },
//         {
//           title: "Cancel Anytime!",
//           isAdded: true,
//         },
//       ],
//     };
//   }

//   //TODO:- class life cycle
//   componentDidMount() {
//     console.log("this.props.route.params.line1", this.props.route.params.line1);
//     let request_user_profile = {
//       user_id: this.props.user_data.data._id,
//     };
//     this.props.membership_list(request_user_profile);
//     this.props.user_profile(request_user_profile);
//     if (
//       this.props &&
//       this.props.user_data &&
//       this.props.user_data.data.membershipStatus == 1
//     ) {
//       this.setState({
//         is_member: false,
//         membershipTest: false,
//       });
//     } else {
//       this.setState({ is_member: true, membershipTest: true });
//     }
//     console.log(
//       "DATASSSS => " + JSON.stringify(this.props.promo_code_data.code)
//     );
//     // Set the environment before the payment request
//     if (Platform.OS === "android") {
//       GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);
//     }
//     this.setState(
//       { isFromCheckout: this.props.route.params.isFromCheckout },
//       () => {
//         this.props.navigation.setOptions({
//           headerTitle: this.state.isFromCheckout ? "Checkout" : "Order",
//           headerStyle: {
//             elevation: 0,
//             shadowOpacity: 0,
//             borderBottomWidth: 0,
//           },
//           headerTitleStyle: {
//             fontWeight: "bold",
//             fontSize: 26,
//             fontFamily: "Avenir",
//             alignSelf: "center",
//           },
//           headerLeft: () => (
//             <BtnWithImage
//               img={AssetsImages.icon_back}
//               btnImgStyle={{ height: 22, width: 22 }}
//               onPress={() => {
//                 this.props.navigation.goBack();
//               }}
//               btnStyle={{ marginLeft: 8 }}
//             />
//           ),
//           headerRight: () => (
//             <BtnWithImage
//               img={AssetsImages.icon_chat}
//               btnImgStyle={{ height: 18, width: 18 }}
//               onPress={() => {
//                 Freshchat.showFAQs();
//                 //this.setupUserFreshchat;
//                 // this.resetUserFreshchat;
//                 Freshchat.showConversations();
//                 // this.props.navigation.navigate("Schedule");
//               }}
//               btnStyle={{ marginRight: 8 }}
//             />
//           ),
//         });

//         this.setState({
//           isFromMembership:
//             (this.props.route.params &&
//               this.props.route.params.isFromMembership) ||
//             false,
//           isFromAddVehicle:
//             (this.props.route.params &&
//               this.props.route.params.isFromAddVehicle) ||
//             false,
//           remove:
//             (this.props.route.params && this.props.route.params.remove) ||
//             false,

//           oderHistory:
//             (this.props.route.params && this.props.route.params.oderHistory) ||
//             false,
//           order_id:
//             (this.props.route.params && this.props.route.params.order_id) || "",
//         });
//         this._unsubscribe = this.props.navigation.addListener("focus", () => {
//           this.onFocus();
//         });
//         this.setState({ orderData: this.props.route.params.orderData }, () => {
//           this.initialSetUp();
//         });
//       }
//     );
//   }
//   componentWillUnmount() {
//     this._unsubscribe();
//   }
//   onFocus = () => {
//     console.log("ON focus....");
//     let request_user_profile = {
//       user_id:
//         this.props && this.props.user_data && this.props.user_data.data._id,
//     };
//     this.props.user_profile(request_user_profile);
//     this.props.membership_list(request_user_profile);
//     if (
//       this.props &&
//       this.props.user_data &&
//       this.props.user_data.data.membershipStatus == 1
//     ) {
//       this.setState({
//         is_member: false,
//         renew_date:
//           this.props.user_data &&
//           this.props.user_data.data &&
//           this.props.user_data.data.membershipEnds,
//         membership_title: "You're a EzFill Member",
//       });
//     } else {
//       this.setState({ is_member: true });
//     }
//   };
//   componentDidUpdate(prevProps) {
//     console.log(
//       "prevProps => " +
//         JSON.stringify(prevProps) +
//         "   ======  " +
//         this.props.msg
//     );
//     if (this.props.is_ !== prevProps._delete) {
//       if (this.props._delete) {
//         if (!this.state.isApiCalled) {
//           this.setState({ loading: true });
//         }
//       } else if (!this.props._delete) {
//         this.setState({ loading: false, isApiCalled: true });
//       }
//     }
//     if (this.props.cancel_is_fetching !== prevProps.cancel_is_fetching) {
//       if (this.props.cancel_is_fetching) {
//         if (!this.state.isApiCalled) {
//           this.setState({ loading: true });
//         }
//       } else if (!this.props.cancel_is_fetching) {
//         this.setState({ loading: false, isApiCalled: true });
//       }
//     }
//     if (
//       this.props.is_fetching_membership !== prevProps.is_fetching_membership
//     ) {
//       if (this.props.is_fetching_membership) {
//         if (!this.state.isApiCalled) {
//           this.setState({ loading: true });
//         }
//       } else if (!this.props.is_fetching_membership) {
//         this.setState({ loading: false, isApiCalled: true });
//       }
//     }
//     if (this.props.cancel_is_success !== prevProps.cancel_is_success) {
//       if (this.props.cancel_is_success) {
//         this.setState({ isSavedVahicleApiSuccess: true });
//         setTimeout(() => {
//           let request_user_profile = {
//             user_id:
//               this.props &&
//               this.props.user_data &&
//               this.props.user_data.data._id,
//           };
//           this.props.user_profile(request_user_profile);
//         }, 500);
//         this.props.membership_clear_data();
//         if (
//           this.props.user_data &&
//           this.props.user_data.data &&
//           this.props.user_data.data.membershipStatus == 1
//         ) {
//           this.setState({
//             is_member: false,
//             renew_date:
//               this.props.user_data &&
//               this.props.user_data.data &&
//               this.props.user_data.data.membershipEnds,
//             membership_title: "You're a EzFill Member",
//           });
//         } else {
//           this.setState({ is_member: true });
//         }
//       }
//     }
//     if (
//       this.props.is_fetching_membership !== prevProps.is_fetching_membership
//     ) {
//       if (this.props.is_fetching_membership) {
//         if (!this.state.isApiCalled) {
//           this.setState({ loading: true });
//         }
//       } else if (!this.props._delete) {
//         this.setState({ loading: false, isApiCalled: true });

//         //  () => {
//         // if (this.props.is_succes !== prevProps.is_succes) {
//         //   if (this.props.is_succes) {
//         //     this.props.saved_location_locar_clear_data();
//         //   }
//         // }
//       }
//     }
//     if (this.props.cancel_is_success !== prevProps.cancel_is_success) {
//       console.log("is_succe_delete", this.props.cancel_is_success);
//       if (this.props.cancel_is_success == true) {
//         // console.log("DATA====>", this.props.delete_Address_clear_data);
//         // let request = { user_id: this.props.user_data.data._id };
//         // this.props.saved_location(request);

//         setTimeout(() => {
//           let request_user_profile = {
//             user_id:
//               this.props &&
//               this.props.user_data &&
//               this.props.user_data.data._id,
//           };
//           this.props.user_profile(request_user_profile);
//         }, 500);
//         this.setState({
//           membership_title: "Become a EzFill Member",
//           isPopUpOpened: false,
//         });
//         this.props.membership_clear_data();
//         this.props.cancle_membership_clear_data();
//         if (
//           this.props.user_data &&
//           this.props.user_data.data &&
//           this.props.user_data.data.membershipStatus == 1
//         ) {
//           this.setState({
//             is_member: false,
//             renew_date:
//               this.props.user_data &&
//               this.props.user_data.data &&
//               this.props.user_data.data.membershipEnds,
//             membership_title: "You're a EzFill Member",
//           });
//         } else {
//           this.setState({ is_member: true });
//         }
//       }
//     }

//     ///////////////////////////////////////////////////////////

//     if (
//       this.props.is_fetching_membership_list !==
//       prevProps.is_fetching_membership_list
//     ) {
//       if (this.props.is_fetching_membership_list) {
//         if (!this.state.isApiCalled) {
//           this.setState({ loading: true });
//         }
//       } else if (!this.props.is_fetching_membership_list) {
//         this.setState({ loading: false, isApiCalled: true });
//       }
//     }

//     if (
//       this.props.is_success_membership_list !==
//       prevProps.is_success_membership_list
//     ) {
//       if (this.props.is_success_membership_list) {
//         this.setState({ isSavedVahicleApiSuccess: true });
//         // this.props.delete_Address_clear_data();
//         console.log(
//           "datatatatatata==========>",

//           this.props.user_data_membership_list.membershipEndDate
//         );
//         this.props.membership_list_clear_data();
//       }
//     }

//     if (
//       this.props.is_fetching_membership_list !==
//       prevProps.is_fetching_membership_list
//     ) {
//       if (this.props.is_fetching_membership_list) {
//         this.setState({ loading: true });
//       } else if (!this.props.is_fetching_membership_list) {
//         this.setState({ loading: false }, () => {
//           if (
//             this.props.is_success_membership_list !==
//             prevProps.is_success_membership_list
//           ) {
//             if (this.props.is_success_membership_list) {
//               console.log(
//                 "datatatatatata==========>",

//                 this.props.user_data_membership_list
//               );
//               this.props.membership_list_clear_data();
//             }
//           }
//         });
//       }
//     }

//     //////////////////////////////////////////////////////

//     if (this.props.cancel_is_fetching !== prevProps.cancel_is_fetching) {
//       if (this.props.cancel_is_fetching) {
//         this.setState({ loading: true });
//       } else if (!this.props.cancel_is_fetching) {
//         this.setState({ loading: false }, () => {
//           if (this.props.cancel_is_success !== prevProps.cancel_is_success) {
//             if (this.props.cancel_is_success) {
//               setTimeout(() => {
//                 let request_user_profile = {
//                   user_id:
//                     this.props &&
//                     this.props.user_data &&
//                     this.props.user_data.data._id,
//                 };
//                 this.props.user_profile(request_user_profile);
//               }, 500);
//               this.setState({
//                 membership_title: "Become a EzFill Member",
//                 isPopUpOpened: false,
//               });
//               this.props.membership_clear_data();
//               this.props.cancle_membership_clear_data();
//               if (
//                 this.props.user_data &&
//                 this.props.user_data.data &&
//                 this.props.user_data.data.membershipStatus == 1
//               ) {
//                 this.setState({
//                   is_member: false,
//                   renew_date:
//                     this.props.user_data &&
//                     this.props.user_data.data &&
//                     this.props.user_data.data.membershipEnds,
//                   membership_title: "You're a EzFill Member",
//                 });
//               } else {
//                 this.setState({ is_member: true });
//               }
//             }
//           }
//         });
//       }
//     }

//     console.log(JSON.stringify(this.props));
//     if (this.props.route.params != undefined) {
//       if (this.props.route.params.getmembership == true) {
//         this.props.route.params.getmembership = false;
//       } else {
//       }
//     } else {
//     }
//     if (this.props.cancel_is_success !== prevProps.cancel_is_success) {
//       console.log("cancel_is_success", this.props.cancel_is_success);
//       if (this.props.cancel_is_success == true) {
//         setTimeout(() => {
//           let request_user_profile = {
//             user_id:
//               this.props &&
//               this.props.user_data &&
//               this.props.user_data.data._id,
//           };
//           this.props.user_profile(request_user_profile);
//         }, 500);
//         this.props.membership_clear_data();
//         this.props.cancle_membership_clear_data();
//       }
//     }

//     if (
//       this.props.is_fetching_membership !== prevProps.is_fetching_membership
//     ) {
//       if (this.props.is_fetching_membership) {
//         this.setState({ loading: true });
//       } else if (!this.props.is_fetching_membership) {
//         this.setState({ loading: false }, () => {
//           if (
//             this.props.is_success_membership !== prevProps.is_success_membership
//           ) {
//             if (this.props.is_success_membership) {
//               console.log("is_success_membership_kai");
//               setTimeout(() => {
//                 let request_user_profile = {
//                   user_id:
//                     this.props &&
//                     this.props.user_data &&
//                     this.props.user_data.data._id,
//                 };
//                 this.props.user_profile(request_user_profile);
//               }, 500);
//               this.props.membership_clear_data();
//               this.props.cancle_membership_clear_data();
//             }
//           }
//         });
//       }
//     }

//     ///membership////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//     if (
//       this.props.is_fet_recurringService !== prevProps.is_fet_recurringService
//     ) {
//       if (this.props.is_fet_recurringService) {
//         if (!this.state.isApiCalled) {
//           this.setState({ loading: true });
//         }
//       } else if (!this.props.is_fet_recurringService) {
//         this.setState({ loading: false, isApiCalled: true });
//       }
//     }
//     if (
//       this.props.is_succe_recurringService !==
//       prevProps.is_succe_recurringService
//     ) {
//       if (this.props.is_succe_recurringService) {
//         // this.setState({ isSavedVahicleApiSuccess: true });
//         this.props.recurringService_clear_data();
//       }
//     }

//     if (
//       this.props.is_succe_recurringService !==
//       prevProps.is_succe_recurringService
//     ) {
//       console.log("is_succe_delete", this.props.is_succe_recurringService);
//       if (this.props.is_succe_recurringService == true) {
//         this.props.navigation.navigate("OrderHistory");
//         console.log("DATAghfjdklghfhdgfdsj====>");
//         //this.props.navigation.navigate("Dashboard");
//         // this.props.recurringService_clear_data();
//       }
//     }
//     if (
//       this.props.is_fet_recurringService !== prevProps.is_fet_recurringService
//     ) {
//       if (this.props.is_fet_recurringService) {
//         this.setState({ loading: true });
//       } else if (!this.props.is_fet_recurringService) {
//         this.setState({ loading: false }, () => {
//           if (
//             this.props.is_succe_recurringService !==
//             prevProps.is_succe_recurringService
//           ) {
//             console.log(
//               "kapildevVidua====>",
//               this.props.is_succe_recurringService
//             );
//             if (this.props.is_succe_recurringService) {
//               console.log("DATAghfjdklghfhdgfdsj====>");
//               console.log(
//                 "DATAghfjdklghfhdgfdsj====>",
//                 this.props.recurringService_data
//               );
//               console.log("DATA====>", this.props.recurringService_data);
//               // this.props.navigation.navigate("OrderHistory");

//               // this.props.recurringService_clear_data();
//             }
//           }
//         });
//       }
//     }

//     ////////////////////////////////////////////////////////////////////////////

//     if (this.props.is_fetching !== prevProps.is_fetching) {
//       if (this.props.is_fetching) {
//         this.setState({ loading: true });
//       } else if (!this.props.is_fetching) {
//         this.setState({ loading: false });
//       }
//     }

//     if (this.props.is_success !== prevProps.is_success) {
//       console.log("prevProps => " + prevProps.is_success);
//       console.log("this.props => " + this.props.is_success);

//       if (this.props.is_success == true) {
//         console.log("success => ");
//         this.setState({
//           Sussessfull: true,
//         });

//         this.props.order_create_clear_data();
//       }
//     }

//     if (
//       this.props.is_fetching_promo_code !== prevProps.is_fetching_promo_code
//     ) {
//       if (this.props.is_fetching_promo_code) {
//         this.setState({ loading: true });
//       } else if (!this.props.is_fetching_promo_code) {
//         this.setState({ loading: false }, () => {
//           if (
//             this.props.is_success_promo_code !== prevProps.is_success_promo_code
//           ) {
//             if (this.props.is_success_promo_code) {
//               console.log(
//                 "DATASSSS => " + JSON.stringify(this.props.promo_code_data.code)
//               );
//               console.log("success => ");
//               this.setState({ editable: false, isPromoCode: "yes" });

//               this.props.promo_code_clear_data();
//             }
//           }
//           if (this.props.error__promo_code !== prevProps.error__promo_code) {
//             console.log("error==>");
//             if (this.props.error__promo_code == true) {
//               this.setState({
//                 error_msg: this.props.msg_promo_code,
//                 is_error_msg_shown: true,
//               });
//               this.props.promo_code_clear_data();
//             }
//           }
//         });
//       }
//     }

//     if (this.props.is_fetching_add !== prevProps.is_fetching_add) {
//       if (this.props.is_fetching_add) {
//         this.setState({ loading: true });
//       } else if (!this.props.is_fetching_add) {
//         this.setState({ loading: false });
//       }
//     }

//     if (this.props.is_success_add !== prevProps.is_success_add) {
//       console.log("prevProps => " + prevProps.is_success_add);
//       console.log("this.props => " + this.props.is_success_add);

//       if (this.props.is_success_add == true) {
//         console.log("success => ");
//         const vehiclevalue = this.props.route.params.orderData.vehicle;
//         vehiclevalue.map((getvehicleId) => {
//           var id = getvehicleId._id;
//           vehicleid.push(id);
//         });

//         console.log("vehiclevalue => ", vehicleid);

//         // this.state.memberships
//         //   ? this.props.membership({
//         //       user_id: this.props.user_data.data._id,
//         //       cardToken: this.props.add_applepay_data.cards.id,
//         //       paymentMethod: this.props.route.params.paymentmethod,
//         //     })
//         //   : null;

//         if (
//           this.props &&
//           this.props.user_data &&
//           this.props.user_data.data.membershipStatus == 1
//         ) {
//           delivery_Fees =
//             this.props.route.params.fuelTypePrice +
//             this.props.user_data_membership_list.delivery_fee;
//         } else if (membershipdata == "no") {
//           delivery_Fees =
//             this.props.route.params.fuelTypePrice +
//             this.props.user_data_membership_list.delivery_fee;
//         } else {
//           delivery_Fees = this.props.route.params.fuelTypePrice;

//           this.props.user_data_membership_list.delivery_fee;
//           this.props.user_data_membership_list_data.price;
//         }

//         let request = {
//           user_id: this.props.route.params.orderData.user_id,
//           vehicle_id: vehicleid.toString(),

//           isPromoCode: this.state.isPromoCode,
//           promocode: this.props.promo_code_data.code,

//           deliveryFee: delivery_Fees,

//           membership: membershipdata,
//           Payment: this.props.route.params.orderData.Payment,
//           latitude: this.props.route.params.orderData.latitude,
//           longitude: this.props.route.params.orderData.longitude,
//           addressName: {
//             line1: this.props.route.params.line1,
//             line2: this.props.route.params.line2,
//             city: this.props.route.params.city,
//             zipcode: this.props.route.params.zipcode,
//             state: this.props.route.params.state,
//             type: this.props.route.params.type,
//           },
//           recurringService: this.props.route.params.orderData.recurringService,
//           schedule_date: this.props.route.params.orderData.startTime,
//           schedule_time: this.props.route.params.orderData.endTime,
//           inGarage: this.props.route.params.orderData.inGarage,
//           floor: this.props.route.params.orderData.floor,
//           additionalNotes: this.props.route.params.orderData.additionalNotes,
//           paymentMethod: this.props.route.params.paymentmethod,
//           txn_id: this.props.add_applepay_data.cards.balance_transaction,
//           cardinfo: {
//             last4: this.props.add_applepay_data.cards.payment_method_details
//               .card.last4,
//             exp_month: this.props.add_applepay_data.cards.payment_method_details
//               .card.exp_month,
//             exp_year: this.props.add_applepay_data.cards.payment_method_details
//               .card.exp_year,
//             name: this.props.add_applepay_data.cards.payment_method_details.card
//               .brand,
//           },
//           card_id: this.props.add_applepay_data.cards.id,
//         };
//         console.log("cardJeson", JSON.stringify(request));
//         this.props.order_create(request);
//       }
//     }
//   }

//   initialSetUp = () => {
//     let request_user_profile = {
//       user_id:
//         this.props && this.props.user_data && this.props.user_data.data._id,
//     };
//     this.props.user_profile(request_user_profile);
//     if (
//       this.props &&
//       this.props.user_data &&
//       this.props.user_data.data.membershipStatus == 1
//     ) {
//       this.setState({
//         is_member: false,
//       });
//     } else {
//       this.setState({ is_member: true });
//     }
//     if (this.state.isFromCheckout) {
//       this.setState({
//         deliveryFee: this.props.user_data_membership_list.delivery_fee,
//         vehicle: this.state.orderData.vehicle,
//         addressName: this.state.orderData.addressName,
//         payment_data: this.state.orderData.payment_data,
//         schedule_str:
//           moment(this.state.orderData.startTime, "YYYY-MM-DD").format(
//             "MMM Do"
//           ) +
//           " at " +
//           moment(this.state.orderData.endTime, "hh:mm").format("hA") +
//           " (" +
//           this.state.orderData.recurringService +
//           ")",
//       });
//     } else {
//       this.props.saved_vehicle_data.data.map((item) => {
//         if (this.state.orderData.vehicle_id == item._id) {
//           this.setState({ vehicle: item });
//         }
//       });
//       var dateStr = "";
//       if (this.state.orderData.recurringService != "No") {
//         dateStr =
//           moment(this.state.orderData.startTime, "YYYY-MM-DD").format(
//             "MMM Do"
//           ) +
//           " at " +
//           moment(this.state.orderData.endTime, "hh:mm").format("hA");
//         +" (" + this.state.orderData.recurringService + ")";
//       } else {
//         dateStr =
//           moment(this.state.orderData.startTime, "YYYY-MM-DD").format(
//             "MMM Do"
//           ) +
//           " at " +
//           moment(this.state.orderData.endTime, "hh:mm").format("hA");
//       }
//       if (this.state.oderHistory) {
//         this.setState({
//           deliveryFee: this.state.orderData.deliveryFee,
//           addressName: this.state.orderData.addresses[0].line1,

//           schedule_str: dateStr,
//         });
//       } else {
//         this.setState({
//           deliveryFee: this.props.user_data_membership_list.delivery_fee,
//           addressName: this.state.orderData.addressName,

//           schedule_str: dateStr,
//         });
//       }
//     }
//   };
//   async componentWillMount() {
//     let request_user_profile = {
//       user_id:
//         this.props && this.props.user_data && this.props.user_data.data._id,
//     };
//     this.props.user_profile(request_user_profile);
//     if (this.props.user_data.data.membershipStatus == 1) {
//       this.setState({
//         is_member: false,
//       });
//     } else {
//       this.setState({ is_member: true });
//     }
//     const allowed = await stripe.deviceSupportsNativePay();
//     const amexAvailable = await stripe.canMakeNativePayPayments({
//       networks: ["american_express"],
//     });
//     const discoverAvailable = await stripe.canMakeNativePayPayments({
//       networks: ["discover"],
//     });
//     const masterCardAvailable = await stripe.canMakeNativePayPayments({
//       networks: ["master_card"],
//     });
//     const visaAvailable = await stripe.canMakeNativePayPayments({
//       networks: ["visa"],
//     });
//     this.setState({
//       allowed,
//       amexAvailable,
//       discoverAvailable,
//       masterCardAvailable,
//       visaAvailable,
//     });
//   }
//   paypaldata() {
//     if (this.props.user_data.data.membershipStatus == 1) {
//       delivery_Fees =
//         this.props.route.params.fuelTypePrice +
//         this.props.user_data_membership_list.delivery_fee;
//     } else if (membershipdata == "no") {
//       delivery_Fees =
//         this.props.route.params.fuelTypePrice +
//         this.props.user_data_membership_list.delivery_fee;
//     } else {
//       delivery_Fees = this.props.route.params.fuelTypePrice;

//       this.props.user_data_membership_list.delivery_fee +
//         this.props.user_data_membership_list_data.price;
//     }
//     const vehiclevalue = this.props.route.params.orderData.vehicle;
//     vehiclevalue.map((getvehicleId) => {
//       var id = getvehicleId._id;
//       vehicleid.push(id);
//     });

//     console.log("vehiclevalue => ", vehicleid);

//     let request = {
//       user_id: this.props.route.params.orderData.user_id,
//       vehicle_id: vehicleid.toString(),
//       deliveryFee: delivery_Fees,
//       membership: membershipdata,
//       isPromoCode: this.state.isPromoCode,
//       promocode: this.props.promo_code_data.code,
//       Payment: this.props.route.params.orderData.Payment,
//       latitude: this.props.route.params.orderData.latitude,
//       longitude: this.props.route.params.orderData.longitude,
//       addressName: {
//         line1: this.props.route.params.line1,
//         line2: this.props.route.params.line2,
//         city: this.props.route.params.city,
//         zipcode: this.props.route.params.zipcode,
//         state: this.props.route.params.state,
//         type: this.props.route.params.type,
//       },
//       recurringService: this.props.route.params.orderData.recurringService,
//       schedule_date: this.props.route.params.orderData.startTime,
//       schedule_time: this.props.route.params.orderData.endTime,
//       inGarage: this.props.route.params.orderData.inGarage,
//       floor: this.props.route.params.orderData.floor,
//       additionalNotes: this.props.route.params.orderData.additionalNotes,
//       paymentMethod: this.props.route.params.paymentmethod,
//       txn_id: "",
//       cardinfo: {
//         last4: "",
//         exp_month: "",
//         exp_year: "",
//         name: "",
//       },
//       card_id: "",
//     };
//     console.log("cardJeson", JSON.stringify(request));
//     this.props.navigation.navigate("Paypal", {
//       is_selected_home: true,
//       requestData: request,
//       orderData: this.state.orderData,
//       isFromAddVehicle: this.state.isFromAddVehicle,
//       isFromMembership: this.state.isFromMembership,
//       orderData: "",
//       is_selected_home: "",
//       memberships: this.state.memberships,
//       membership: membershipdata,
//       deliveryFee: delivery_Fees,
//       line1: this.props.route.params.line1,
//       line2: this.props.route.params.line2,
//       city: this.props.route.params.city,
//       zipcode: this.props.route.params.zipcode,
//       state: this.props.route.params.state,
//       type: this.props.route.params.type,
//     });
//   }
//   handleCard() {
//     if (this.props.user_data.data.membershipStatus == 1) {
//       delivery_Fees =
//         this.props.route.params.fuelTypePrice +
//         this.props.user_data_membership_list.delivery_fee;
//     } else if (membershipdata == "no") {
//       delivery_Fees =
//         this.props.route.params.fuelTypePrice +
//         this.props.user_data_membership_list.delivery_fee;
//     } else {
//       delivery_Fees = this.props.route.params.fuelTypePrice;

//       this.props.user_data_membership_list.delivery_fee +
//         this.props.user_data_membership_list_data.price;
//     }
//     const vehiclevalue = this.props.route.params.orderData.vehicle;
//     vehiclevalue.map((getvehicleId) => {
//       var id = getvehicleId._id;
//       vehicleid.push(id);
//     });
//     console.log("vehiclevalue => ", vehicleid);

//     let request = {
//       user_id: this.props.route.params.orderData.user_id,
//       vehicle_id: vehicleid.toString(),
//       deliveryFee: delivery_Fees,
//       membership: membershipdata,
//       isPromoCode: this.state.isPromoCode,
//       promocode: this.props.promo_code_data.code,
//       Payment: this.props.route.params.orderData.Payment,
//       latitude: this.props.route.params.orderData.latitude,
//       longitude: this.props.route.params.orderData.longitude,
//       addressName: {
//         line1: this.props.route.params.line1,
//         line2: this.props.route.params.line2,
//         city: this.props.route.params.city,
//         zipcode: this.props.route.params.zipcode,
//         state: this.props.route.params.state,
//         type: this.props.route.params.type,
//       },
//       recurringService: this.props.route.params.orderData.recurringService,
//       schedule_date: this.props.route.params.orderData.startTime,
//       schedule_time: this.props.route.params.orderData.endTime,
//       inGarage: this.props.route.params.orderData.inGarage,
//       floor: this.props.route.params.orderData.floor,
//       additionalNotes: this.props.route.params.orderData.additionalNotes,
//       paymentMethod: this.props.route.params.paymentmethod,
//       txn_id: "",
//       cardinfo: {
//         last4: this.props.route.params.carddata.card_id.last4,
//         exp_month: this.props.route.params.carddata.card_id.exp_month,
//         exp_year: this.props.route.params.carddata.card_id.exp_year,
//         name: this.props.route.params.carddata.card_id.name,
//       },
//       card_id: this.props.route.params.carddata.card_id._id,
//     };
//     console.log(JSON.stringify(request));
//     this.props.order_create(request);
//   }
//   handleCompleteChange = (complete) => this.setState({ complete });

//   handleApplePayPress = async () => {
//     try {
//       const token = await stripe.paymentRequestWithNativePay(
//         {
//           requiredBillingAddressFields: ["all"],
//           requiredShippingAddressFields: ["all"],
//           shippingMethods: [
//             {
//               id: "fedex",
//               label: "FedEX",
//               detail: "Test @ 10",
//               amount: "10.00",
//             },
//           ],
//         },
//         [
//           {
//             label: "Whisky",
//             amount: "50.00",
//           },
//         ]
//       );

//       this.setState({ loading: false, token });

//       if (this.state.complete) {
//         // await stripe.completeNativePayRequest();
//         this.setState({ status: "Apple Pay payment completed" });
//         var request = {
//           customer_id: "",
//           cardToken: this.state.token.tokenId,
//           status: "1",
//           amount: "60",
//           currency: "usd",
//         };
//         this.props.add_applepay(request);
//       } else {
//         await stripe.cancelNativePayRequest();
//         this.setState({ status: "Apple Pay payment cenceled" });
//       }
//     } catch (error) {
//       this.setState({ loading: false, status: `Error: ${error.message}` });
//     }
//   };
//   payWithGooglePay = (requestData) => {
//     // Check if Google Pay is available
//     GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods).then(
//       (ready) => {
//         if (ready) {
//           // Request payment token
//           GooglePay.requestPayment(requestData)
//             .then(this.handleSuccess)
//             .catch(this.handleError);
//         }
//       }
//     );
//   };
//   handleSuccess = (token) => {
//     const tokendata = JSON.parse(token);
//     var request = {
//       customer_id: "",
//       cardToken: tokendata.id,
//       status: "1",
//       amount: "60",
//       currency: "usd",
//     };

//     console.log(request);
//     this.props.add_applepay(request);
//   };
//   handleError = (error) =>
//     console.log("Error", `${error.code}\n${error.message}`);

//   render() {
//     return (
//       <SafeAreaContainer
//         title={this.state.title}
//         bodyTxt={this.state.bodyTxt}
//         isModalOpened={this.state.isPopUpOpened}
//         onDismiss={() => {
//           this.setState({ isPopUpOpened: false });
//         }}
//       >
//         <Loader loading={this.state.loading} />

//         <ScrollView style={styles.container}>
//           <View
//             style={{
//               backgroundColor: "#F3F4F6",
//               alignItems: "center",
//               justifyContent: "center",
//               borderBottomColor: "#E6E6E8",
//               borderBottomWidth: 1,
//               borderTopColor: "#E6E6E8",
//               borderTopWidth: 1,
//             }}
//           >
//             <View
//               style={{
//                 height: 80,
//                 width: "86%",
//                 justifyContent: "center",
//                 borderBottomColor: "#E6E6E8",
//                 borderBottomWidth: 1,
//               }}
//             >
//               <View
//                 style={{
//                   width: "100%",
//                   flexDirection: "row",
//                   justifyContent: "center",
//                 }}
//               >
//                 <View style={{ flex: 1, justifyContent: "center" }}>
//                   <Text
//                     style={{
//                       color: "#000",
//                       fontFamily: "Avenir",
//                       fontSize: 12,
//                       fontWeight: "700",
//                     }}
//                   >
//                     Delivery Fee
//                   </Text>
//                 </View>
//                 {this.state.membership == this.state.membership ? (
//                   this.state.Delivery_fee ? (
//                     <View style={{ flexDirection: "row" }}>
//                       <View>
//                         <Text
//                           style={{
//                             color: "#80859F",
//                             marginLeft: 10,
//                             fontFamily: "Avenir",
//                             fontSize: 16,
//                             fontWeight: "700",
//                             textDecorationLine: "line-through",
//                           }}
//                         >
//                           ${this.state.deliveryFee}
//                         </Text>
//                       </View>
//                       <Text
//                         style={{
//                           color: "#000",
//                           marginLeft: 10,
//                           fontFamily: "Avenir",
//                           fontSize: 16,
//                           fontWeight: "700",
//                         }}
//                       >
//                         $0.00
//                       </Text>
//                     </View>
//                   ) : (
//                     <Text
//                       style={{
//                         color: "#000",
//                         marginLeft: 10,
//                         fontFamily: "Avenir",
//                         fontSize: 16,
//                         fontWeight: "700",
//                       }}
//                     >
//                       ${this.state.deliveryFee}
//                     </Text>
//                   )
//                 ) : (
//                   <View style={{ flexDirection: "row" }}>
//                     <Text
//                       style={{
//                         color: "#80859F",
//                         marginLeft: 10,
//                         fontFamily: "Avenir",
//                         fontSize: 16,
//                         fontWeight: "700",
//                         textDecorationLine: "line-through",
//                       }}
//                     >
//                       ${this.state.deliveryFee}
//                     </Text>
//                     <Text
//                       style={{
//                         color: "#000",
//                         marginLeft: 10,
//                         fontFamily: "Avenir",
//                         fontSize: 16,
//                         fontWeight: "700",
//                       }}
//                     >
//                       $0.00
//                     </Text>
//                   </View>
//                 )}
//               </View>
//               <Modal
//                 animated={false}
//                 animationType="none"
//                 transparent={true}
//                 visible={this.state.isVisible}
//                 onRequestClose={() => {
//                   console.log("Modal has been closed.");
//                 }}
//               >
//                 {/*All views of Modal*/}
//                 <View
//                   style={{
//                     flex: 1,
//                     justifyContent: "flex-end",
//                     alignItems: "center",
//                     backgroundColor: "rgba(0,0,0,0.7)",
//                   }}
//                 >
//                   <View
//                     style={{
//                       backgroundColor: "#fff",
//                       width: CONST.DEVICE_WIDTH - 40,
//                       borderRadius: 5,
//                     }}
//                   >
//                     <Text
//                       style={{
//                         color: "#000",
//                         fontSize: 20,
//                         fontWeight: "bold",
//                         fontFamily: "Avenir",
//                         width: "86%",
//                         marginTop: 20,
//                         alignSelf: "center",
//                         textAlign: "left",
//                       }}
//                       allowFontScaling={false}
//                     >
//                       Become a EzFill Member
//                     </Text>
//                     <Text
//                       style={{
//                         color: "#FF7000",
//                         fontSize: 20,
//                         fontWeight: "bold",
//                         fontFamily: "Avenir",
//                         width: "86%",

//                         alignSelf: "center",
//                         textAlign: "left",
//                       }}
//                       allowFontScaling={false}
//                     >
//                       for only $
//                       {this.props.user_data_membership_list_data.price} a month
//                     </Text>

//                     <FlatList
//                       style={{ width: "100%", marginTop: 15 }}
//                       data={this.props.user_data_membership_list_data.plans}
//                       keyExtractor={(item, index) => index.toString()}
//                       renderItem={({ item }) => {
//                         return (
//                           <View
//                             style={{
//                               flexDirection: "row",
//                               width: "100%",
//                               height: 30,
//                             }}
//                           >
//                             <Image
//                               style={{
//                                 height: 20,
//                                 width: 20,
//                                 resizeMode: "contain",
//                                 marginLeft: 24,
//                               }}
//                               source={AssetsImages.icon_check}
//                             />
//                             <Text
//                               style={{
//                                 color: "#80859F",
//                                 marginLeft: 10,
//                                 fontFamily: "Avenir",
//                                 fontSize: 16,
//                               }}
//                             >
//                               {item.title}
//                             </Text>
//                           </View>
//                         );
//                       }}
//                     />
//                     <View>
//                       <TxtFullScreenBtn
//                         title={"ADD  MEMBERSHIP TO CHECKOUT"}
//                         onPress={() => {
//                           this.setState({
//                             isVisible: !this.state.isVisible,
//                             membership: "yes",
//                             memberships: false,
//                             is_member: false,
//                             Delivery_fee: true,
//                           });
//                           membershipdata = "yes";
//                           // this.props.cancel_membership({
//                           //   user_id: this.props.user_data.data._id,
//                           // });
//                           this.props.route.params.paymentmethod == "google_pay"
//                             ? this.payWithGooglePay(stripeRequestData)
//                             : this.props.route.params.paymentmethod ==
//                               "apple_pay"
//                             ? this.handleApplePayPress()
//                             : this.props.route.params.paymentmethod == "paypal"
//                             ? this.paypaldata()
//                             : this.props.route.params.paymentmethod == "card"
//                             ? this.handleCard()
//                             : null;
//                         }}
//                         disabled={false}
//                         containerStyle={{
//                           backgroundColor: "#FF5C22",
//                           marginTop: 20,
//                         }}
//                       />
//                       <TxtFullScreenBtn
//                         title={"NO THANKS"}
//                         onPress={() => {
//                           this.setState({
//                             isVisible: !this.state.isVisible,
//                             membership: "no",
//                             memberships: true,
//                             is_member: false,
//                           });
//                           membershipdata = "no";
//                           // this.props.cancel_membership({
//                           //   user_id: this.props.user_data.data._id,
//                           // });
//                           this.props.route.params.paymentmethod == "google_pay"
//                             ? this.payWithGooglePay(stripeRequestData)
//                             : this.props.route.params.paymentmethod ==
//                               "apple_pay"
//                             ? this.handleApplePayPress()
//                             : this.props.route.params.paymentmethod == "paypal"
//                             ? this.paypaldata()
//                             : this.props.route.params.paymentmethod == "card"
//                             ? this.handleCard()
//                             : null;
//                         }}
//                         // disabled={false}
//                         containerStyle={{
//                           backgroundColor: "#00000000",
//                           marginTop: 10,
//                           marginBottom: 20,
//                           borderColor: "#747A93",
//                           borderWidth: 1,
//                         }}
//                         fontColor={"#747A93"}
//                       />
//                     </View>
//                   </View>
//                 </View>
//               </Modal>
//               <Modal
//                 animated={false}
//                 animationType="none"
//                 transparent={true}
//                 visible={this.state.isPopUpOpeneds}
//                 onRequestClose={() => {
//                   console.log("Modal has been closed.");
//                 }}
//               >
//                 <View
//                   style={{
//                     flex: 1,
//                     justifyContent: "flex-end",
//                     alignItems: "center",
//                     backgroundColor: "rgba(0,0,0,0.7)",
//                   }}
//                 >
//                   <View
//                     style={{
//                       backgroundColor: "#fff",
//                       width: CONST.DEVICE_WIDTH - 40,
//                       borderRadius: 5,
//                     }}
//                   >
//                     <Text
//                       style={{
//                         color: "#000",
//                         fontSize: 20,
//                         fontWeight: "bold",
//                         fontFamily: "Avenir",
//                         width: "86%",
//                         marginTop: 20,
//                         alignSelf: "center",
//                         textAlign: "left",
//                       }}
//                       allowFontScaling={false}
//                     >
//                       Service Scheduled
//                     </Text>
//                     <Text
//                       style={{
//                         color: "#747A93",
//                         fontSize: 14,
//                         width: "86%",
//                         marginTop: 10,
//                         alignSelf: "center",
//                         textAlign: "left",
//                         lineHeight: 23,
//                         fontFamily: "Avenir",
//                       }}
//                       allowFontScaling={false}
//                     >
//                       {
//                         "Your service has been ordered.\nDon’t forget to leave your gas door open."
//                       }
//                     </Text>
//                     <Image
//                       style={{ width: "100%", height: 180, marginTop: 10 }}
//                       source={AssetsImages.bitmap}
//                     />
//                     <TxtFullScreenBtn
//                       title={"CLOSE"}
//                       onPress={() => {
//                         this.props.navigation.navigate("Dashboard", {
//                           oder_success: true,
//                           orderData: this.state.orderData,
//                           isFromCheckout: true,
//                         });
//                         this.setState({
//                           isPopUpOpeneds: !this.state.isPopUpOpeneds,
//                         });
//                       }}
//                       disabled={false}
//                       containerStyle={{
//                         backgroundColor: "#FF5C22",
//                         marginTop: 20,
//                         marginBottom: 20,
//                       }}
//                     />
//                   </View>
//                 </View>
//               </Modal>
//               <Modal
//                 animated={false}
//                 animationType="none"
//                 transparent={true}
//                 visible={this.state.Sussessfull}
//                 onRequestClose={() => {
//                   console.log("Modal has been closed.");
//                 }}
//               >
//                 {/*All views of Modal*/}
//                 <View
//                   style={{
//                     flex: 1,
//                     justifyContent: "center",
//                     alignItems: "center",
//                     backgroundColor: "rgba(0,0,0,0.7)",
//                   }}
//                 >
//                   <View
//                     style={{
//                       backgroundColor: "#fff",
//                       width: CONST.DEVICE_WIDTH - 100,
//                       borderRadius: 5,
//                     }}
//                   >
//                     <Icon
//                       style={{
//                         marginTop: 15,

//                         justifyContent: "center",
//                         alignSelf: "center",
//                         fontSize: 45,
//                         color: "#FF5C22",
//                       }}
//                       name="check-circle"
//                       type="FontAwesome5"
//                     />
//                     <Text
//                       style={{
//                         color: "#000",
//                         fontSize: 18,
//                         fontWeight: "bold",
//                         fontFamily: "Avenir",
//                         justifyContent: "center",
//                         marginTop: 10,
//                         alignSelf: "center",
//                         textAlign: "left",
//                       }}
//                       allowFontScaling={false}
//                     >
//                       Order placed.
//                     </Text>
//                     <Text
//                       style={{
//                         color: "#FF7000",
//                         fontSize: 15,
//                         fontWeight: "bold",
//                         fontFamily: "Avenir",
//                         justifyContent: "center",
//                         marginTop: 3,

//                         alignSelf: "center",
//                         textAlign: "left",
//                       }}
//                       allowFontScaling={false}
//                     >
//                       Your Order placed successfully.
//                     </Text>

//                     <View>
//                       <TxtFullScreenBtn
//                         title={"OK"}
//                         onPress={() => {
//                           this.setState({
//                             isPopUpOpeneds: true,
//                             Sussessfull: !this.state.Sussessfull,
//                           });
//                           this.props.promo_code_clear_data();
//                         }}
//                         disabled={false}
//                         containerStyle={{
//                           backgroundColor: "#FF5C22",
//                           marginTop: 20,
//                           marginBottom: 20,
//                           height: 30,
//                           width: "50%",
//                         }}
//                       />
//                     </View>
//                   </View>
//                 </View>
//               </Modal>
//               <Modal
//                 animated={false}
//                 animationType="none"
//                 transparent={true}
//                 visible={this.state.promo_codes}
//                 onRequestClose={() => {
//                   console.log("Modal has been closed.");
//                 }}
//               >
//                 {/*All views of Modal*/}
//                 <View
//                   style={{
//                     flex: 1,
//                     justifyContent: "center",
//                     alignItems: "center",
//                     backgroundColor: "rgba(0,0,0,0.7)",
//                   }}
//                 >
//                   <View
//                     style={{
//                       backgroundColor: "#fff",
//                       width: CONST.DEVICE_WIDTH - 100,
//                       borderRadius: 5,
//                     }}
//                   >
//                     <TouchableHighlight
//                       style={{
//                         position: "absolute",
//                         top: -15,
//                         right: -8,
//                         backgroundColor: "#fff",
//                         borderRadius: 30,
//                       }}
//                       onPress={() => {
//                         this.setState({ promo_codes: false });
//                       }}
//                     >
//                       <Image
//                         style={{ width: 40, height: 40 }}
//                         source={AssetsImages.icon_delete}
//                       />
//                     </TouchableHighlight>
//                     <Text
//                       style={{
//                         color: "#000",
//                         fontSize: 20,
//                         fontWeight: "bold",
//                         fontFamily: "Avenir",
//                         width: "80%",
//                         marginTop: 20,
//                         alignSelf: "center",
//                         textAlign: "left",
//                       }}
//                       allowFontScaling={false}
//                     >
//                       Have a promo code?
//                     </Text>
//                     <HeaderTxt title={"Promo code"} marginTop={30} />

//                     <TextInput
//                       style={{
//                         height: 44,
//                         width: "86%",
//                         borderRadius: 5,
//                         borderColor: Colors.InputText,
//                         borderWidth: 1,
//                         paddingLeft: 10,

//                         fontSize: 14,
//                         color: Colors.Black,
//                         alignSelf: "center",
//                         marginTop: 8,
//                       }}
//                       placeholder=""
//                       placeholderTextColor={Colors.Black}
//                       value={this.state.promo_cods}
//                       onChangeText={(text) => {
//                         this.setState({ promo_cods: text }, () => {
//                           if (this.state.promo_cods >= 2) {
//                             this.setState({ is_btn_disabled: false });
//                           }
//                         });
//                       }}
//                       onBlur={() => {
//                         // this.validation()
//                       }}
//                       onPressSubmit={() => {
//                         this.setState({ keyboardVerticalOffsetValue: 0 });
//                       }}
//                     />
//                     {this.state.is_error_msg_shown ? (
//                       <ErrorContainer error_msg={this.state.error_msg} />
//                     ) : null}
//                     <TxtFullScreenBtn
//                       title={"PROMO CODE"}
//                       onPress={() => {
//                         //

//                         let request = {
//                           promocode: this.state.promo_cods,
//                         };
//                         this.props.promo_code(request);
//                         console.log("kapilPromode", request);
//                       }}
//                       disabled={this.state.is_btn_disabled ? true : false}
//                       containerStyle={{
//                         backgroundColor: this.state.is_btn_disabled
//                           ? Colors.disable
//                           : Colors.OrangeRed,
//                         marginTop: 25,
//                         marginBottom: 20,
//                       }}
//                     />
//                   </View>
//                 </View>
//               </Modal>
//               {this.state.membershipTest ? (
//                 this.state.Delivery_fee ? (
//                   <Text
//                     style={{
//                       fontSize: 10,
//                       color: Colors.LightGray,
//                       fontWeight: "bold",
//                       fontFamily: "Avenir",
//                       alignSelf: "flex-end",
//                       marginTop: 5,
//                     }}
//                   >
//                     Free delivery with membership
//                   </Text>
//                 ) : (
//                   <Text
//                     style={{
//                       fontSize: 10,
//                       color: "#FF5C22",
//                       fontWeight: "bold",
//                       fontFamily: "Avenir",
//                       alignSelf: "flex-end",
//                       marginTop: 5,
//                     }}
//                   >
//                     Become a member for unlimited free delivery
//                   </Text>
//                 )
//               ) : (
//                 <Text
//                   style={{
//                     fontSize: 10,
//                     color: Colors.LightGray,
//                     fontWeight: "bold",
//                     fontFamily: "Avenir",
//                     alignSelf: "flex-end",
//                     marginTop: 5,
//                   }}
//                 >
//                   Free delivery with membership
//                 </Text>
//               )}
//             </View>
//             <View
//               style={{
//                 height: 80,
//                 width: "86%",
//                 justifyContent: "center",
//                 borderBottomColor: "#E6E6E8",
//                 borderBottomWidth: 1,
//               }}
//             >
//               <View
//                 style={{
//                   width: "100%",
//                   flexDirection: "row",
//                   justifyContent: "center",
//                 }}
//               >
//                 <View style={{ flex: 1, justifyContent: "center" }}>
//                   <Text
//                     style={{
//                       color: "#000",
//                       fontFamily: "Avenir",
//                       fontSize: 12,
//                       fontWeight: "700",
//                     }}
//                   >
//                     Fuel Types
//                   </Text>
//                 </View>
//                 {/* <Text style={{ color: "#80859F", marginLeft: 10, fontFamily: "Avenir", fontSize: 16, fontWeight: '700', textDecorationLine: 'line-through' }}>$1.99</Text> */}
//                 <Text
//                   style={{
//                     color: "#000",
//                     marginLeft: 10,
//                     fontFamily: "Avenir",
//                     fontSize: 16,
//                     fontWeight: "700",
//                   }}
//                 >
//                   {this.state.vehicle.fuel_type}
//                 </Text>
//                 <Text
//                   style={{
//                     color: "#000",
//                     marginLeft: 10,
//                     fontFamily: "Avenir",
//                     fontSize: 16,
//                     fontWeight: "700",
//                   }}
//                 >
//                   ${this.props.route.params.fuelTypePrice}
//                 </Text>
//               </View>
//               <Text
//                 style={{
//                   fontSize: 10,
//                   color: "#80859F",
//                   fontWeight: "bold",
//                   fontFamily: "Avenir",
//                   alignSelf: "flex-end",
//                   marginTop: 5,
//                 }}
//               >
//                 {this.state.vehicle.make}
//               </Text>
//             </View>

//             {this.state.membership != "no" ? (
//               <View
//                 style={{ height: 80, width: "86%", justifyContent: "center" }}
//               >
//                 <View
//                   style={{
//                     width: "100%",
//                     flexDirection: "row",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <View style={{ flex: 1, justifyContent: "center" }}>
//                     <Text
//                       style={{
//                         color: "#000",
//                         fontFamily: "Avenir",
//                         fontSize: 12,
//                         fontWeight: "700",
//                       }}
//                     >
//                       Membership
//                     </Text>
//                   </View>
//                   {/* <Text style={{ color: "#80859F", marginLeft: 10, fontFamily: "Avenir", fontSize: 16, fontWeight: '700', textDecorationLine: 'line-through' }}>$1.99</Text> */}
//                   <Text
//                     style={{
//                       color: "#000",
//                       marginLeft: 10,
//                       fontFamily: "Avenir",
//                       fontSize: 16,
//                       fontWeight: "700",
//                     }}
//                   >
//                     $9.99 a month
//                   </Text>
//                 </View>
//                 <Text
//                   style={{
//                     fontSize: 10,
//                     color: "#80859F",
//                     fontWeight: "bold",
//                     fontFamily: "Avenir",
//                     alignSelf: "flex-end",
//                     marginTop: 5,
//                   }}
//                 >
//                   Recurring on the date
//                 </Text>
//               </View>
//             ) : null}
//           </View>
//           <HeaderTxt title={"Address"} marginTop={16} />

//           <View
//             style={{
//               flexDirection: "row",
//               width: "86%",
//               borderWidth: 1,
//               borderColor: "#D9DAE3",
//               borderRadius: 4,
//               alignItems: "center",
//               alignSelf: "center",
//               height: 44,
//               marginTop: 8,
//             }}
//           >
//             <Text
//               style={{
//                 color: "#000",
//                 marginLeft: 10,
//                 fontFamily: "Avenir",
//                 fontSize: 12,
//                 fontWeight: "700",
//               }}
//             >
//               {this.state.addressName}
//             </Text>
//           </View>

//           {this.state.isFromCheckout ? (
//             <View>
//               <HeaderTxt title={"Payment Method"} marginTop={16} />
//               <View
//                 style={{
//                   flexDirection: "row",
//                   width: "86%",
//                   borderWidth: 1,
//                   borderColor: "#D9DAE3",
//                   borderRadius: 4,
//                   alignItems: "center",
//                   alignSelf: "center",
//                   height: 44,
//                   marginTop: 8,
//                 }}
//               >
//                 <View style={{ alignItems: "center", width: 60 }}>
//                   <Image
//                     source={
//                       this.props.route.params.paymentmethod == "google_pay"
//                         ? AssetsImages.payment_google
//                         : this.props.route.params.paymentmethod == "apple_pay"
//                         ? AssetsImages.payment_apple
//                         : this.props.route.params.paymentmethod == "paypal"
//                         ? AssetsImages.payment_paypal
//                         : this.props.route.params.paymentmethod == "card"
//                         ? AssetsImages.creditcard
//                         : null
//                     }
//                     style={{
//                       resizeMode: "contain",
//                       marginLeft: 10,
//                       height: 16,
//                     }}
//                   />
//                 </View>
//                 {this.props.route.params.paymentmethod == "card" ? (
//                   <Text
//                     style={{
//                       fontSize: 14,
//                       fontWeight: "500",
//                       fontFamily: "Avenir",
//                     }}
//                   >
//                     {this.props.route.params.carddata.card_id.last4}
//                   </Text>
//                 ) : null}

//                 {this.props.route.params.paymentmethod == "card" ? (
//                   <Text
//                     style={{
//                       marginLeft: 10,
//                       fontSize: 13,
//                       fontWeight: "700",
//                       fontFamily: "Avenir",
//                       color: "#8B90AA",
//                     }}
//                   >
//                     {"EXP " +
//                       this.props.route.params.carddata.card_id.exp_month +
//                       "/" +
//                       this.props.route.params.carddata.card_id.exp_year}
//                   </Text>
//                 ) : null}
//               </View>
//             </View>
//           ) : null}
//           <HeaderTxt title={"Service Time / Date"} marginTop={16} />
//           <View
//             style={{
//               flexDirection: "row",
//               width: "86%",
//               borderWidth: 1,
//               borderColor: "#D9DAE3",
//               borderRadius: 4,
//               alignItems: "center",
//               alignSelf: "center",
//               height: 44,
//               marginTop: 8,
//             }}
//           >
//             <Text
//               style={{
//                 color: "#000",
//                 marginLeft: 10,
//                 fontFamily: "Avenir",
//                 fontSize: 12,
//                 fontWeight: "700",
//               }}
//             >
//               {this.state.schedule_str}
//             </Text>
//           </View>

//           {this.state.isFromCheckout ? (
//             <TouchableOpacity>
//               <HeaderTxt title={"Promo code"} marginTop={16} />

//               <View
//                 style={{
//                   flexDirection: "row",
//                   width: "86%",

//                   paddingLeft: 10,
//                   height: 44,
//                   marginTop: 8,
//                 }}
//               >
//                 <View
//                   style={{
//                     width: "86%",

//                     borderRadius: 4,
//                     alignItems: "center",
//                     alignSelf: "center",
//                     height: 44,
//                   }}
//                 >
//                   <TextInput
//                     style={{
//                       height: 44,
//                       width: "86%",
//                       borderRadius: 5,
//                       borderColor: Colors.InputText,
//                       borderWidth: 1,
//                       padding: 10,
//                       fontSize: 14,
//                       // color: Colors.Black,
//                       alignSelf: "center",
//                     }}
//                     placeholder=""
//                     placeholderTextColor={Colors.Black}
//                     value={this.state.promo_cods}
//                     editable={this.state.editable}
//                     onChangeText={(text) => {
//                       this.setState({ promo_cods: text }, () => {
//                         if (this.state.promo_cods >= 2) {
//                           this.setState({ is_btn_disabled: false });
//                         }
//                       });
//                     }}
//                     onBlur={() => {
//                       // this.validation()
//                     }}
//                     onPressSubmit={() => {
//                       this.setState({ keyboardVerticalOffsetValue: 0 });
//                     }}
//                   />
//                   {this.state.is_error_msg_shown ? (
//                     <ErrorContainer error_msg={this.state.error_msg} />
//                   ) : null}
//                 </View>
//                 <TxtFullScreenBtn
//                   title={"ADD"}
//                   onPress={() => {
//                     //

//                     let request = {
//                       promocode: this.state.promo_cods,
//                     };
//                     this.props.promo_code(request);
//                     console.log("kapilPromode", request);
//                   }}
//                   disabled={this.state.is_btn_disabled ? true : false}
//                   containerStyle={{
//                     backgroundColor: this.state.is_btn_disabled
//                       ? Colors.disable
//                       : Colors.OrangeRed,
//                     width: "20%",
//                     height: "100%",
//                   }}
//                 />
//               </View>
//             </TouchableOpacity>
//           ) : null}
//           <View
//             style={{
//               flexDirection: "row",
//               width: "85%",
//               alignItems: "center",
//               justifyContent: "flex-start",
//               alignSelf: "center",
//               height: 44,
//               marginTop: 20,
//             }}
//           >
//             {this.state.remove ? (
//               <TouchableOpacity
//                 onPress={() => {
//                   this.props.recurringService({
//                     order_id: this.state.order_id,
//                   });
//                 }}
//                 style={{
//                   flexDirection: "row",
//                   borderRadius: 5,
//                   borderColor: "#FF5C22",
//                   width: "100%",
//                   backgroundColor: "#FF5C22",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   alignSelf: "center",
//                   height: 44,
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: "#FFF",

//                     fontFamily: "Avenir",
//                     fontSize: 15,
//                     fontWeight: "700",
//                   }}
//                 >
//                   REMOVE RECURRING SERVICE
//                 </Text>
//               </TouchableOpacity>
//             ) : null}
//           </View>
//         </ScrollView>
//         {this.state.isFromCheckout ? (
//           <View>
//             {this.props &&
//             this.props.user_data &&
//             this.props.user_data.data.membershipStatus == 1 ? (
//               <TxtFullScreenBtn
//                 title={"CHECKOUT"}
//                 onPress={() => {
//                   //  this.setState({
//                   //    membership: this.state.membership,
//                   //    memberships: true,
//                   //    is_member: false,
//                   //  });
//                   this.props.route.params.paymentmethod == "google_pay"
//                     ? this.payWithGooglePay(stripeRequestData)
//                     : this.props.route.params.paymentmethod == "apple_pay"
//                     ? this.handleApplePayPress()
//                     : this.props.route.params.paymentmethod == "paypal"
//                     ? this.paypaldata()
//                     : this.props.route.params.paymentmethod == "card"
//                     ? this.handleCard()
//                     : null;
//                 }}
//                 disabled={this.state.is_btn_disabled}
//                 containerStyle={{
//                   backgroundColor: this.state.is_btn_disabled
//                     ? "#D1D2D4"
//                     : "#FF5C22",
//                   marginTop: 10,
//                   marginBottom: 16,
//                 }}
//               />
//             ) : (
//               <TxtFullScreenBtn
//                 title={"CHECKOUT"}
//                 onPress={() => {
//                   this.setState({ isVisible: true, memberships: true });
//                 }}
//                 disabled={this.state.is_btn_disabled}
//                 containerStyle={{
//                   backgroundColor: this.state.is_btn_disabled
//                     ? "#D1D2D4"
//                     : "#FF5C22",
//                   marginTop: 10,
//                   marginBottom: 16,
//                 }}
//               />
//             )}
//           </View>
//         ) : null}
//       </SafeAreaContainer>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch) => ({
//   order_create: (request_data) => dispatch(order_create(request_data)),
//   order_create_clear_data: () => dispatch(order_create_clear_data()),

//   promo_code: (request_data) => dispatch(promo_code(request_data)),
//   promo_code_clear_data: () => dispatch(promo_code_clear_data()),

//   add_applepay: (request_data) => dispatch(add_applepay(request_data)),
//   add_applepay_clear_data: () => dispatch(add_applepay_clear_data()),

//   recurringService: (request_data) => dispatch(recurringService(request_data)),
//   recurringService_clear_data: () => dispatch(recurringService_clear_data()),

//   membership: (request_data) => dispatch(membership(request_data)),
//   membership_clear_data: () => dispatch(membership_clear_data()),
//   cancel_membership: (request_data) =>
//     dispatch(cancel_membership(request_data)),
//   cancle_membership_clear_data: () => dispatch(cancle_membership_clear_data()),
//   user_profile: (request_data) => dispatch(user_profile(request_data)),

//   membership_list_clear_data: () => dispatch(membership_list_clear_data()),
//   membership_list: (request_data) => dispatch(membership_list(request_data)),
// });

// const mapStateToProps = (state) => ({
//   is_success: state.order_create.is_success,
//   is_fetching: state.order_create.is_fetching,
//   msg: state.order_create.msg,

//   is_success_promo_code: state.promo_code.is_success,
//   is_fetching_promo_code: state.promo_code.is_fetching,
//   error__promo_code: state.promo_code.error,
//   msg_promo_code: state.promo_code.msg,
//   promo_code_data: state.promo_code.promo_code_data,

//   is_success_add: state.add_applepay.is_success,
//   is_fetching_add: state.add_applepay.is_fetching,
//   msg: state.add_applepay.msg,
//   error: state.add_applepay.error,
//   add_applepay_data: state.add_applepay.add_applepay_data,

//   saved_vehicle_data: state.saved_vehicle.saved_vehicle_data,

//   create_card_data_membership: state.membership.membership_data,
//   is_success_membership: state.membership.is_success,
//   is_fetching_membership: state.membership.is_fetching,
//   msg_membership: state.membership.msg,
//   error_membership: state.membership.error,
//   create_cancel_data: state.cancel_mambership.cancel_membership_data,
//   cancel_is_success: state.cancel_mambership.is_success,
//   cancel_is_fetching: state.cancel_mambership.is_fetching,
//   cancel_msg: state.cancel_mambership.msg,
//   cancel_error: state.cancel_mambership.error,
//   user_data: state.user_auth.user_data,

//   is_succe_recurringService: state.recurringService.is_success,
//   recurringService_data: state.recurringService.recurringService_data,
//   is_fet_recurringService: state.recurringService.is_fetching,
//   err_recurringService: state.recurringService.error,

//   is_success_membership_list: state.membership_list.is_success,
//   is_fetching_membership_list: state.membership_list.is_fetching,
//   msg_membership_list: state.membership_list.msg,
//   user_data_membership_list: state.membership_list.membership_list_data,
//   user_data_membership_list_data: state.membership_list.memberships_list_data,
// });

// export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Keyboard,
  Button,
  Modal,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Icon } from "native-base";
import { CONST } from "../../utils/constants";
import BtnWithImage from "../../components/btn_with_image";
import AssetsImages from "../../res";
import SafeAreaContainer from "../../components/safearea_container";
import styles from "./styles";
import ErrorContainer from "../../components/error_container";
import HeaderTxt from "../../components/header_txt";
import { connect } from "react-redux";
import {
  order_create,
  order_create_clear_data,
  add_applepay,
  add_applepay_clear_data,
  promo_code,
  promo_code_clear_data,
  membership_clear_data,
  membership,
  cancel_membership,
  recurringService,
  recurringService_clear_data,
  user_profile,
  cancle_membership_clear_data,
  membership_list,
  membership_list_clear_data,
} from "../../redux/actions";
import Loader from "../../components/loader";
import TxtFullScreenBtn from "../../components/txt_full_screen_btn";
import moment from "moment";
import stripe from "tipsi-stripe";
stripe.setOptions({
  publishableKey: "pk_test_AUrE92WoAMzjQEn4fThEEkzR",
  merchantId: "merchant.com.ezfillapp.consumer",
  androidPayMode: "test",
});
import Colors from "../../constants/Colors";
import { GooglePay } from "react-native-google-pay";
const allowedCardNetworks = ["AMEX", "DISCOVER", "JCB", "MASTERCARD", "VISA"];
const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];
const stripeRequestData = {
  cardPaymentMethod: {
    tokenizationSpecification: {
      type: "PAYMENT_GATEWAY",
      gateway: "stripe",
      gatewayMerchantId: "13474330361229841865",
      stripe: {
        publishableKey: "pk_test_AUrE92WoAMzjQEn4fThEEkzR",
        version: "2018-11-08",
      },
    },
    allowedCardNetworks,
    allowedCardAuthMethods,
  },
  transaction: {
    totalPrice: "1",
    totalPriceStatus: "FINAL",
    currencyCode: "INR",
  },
  merchantName: "Ezfill holdings Inc",
};
import {
  FreshChat_APP_ID,
  FreshChat_APP_KEY,
  PROJECT_TOKEN,
  API_secret,
} from "../../api/api_config";
import {
  Freshchat,
  FreshchatConfig,
  FaqOptions,
  ConversationOptions,
  FreshchatUser,
  FreshchatMessage,
  FreshchatNotificationConfig,
} from "react-native-freshchat-sdk";
var delivery_Fees = "";
var vehicleid = [];
var membershipdata = "";
var delivery_price = "";
class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,
      loading: false,
      Sussessfull: false,
      addressName: "",
      isFromCheckout: false,
      isPopUpOpeneds: false,
      promo_codes: false,
      promo_cods: "",
      deliveryFee: "",
      Delivery_fee: false,
      membership: "no",
      fuelTypePrice: "",
      isPromoCode: "no",
      remove: false,
      editable: true,
      vehicle: {},
      is_member: true,
      memberships: true,
      payment_data: {},
      isVisible: false, //state of modal default false
      orderData: {},
      schedule_str: "",
      error_msg:
        "Please check that you've added a valid email\naddress and password.",
      is_error_msg_shown: false,
      allowed: false,
      complete: true,
      order_id: "",
      status: null,
      token: null,
      amexAvailable: false,
      membershipTest: false,
      discoverAvailable: false,
      masterCardAvailable: false,
      visaAvailable: false,
      oderHistory: false,
      membership_plan: "$9.99",
      plan_includes: [
        {
          title: "Free Deliveries",
          isAdded: true,
        },
        {
          title: "Weekly Refueling Schedule",
          isAdded: true,
        },
        {
          title: "Tire Air Pressure Check",
          isAdded: true,
        },
        {
          title: "24/7 Customer Support",
          isAdded: true,
        },
        {
          title: "Cancel Anytime!",
          isAdded: true,
        },
      ],
    };
  }

  //TODO:- class life cycle
  componentDidMount() {
    let request_user_profile = { user_id: this.props.user_data.data._id };
    this.props.membership_list(request_user_profile);
    this.props.user_profile(request_user_profile);
    if (this.props.user_data.data.membershipStatus == 1) {
      this.setState({
        is_member: false,
        membershipTest: false,
      });
    } else {
      this.setState({ is_member: true, membershipTest: true });
    }
    console.log(
      "DATASSSS => " + JSON.stringify(this.props.promo_code_data.code)
    );
    // Set the environment before the payment request
    if (Platform.OS === "android") {
      GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);
    }
    this.setState(
      { isFromCheckout: this.props.route.params.isFromCheckout },
      () => {
        this.props.navigation.setOptions({
          headerTitle: this.state.isFromCheckout ? "Checkout" : "Order",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 26,
            fontFamily: "Avenir",
            alignSelf: "center",
          },
          headerLeft: () => (
            <BtnWithImage
              img={AssetsImages.icon_back}
              btnImgStyle={{ height: 22, width: 22 }}
              onPress={() => {
                this.props.navigation.goBack();
              }}
              btnStyle={{ marginLeft: 8 }}
            />
          ),
          headerRight: () => (
            <BtnWithImage
              img={AssetsImages.icon_chat}
              btnImgStyle={{ height: 18, width: 18 }}
              onPress={() => {
                Freshchat.showFAQs();
                //this.setupUserFreshchat;
                // this.resetUserFreshchat;
                Freshchat.showConversations();
                // this.props.navigation.navigate("Schedule");
              }}
              btnStyle={{ marginRight: 8 }}
            />
          ),
        });

        this.setState({
          isFromMembership:
            (this.props.route.params &&
              this.props.route.params.isFromMembership) ||
            false,
          isFromAddVehicle:
            (this.props.route.params &&
              this.props.route.params.isFromAddVehicle) ||
            false,
          remove:
            (this.props.route.params && this.props.route.params.remove) ||
            false,

          oderHistory:
            (this.props.route.params && this.props.route.params.oderHistory) ||
            false,
          order_id:
            (this.props.route.params && this.props.route.params.order_id) || "",
        });
        this._unsubscribe = this.props.navigation.addListener("focus", () => {
          this.onFocus();
        });
        this.setState({ orderData: this.props.route.params.orderData }, () => {
          this.initialSetUp();
        });
      }
    );
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  onFocus = () => {
    console.log("ON focus....");
    let request_user_profile = { user_id: this.props.user_data.data._id };
    this.props.user_profile(request_user_profile);
    this.props.membership_list(request_user_profile);
    if (this.props.user_data.data.membershipStatus == 1) {
      this.setState({
        is_member: false,
        renew_date:
          this.props.user_data &&
          this.props.user_data.data &&
          this.props.user_data.data.membershipEnds,
        membership_title: "You're a EzFill Member",
      });
    } else {
      this.setState({ is_member: true });
    }
  };
  componentDidUpdate(prevProps) {
    console.log(
      "prevProps => " +
        JSON.stringify(prevProps) +
        "   ======  " +
        this.props.msg
    );
    if (this.props.is_ !== prevProps._delete) {
      if (this.props._delete) {
        if (!this.state.isApiCalled) {
          this.setState({ loading: true });
        }
      } else if (!this.props._delete) {
        this.setState({ loading: false, isApiCalled: true });
      }
    }
    if (this.props.cancel_is_fetching !== prevProps.cancel_is_fetching) {
      if (this.props.cancel_is_fetching) {
        if (!this.state.isApiCalled) {
          this.setState({ loading: true });
        }
      } else if (!this.props.cancel_is_fetching) {
        this.setState({ loading: false, isApiCalled: true });
      }
    }
    if (
      this.props.is_fetching_membership !== prevProps.is_fetching_membership
    ) {
      if (this.props.is_fetching_membership) {
        if (!this.state.isApiCalled) {
          this.setState({ loading: true });
        }
      } else if (!this.props.is_fetching_membership) {
        this.setState({ loading: false, isApiCalled: true });
      }
    }
    if (this.props.cancel_is_success !== prevProps.cancel_is_success) {
      if (this.props.cancel_is_success) {
        this.setState({ isSavedVahicleApiSuccess: true });
        setTimeout(() => {
          let request_user_profile = { user_id: this.props.user_data.data._id };
          this.props.user_profile(request_user_profile);
        }, 500);
        this.props.membership_clear_data();
        if (
          this.props.user_data &&
          this.props.user_data.data &&
          this.props.user_data.data.membershipStatus == 1
        ) {
          this.setState({
            is_member: false,
            renew_date:
              this.props.user_data &&
              this.props.user_data.data &&
              this.props.user_data.data.membershipEnds,
            membership_title: "You're a EzFill Member",
          });
        } else {
          this.setState({ is_member: true });
        }
      }
    }
    if (
      this.props.is_fetching_membership !== prevProps.is_fetching_membership
    ) {
      if (this.props.is_fetching_membership) {
        if (!this.state.isApiCalled) {
          this.setState({ loading: true });
        }
      } else if (!this.props._delete) {
        this.setState({ loading: false, isApiCalled: true });

        //  () => {
        // if (this.props.is_succes !== prevProps.is_succes) {
        //   if (this.props.is_succes) {
        //     this.props.saved_location_locar_clear_data();
        //   }
        // }
      }
    }
    if (this.props.cancel_is_success !== prevProps.cancel_is_success) {
      console.log("is_succe_delete", this.props.cancel_is_success);
      if (this.props.cancel_is_success == true) {
        // console.log("DATA====>", this.props.delete_Address_clear_data);
        // let request = { user_id: this.props.user_data.data._id };
        // this.props.saved_location(request);

        setTimeout(() => {
          let request_user_profile = { user_id: this.props.user_data.data._id };
          this.props.user_profile(request_user_profile);
        }, 500);
        this.setState({
          membership_title: "Become a EzFill Member",
          isPopUpOpened: false,
        });
        this.props.membership_clear_data();
        this.props.cancle_membership_clear_data();
        if (
          this.props.user_data &&
          this.props.user_data.data &&
          this.props.user_data.data.membershipStatus == 1
        ) {
          this.setState({
            is_member: false,
            renew_date:
              this.props.user_data &&
              this.props.user_data.data &&
              this.props.user_data.data.membershipEnds,
            membership_title: "You're a EzFill Member",
          });
        } else {
          this.setState({ is_member: true });
        }
      }
    }

    ///////////////////////////////////////////////////////////

    if (
      this.props.is_fetching_membership_list !==
      prevProps.is_fetching_membership_list
    ) {
      if (this.props.is_fetching_membership_list) {
        if (!this.state.isApiCalled) {
          this.setState({ loading: true });
        }
      } else if (!this.props.is_fetching_membership_list) {
        this.setState({ loading: false, isApiCalled: true });
      }
    }

    if (
      this.props.is_success_membership_list !==
      prevProps.is_success_membership_list
    ) {
      if (this.props.is_success_membership_list) {
        this.setState({ isSavedVahicleApiSuccess: true });
        // this.props.delete_Address_clear_data();
        console.log(
          "datatatatatata==========>",
          this.props.user_data_membership_list.membershipEndDate
        );
        this.props.membership_list_clear_data();
      }
    }

    if (
      this.props.is_fetching_membership_list !==
      prevProps.is_fetching_membership_list
    ) {
      if (this.props.is_fetching_membership_list) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching_membership_list) {
        this.setState({ loading: false }, () => {
          if (
            this.props.is_success_membership_list !==
            prevProps.is_success_membership_list
          ) {
            if (this.props.is_success_membership_list) {
              console.log(
                "datatatatatata==========>",
                this.props.user_data_membership_list
              );
              this.props.membership_list_clear_data();
            }
          }
        });
      }
    }

    //////////////////////////////////////////////////////

    if (this.props.cancel_is_fetching !== prevProps.cancel_is_fetching) {
      if (this.props.cancel_is_fetching) {
        this.setState({ loading: true });
      } else if (!this.props.cancel_is_fetching) {
        this.setState({ loading: false }, () => {
          if (this.props.cancel_is_success !== prevProps.cancel_is_success) {
            if (this.props.cancel_is_success) {
              setTimeout(() => {
                let request_user_profile = {
                  user_id: this.props.user_data.data._id,
                };
                this.props.user_profile(request_user_profile);
              }, 500);
              this.setState({
                membership_title: "Become a EzFill Member",
                isPopUpOpened: false,
              });
              this.props.membership_clear_data();
              this.props.cancle_membership_clear_data();
              if (
                this.props.user_data &&
                this.props.user_data.data &&
                this.props.user_data.data.membershipStatus == 1
              ) {
                this.setState({
                  is_member: false,
                  renew_date:
                    this.props.user_data &&
                    this.props.user_data.data &&
                    this.props.user_data.data.membershipEnds,
                  membership_title: "You're a EzFill Member",
                });
              } else {
                this.setState({ is_member: true });
              }
            }
          }
        });
      }
    }

    console.log(JSON.stringify(this.props));
    if (this.props.route.params != undefined) {
      if (this.props.route.params.getmembership == true) {
        this.props.route.params.getmembership = false;
      } else {
      }
    } else {
    }
    if (this.props.cancel_is_success !== prevProps.cancel_is_success) {
      console.log("cancel_is_success", this.props.cancel_is_success);
      if (this.props.cancel_is_success == true) {
        setTimeout(() => {
          let request_user_profile = { user_id: this.props.user_data.data._id };
          this.props.user_profile(request_user_profile);
        }, 500);
        this.props.membership_clear_data();
        this.props.cancle_membership_clear_data();
      }
    }

    if (
      this.props.is_fetching_membership !== prevProps.is_fetching_membership
    ) {
      if (this.props.is_fetching_membership) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching_membership) {
        this.setState({ loading: false }, () => {
          if (
            this.props.is_success_membership !== prevProps.is_success_membership
          ) {
            if (this.props.is_success_membership) {
              console.log("is_success_membership_kai");
              setTimeout(() => {
                let request_user_profile = {
                  user_id: this.props.user_data.data._id,
                };
                this.props.user_profile(request_user_profile);
              }, 500);
              this.props.membership_clear_data();
              this.props.cancle_membership_clear_data();
            }
          }
        });
      }
    }

    ///membership////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (
      this.props.is_fet_recurringService !== prevProps.is_fet_recurringService
    ) {
      if (this.props.is_fet_recurringService) {
        if (!this.state.isApiCalled) {
          this.setState({ loading: true });
        }
      } else if (!this.props.is_fet_recurringService) {
        this.setState({ loading: false, isApiCalled: true });
      }
    }
    if (
      this.props.is_succe_recurringService !==
      prevProps.is_succe_recurringService
    ) {
      if (this.props.is_succe_recurringService) {
        // this.setState({ isSavedVahicleApiSuccess: true });
        this.props.recurringService_clear_data();
      }
    }

    if (
      this.props.is_succe_recurringService !==
      prevProps.is_succe_recurringService
    ) {
      console.log("is_succe_delete", this.props.is_succe_recurringService);
      if (this.props.is_succe_recurringService == true) {
        this.props.navigation.navigate("OrderHistory");
        console.log("DATAghfjdklghfhdgfdsj====>");
        //this.props.navigation.navigate("Dashboard");
        // this.props.recurringService_clear_data();
      }
    }
    if (
      this.props.is_fet_recurringService !== prevProps.is_fet_recurringService
    ) {
      if (this.props.is_fet_recurringService) {
        this.setState({ loading: true });
      } else if (!this.props.is_fet_recurringService) {
        this.setState({ loading: false }, () => {
          if (
            this.props.is_succe_recurringService !==
            prevProps.is_succe_recurringService
          ) {
            console.log(
              "kapildevVidua====>",
              this.props.is_succe_recurringService
            );
            if (this.props.is_succe_recurringService) {
              console.log("DATAghfjdklghfhdgfdsj====>");
              console.log(
                "DATAghfjdklghfhdgfdsj====>",
                this.props.recurringService_data
              );
              console.log("DATA====>", this.props.recurringService_data);
              // this.props.navigation.navigate("OrderHistory");

              // this.props.recurringService_clear_data();
            }
          }
        });
      }
    }

    ////////////////////////////////////////////////////////////////////////////

    if (this.props.is_fetching !== prevProps.is_fetching) {
      if (this.props.is_fetching) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching) {
        this.setState({ loading: false });
      }
    }

    if (this.props.is_success !== prevProps.is_success) {
      console.log("prevProps => " + prevProps.is_success);
      console.log("this.props => " + this.props.is_success);

      if (this.props.is_success == true) {
        console.log("success => ");
        this.setState({
          Sussessfull: true,
        });

        this.props.order_create_clear_data();
      }
    }

    if (
      this.props.is_fetching_promo_code !== prevProps.is_fetching_promo_code
    ) {
      if (this.props.is_fetching_promo_code) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching_promo_code) {
        this.setState({ loading: false }, () => {
          if (
            this.props.is_success_promo_code !== prevProps.is_success_promo_code
          ) {
            if (this.props.is_success_promo_code) {
              console.log(
                "DATASSSS => " + JSON.stringify(this.props.promo_code_data.code)
              );
              console.log("success => ");
              this.setState({ editable: false, isPromoCode: "yes" });

              this.props.promo_code_clear_data();
            }
          }
          if (this.props.error__promo_code !== prevProps.error__promo_code) {
            console.log("error==>");
            if (this.props.error__promo_code == true) {
              this.setState({
                error_msg: this.props.msg_promo_code,
                is_error_msg_shown: true,
              });
              this.props.promo_code_clear_data();
            }
          }
        });
      }
    }

    if (this.props.is_fetching_add !== prevProps.is_fetching_add) {
      if (this.props.is_fetching_add) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching_add) {
        this.setState({ loading: false });
      }
    }

    if (this.props.is_success_add !== prevProps.is_success_add) {
      console.log("prevProps => " + prevProps.is_success_add);
      console.log("this.props => " + this.props.is_success_add);

      if (this.props.is_success_add == true) {
        console.log("success => ");
        const vehiclevalue = this.props.route.params.orderData.vehicle;
        vehiclevalue.map((getvehicleId) => {
          var id = getvehicleId._id;
          vehicleid.push(id);
        });

        console.log("vehiclevalue => ", vehicleid);

        // this.state.memberships
        //   ? this.props.membership({
        //       user_id: this.props.user_data.data._id,
        //       cardToken: this.props.add_applepay_data.cards.id,
        //       paymentMethod: this.props.route.params.paymentmethod,
        //     })
        //   : null;
        if (this.props.user_data.data.membershipStatus == 1) {
          delivery_Fees =
            this.props.route.params.fuelTypePrice +
            this.props.user_data_membership_list.delivery_fee;
        } else if (membershipdata == "no") {
          delivery_Fees =
            this.props.route.params.fuelTypePrice +
            this.props.user_data_membership_list.delivery_fee;
        } else {
          delivery_Fees = this.props.route.params.fuelTypePrice;

          this.props.user_data_membership_list.delivery_fee +
            this.props.user_data_membership_list_data.price;
        }

        let request = {
          user_id: this.props.route.params.orderData.user_id,
          vehicle_id: vehicleid.toString(),

          isPromoCode: this.state.isPromoCode,
          promocode: this.props.promo_code_data.code,

          deliveryFee: delivery_Fees,
          membership: this.state.membership,
          Payment: this.props.route.params.orderData.Payment,
          latitude: this.props.route.params.orderData.latitude,
          longitude: this.props.route.params.orderData.longitude,
          addressName: {
            line1: this.props.route.params.line1,
            line2: this.props.route.params.line2,
            city: this.props.route.params.city,
            zipcode: this.props.route.params.zipcode,
            state: this.props.route.params.state,
            type: this.props.route.params.type,
          },
          recurringService: this.props.route.params.orderData.recurringService,
          schedule_date: this.props.route.params.orderData.startTime,
          schedule_time: this.props.route.params.orderData.endTime,
          inGarage: this.props.route.params.orderData.inGarage,
          floor: this.props.route.params.orderData.floor,
          additionalNotes: this.props.route.params.orderData.additionalNotes,
          paymentMethod: this.props.route.params.paymentmethod,
          txn_id: this.props.add_applepay_data.cards.balance_transaction,
          cardinfo: {
            last4: this.props.add_applepay_data.cards.payment_method_details
              .card.last4,
            exp_month: this.props.add_applepay_data.cards.payment_method_details
              .card.exp_month,
            exp_year: this.props.add_applepay_data.cards.payment_method_details
              .card.exp_year,
            name: this.props.add_applepay_data.cards.payment_method_details.card
              .brand,
          },
          card_id: this.props.add_applepay_data.cards.id,
        };
        console.log("cardJeson", JSON.stringify(request));
        this.props.order_create(request);
      }
    }
  }

  initialSetUp = () => {
    let request_user_profile = {
      user_id:
        this.props && this.props.user_data && this.props.user_data.data._id,
    };
    this.props.user_profile(request_user_profile);
    if (
      this.props &&
      this.props.user_data &&
      this.props.user_data.data.membershipStatus == 1
    ) {
      delivery_price = this.props.user_data_membership_list.delivery_fee;
      this.setState({
        is_member: false,
      });
    } else {
      delivery_price = this.props.user_data_membership_list.delivery_fee;
      this.setState({ is_member: true });
    }
    if (this.state.isFromCheckout) {
      delivery_price = this.props.user_data_membership_list.delivery_fee;
      this.setState({
        deliveryFee: this.state.orderData.delivery_fee,
        fuelTypePrice: this.props.route.params.fuelTypePrice,
        vehicle: this.state.orderData.vehicle,
        addressName: this.state.orderData.addressName,
        payment_data: this.state.orderData.payment_data,
        schedule_str:
          moment(this.state.orderData.startTime, "YYYY-MM-DD").format(
            "MMM Do"
          ) +
          " at " +
          moment(this.state.orderData.endTime, "hh:mm").format("hA") +
          " (" +
          this.state.orderData.recurringService +
          ")",
      });
    } else {
      this.props.saved_vehicle_data.data.map((item) => {
        if (this.state.orderData.vehicle_id == item._id) {
          this.setState({ vehicle: item });
        }
      });
      var dateStr = "";
      if (this.state.orderData.recurringService != "No") {
        dateStr =
          moment(this.state.orderData.startTime, "YYYY-MM-DD").format(
            "MMM Do"
          ) +
          " at " +
          moment(this.state.orderData.endTime, "hh:mm").format("hA");
        +" (" + this.state.orderData.recurringService + ")";
      } else {
        dateStr =
          moment(this.state.orderData.startTime, "YYYY-MM-DD").format(
            "MMM Do"
          ) +
          " at " +
          moment(this.state.orderData.endTime, "hh:mm").format("hA");
      }
      if (this.state.oderHistory) {
        delivery_price = this.props.user_data_membership_list.delivery_fee;
        this.setState({
          deliveryFee: this.state.orderData.deliveryFee,
          addressName: this.state.orderData.addresses[0].line1,
          fuelTypePrice: this.props.route.params.fuelTypePrice,

          schedule_str: dateStr,
        });
      } else {
        delivery_price = this.state.orderData.delivery_fee;
        this.setState({
          deliveryFee: this.state.orderData.delivery_fee,
          addressName: this.state.orderData.addressName,
          fuelTypePrice: this.props.route.params.fuelTypePrice,

          schedule_str: dateStr,
        });
      }
    }
  };
  async componentWillMount() {
    let request_user_profile = { user_id: this.props.user_data.data._id };
    this.props.user_profile(request_user_profile);
    if (this.props.user_data.data.membershipStatus == 1) {
      this.setState({
        is_member: false,
      });
    } else {
      this.setState({ is_member: true });
    }
    const allowed = await stripe.deviceSupportsNativePay();
    const amexAvailable = await stripe.canMakeNativePayPayments({
      networks: ["american_express"],
    });
    const discoverAvailable = await stripe.canMakeNativePayPayments({
      networks: ["discover"],
    });
    const masterCardAvailable = await stripe.canMakeNativePayPayments({
      networks: ["master_card"],
    });
    const visaAvailable = await stripe.canMakeNativePayPayments({
      networks: ["visa"],
    });
    this.setState({
      allowed,
      amexAvailable,
      discoverAvailable,
      masterCardAvailable,
      visaAvailable,
    });
  }
  paypaldata() {
    const vehiclevalue = this.props.route.params.orderData.vehicle;
    vehiclevalue.map((getvehicleId) => {
      var id = getvehicleId._id;
      vehicleid.push(id);
    });

    console.log("vehiclevalue => ", vehicleid);
    if (
      this.props &&
      this.props.user_data &&
      this.props.user_data.data.membershipStatus == 1
    ) {
      delivery_Fees =
        this.props.route.params.fuelTypePrice +
        this.props.user_data_membership_list.delivery_fee;
    } else if (membershipdata == "no") {
      delivery_Fees =
        this.props.route.params.fuelTypePrice +
        this.props.user_data_membership_list.delivery_fee;
    } else {
      delivery_Fees = this.props.route.params.fuelTypePrice;

      this.props.user_data_membership_list.delivery_fee;
      this.props.user_data_membership_list_data.price;
    }
    let request = {
      user_id: this.props.route.params.orderData.user_id,
      vehicle_id: vehicleid.toString(),
      deliveryFee: delivery_Fees,
      membership: this.state.membership,
      isPromoCode: this.state.isPromoCode,
      promocode: this.props.promo_code_data.code,
      Payment: this.props.route.params.orderData.Payment,
      latitude: this.props.route.params.orderData.latitude,
      longitude: this.props.route.params.orderData.longitude,
      addressName: {
        line1: this.props.route.params.line1,
        line2: this.props.route.params.line2,
        city: this.props.route.params.city,
        zipcode: this.props.route.params.zipcode,
        state: this.props.route.params.state,
        type: this.props.route.params.type,
      },
      recurringService: this.props.route.params.orderData.recurringService,
      schedule_date: this.props.route.params.orderData.startTime,
      schedule_time: this.props.route.params.orderData.endTime,
      inGarage: this.props.route.params.orderData.inGarage,
      floor: this.props.route.params.orderData.floor,
      additionalNotes: this.props.route.params.orderData.additionalNotes,
      paymentMethod: this.props.route.params.paymentmethod,
      txn_id: "",
      cardinfo: {
        last4: "",
        exp_month: "",
        exp_year: "",
        name: "",
      },
      card_id: "",
    };
    console.log("cardJeson", JSON.stringify(request));
    this.props.navigation.navigate("Paypal", {
      is_selected_home: true,
      requestData: request,
      orderData: this.state.orderData,
      isFromAddVehicle: this.state.isFromAddVehicle,
      isFromMembership: this.state.isFromMembership,
      orderData: "",
      is_selected_home: "",
      memberships: this.state.memberships,
      membership: membershipdata,
      deliveryFee: delivery_Fees,
      line1: this.props.route.params.line1,
      line2: this.props.route.params.line2,
      city: this.props.route.params.city,
      zipcode: this.props.route.params.zipcode,
      state: this.props.route.params.state,
      type: this.props.route.params.type,
    });
  }
  handleCard() {
    const vehiclevalue = this.props.route.params.orderData.vehicle;
    vehiclevalue.map((getvehicleId) => {
      var id = getvehicleId._id;
      vehicleid.push(id);
    });
    console.log("vehiclevalue => ", vehicleid);

    // this.state.memberships
    //   ? this.props.membership({
    //       user_id: this.props.user_data.data._id,
    //       cardToken: this.props.route.params.carddata.card_id._id,
    //       paymentMethod: this.props.route.params.paymentmethod,
    //     })
    //   : null;
    if (
      this.props &&
      this.props.user_data &&
      this.props.user_data.data.membershipStatus == 1
    ) {
      delivery_Fees =
        this.props.route.params.fuelTypePrice +
        this.props.user_data_membership_list.delivery_fee;
    } else if (membershipdata == "no") {
      delivery_Fees =
        this.props.route.params.fuelTypePrice +
        this.props.user_data_membership_list.delivery_fee;
    } else {
      delivery_Fees = this.props.route.params.fuelTypePrice;

      this.props.user_data_membership_list.delivery_fee;
      this.props.user_data_membership_list_data.price;
    }

    let request = {
      user_id: this.props.route.params.orderData.user_id,
      vehicle_id: vehicleid.toString(),
      deliveryFee: delivery_Fees,
      membership: this.state.membership,
      isPromoCode: this.state.isPromoCode,
      promocode: this.props.promo_code_data.code,
      Payment: this.props.route.params.orderData.Payment,
      latitude: this.props.route.params.orderData.latitude,
      longitude: this.props.route.params.orderData.longitude,
      addressName: {
        line1: this.props.route.params.line1,
        line2: this.props.route.params.line2,
        city: this.props.route.params.city,
        zipcode: this.props.route.params.zipcode,
        state: this.props.route.params.state,
        type: this.props.route.params.type,
      },
      recurringService: this.props.route.params.orderData.recurringService,
      schedule_date: this.props.route.params.orderData.startTime,
      schedule_time: this.props.route.params.orderData.endTime,
      inGarage: this.props.route.params.orderData.inGarage,
      floor: this.props.route.params.orderData.floor,
      additionalNotes: this.props.route.params.orderData.additionalNotes,
      paymentMethod: this.props.route.params.paymentmethod,
      txn_id: "",
      cardinfo: {
        last4: this.props.route.params.carddata.card_id.last4,
        exp_month: this.props.route.params.carddata.card_id.exp_month,
        exp_year: this.props.route.params.carddata.card_id.exp_year,
        name: this.props.route.params.carddata.card_id.name,
      },
      card_id: this.props.route.params.carddata.card_id._id,
    };
    console.log(JSON.stringify(request));
    this.props.order_create(request);
  }
  handleCompleteChange = (complete) => this.setState({ complete });

  handleApplePayPress = async () => {
    try {
      const token = await stripe.paymentRequestWithNativePay(
        {
          requiredBillingAddressFields: ["all"],
          requiredShippingAddressFields: ["all"],
          shippingMethods: [
            {
              id: "fedex",
              label: "FedEX",
              detail: "Test @ 10",
              amount: "10.00",
            },
          ],
        },
        [
          {
            label: "Whisky",
            amount: "50.00",
          },
        ]
      );

      this.setState({ loading: false, token });

      if (this.state.complete) {
        // await stripe.completeNativePayRequest();
        this.setState({ status: "Apple Pay payment completed" });
        var request = {
          customer_id: "",
          cardToken: this.state.token.tokenId,
          status: "1",
          amount: "60",
          currency: "usd",
        };
        this.props.add_applepay(request);
      } else {
        await stripe.cancelNativePayRequest();
        this.setState({ status: "Apple Pay payment cenceled" });
      }
    } catch (error) {
      this.setState({ loading: false, status: `Error: ${error.message}` });
    }
  };
  payWithGooglePay = (requestData) => {
    // Check if Google Pay is available
    GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods).then(
      (ready) => {
        if (ready) {
          // Request payment token
          GooglePay.requestPayment(requestData)
            .then(this.handleSuccess)
            .catch(this.handleError);
        }
      }
    );
  };
  handleSuccess = (token) => {
    const tokendata = JSON.parse(token);
    var request = {
      customer_id: "",
      cardToken: tokendata.id,
      status: "1",
      amount: "60",
      currency: "usd",
    };

    console.log(request);
    this.props.add_applepay(request);
  };
  handleError = (error) =>
    console.log("Error", `${error.code}\n${error.message}`);

  render() {
    return (
      <SafeAreaContainer
        title={this.state.title}
        bodyTxt={this.state.bodyTxt}
        isModalOpened={this.state.isPopUpOpened}
        onDismiss={() => {
          this.setState({ isPopUpOpened: false });
        }}
      >
        <Loader loading={this.state.loading} />

        <ScrollView style={styles.container}>
          <View
            style={{
              backgroundColor: "#F3F4F6",
              alignItems: "center",
              justifyContent: "center",
              borderBottomColor: "#E6E6E8",
              borderBottomWidth: 1,
              borderTopColor: "#E6E6E8",
              borderTopWidth: 1,
            }}
          >
            <View
              style={{
                height: 80,
                width: "86%",
                justifyContent: "center",
                borderBottomColor: "#E6E6E8",
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text
                    style={{
                      color: "#000",
                      fontFamily: "Avenir",
                      fontSize: 12,
                      fontWeight: "700",
                    }}
                  >
                    Delivery Fee
                  </Text>
                </View>
                {this.state.membership == this.state.membership ? (
                  this.state.Delivery_fee ? (
                    <View style={{ flexDirection: "row" }}>
                      <View>
                        <Text
                          style={{
                            color: "#80859F",
                            marginLeft: 10,
                            fontFamily: "Avenir",
                            fontSize: 16,
                            fontWeight: "700",
                            textDecorationLine: "line-through",
                          }}
                        >
                          ${this.state.deliveryFee}
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: "#000",
                          marginLeft: 10,
                          fontFamily: "Avenir",
                          fontSize: 16,
                          fontWeight: "700",
                        }}
                      >
                        $0.00
                      </Text>
                    </View>
                  ) : (
                    <Text
                      style={{
                        color: "#000",
                        marginLeft: 10,
                        fontFamily: "Avenir",
                        fontSize: 16,
                        fontWeight: "700",
                      }}
                    >
                      ${this.state.orderData.delivery_fee}
                    </Text>
                  )
                ) : (
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color: "#80859F",
                        marginLeft: 10,
                        fontFamily: "Avenir",
                        fontSize: 16,
                        fontWeight: "700",
                        textDecorationLine: "line-through",
                      }}
                    >
                      ${this.state.orderData.delivery_fee}
                    </Text>
                    <Text
                      style={{
                        color: "#000",
                        marginLeft: 10,
                        fontFamily: "Avenir",
                        fontSize: 16,
                        fontWeight: "700",
                      }}
                    >
                      $0.00
                    </Text>
                  </View>
                )}
              </View>
              <Modal
                animated={false}
                animationType="none"
                transparent={true}
                visible={this.state.isVisible}
                onRequestClose={() => {
                  console.log("Modal has been closed.");
                }}
              >
                {/*All views of Modal*/}
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.7)",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: CONST.DEVICE_WIDTH - 40,
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 20,
                        fontWeight: "bold",
                        fontFamily: "Avenir",
                        width: "86%",
                        marginTop: 20,
                        alignSelf: "center",
                        textAlign: "left",
                      }}
                      allowFontScaling={false}
                    >
                      Become a EzFill Member
                    </Text>
                    <Text
                      style={{
                        color: "#FF7000",
                        fontSize: 20,
                        fontWeight: "bold",
                        fontFamily: "Avenir",
                        width: "86%",

                        alignSelf: "center",
                        textAlign: "left",
                      }}
                      allowFontScaling={false}
                    >
                      for only $
                      {this.props.user_data_membership_list_data.price} a month
                    </Text>

                    <FlatList
                      style={{ width: "100%", marginTop: 15 }}
                      data={this.props.user_data_membership_list_data.plans}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => {
                        return (
                          <View
                            style={{
                              flexDirection: "row",
                              width: "100%",
                              height: 30,
                            }}
                          >
                            <Image
                              style={{
                                height: 20,
                                width: 20,
                                resizeMode: "contain",
                                marginLeft: 24,
                              }}
                              source={AssetsImages.icon_check}
                            />
                            <Text
                              style={{
                                color: "#80859F",
                                marginLeft: 10,
                                fontFamily: "Avenir",
                                fontSize: 16,
                              }}
                            >
                              {item.title}
                            </Text>
                          </View>
                        );
                      }}
                    />
                    <View>
                      <TxtFullScreenBtn
                        title={"ADD  MEMBERSHIP TO CHECKOUT"}
                        onPress={() => {
                          this.setState({
                            isVisible: !this.state.isVisible,
                            membership: "yes",
                            memberships: false,
                            is_member: false,
                            Delivery_fee: true,
                          });
                          membershipdata = "yes";
                          // this.props.cancel_membership({
                          //   user_id: this.props.user_data.data._id,
                          // });
                          this.props.route.params.paymentmethod == "google_pay"
                            ? this.payWithGooglePay(stripeRequestData)
                            : this.props.route.params.paymentmethod ==
                              "apple_pay"
                            ? this.handleApplePayPress()
                            : this.props.route.params.paymentmethod == "paypal"
                            ? this.paypaldata()
                            : this.props.route.params.paymentmethod == "card"
                            ? this.handleCard()
                            : null;
                        }}
                        disabled={false}
                        containerStyle={{
                          backgroundColor: "#FF5C22",
                          marginTop: 20,
                        }}
                      />
                      <TxtFullScreenBtn
                        title={"NO THANKS"}
                        onPress={() => {
                          this.setState({
                            isVisible: !this.state.isVisible,
                            membership: "no",
                            memberships: true,
                            is_member: false,
                          });
                          membershipdata = "no";
                          // this.props.cancel_membership({
                          //   user_id: this.props.user_data.data._id,
                          // });
                          this.props.route.params.paymentmethod == "google_pay"
                            ? this.payWithGooglePay(stripeRequestData)
                            : this.props.route.params.paymentmethod ==
                              "apple_pay"
                            ? this.handleApplePayPress()
                            : this.props.route.params.paymentmethod == "paypal"
                            ? this.paypaldata()
                            : this.props.route.params.paymentmethod == "card"
                            ? this.handleCard()
                            : null;
                        }}
                        disabled={false}
                        containerStyle={{
                          backgroundColor: "#00000000",
                          marginTop: 10,
                          marginBottom: 20,
                          borderColor: "#747A93",
                          borderWidth: 1,
                        }}
                        fontColor={"#747A93"}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
              <Modal
                animated={false}
                animationType="none"
                transparent={true}
                visible={this.state.isPopUpOpeneds}
                onRequestClose={() => {
                  console.log("Modal has been closed.");
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.7)",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: CONST.DEVICE_WIDTH - 40,
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 20,
                        fontWeight: "bold",
                        fontFamily: "Avenir",
                        width: "86%",
                        marginTop: 20,
                        alignSelf: "center",
                        textAlign: "left",
                      }}
                      allowFontScaling={false}
                    >
                      Service Scheduled
                    </Text>
                    <Text
                      style={{
                        color: "#747A93",
                        fontSize: 14,
                        width: "86%",
                        marginTop: 10,
                        alignSelf: "center",
                        textAlign: "left",
                        lineHeight: 23,
                        fontFamily: "Avenir",
                      }}
                      allowFontScaling={false}
                    >
                      {
                        "Your service has been ordered.\nDon’t forget to leave your gas door open."
                      }
                    </Text>
                    <Image
                      style={{ width: "100%", height: 180, marginTop: 10 }}
                      source={AssetsImages.bitmap}
                    />
                    <TxtFullScreenBtn
                      title={"CLOSE"}
                      onPress={() => {
                        this.props.navigation.navigate("Dashboard", {
                          oder_success: true,
                          orderData: this.state.orderData,
                          isFromCheckout: true,
                        });
                        this.setState({
                          isPopUpOpeneds: !this.state.isPopUpOpeneds,
                        });
                      }}
                      disabled={false}
                      containerStyle={{
                        backgroundColor: "#FF5C22",
                        marginTop: 20,
                        marginBottom: 20,
                      }}
                    />
                  </View>
                </View>
              </Modal>
              <Modal
                animated={false}
                animationType="none"
                transparent={true}
                visible={this.state.Sussessfull}
                onRequestClose={() => {
                  console.log("Modal has been closed.");
                }}
              >
                {/*All views of Modal*/}
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.7)",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: CONST.DEVICE_WIDTH - 100,
                      borderRadius: 5,
                    }}
                  >
                    <Icon
                      style={{
                        marginTop: 15,

                        justifyContent: "center",
                        alignSelf: "center",
                        fontSize: 45,
                        color: "#FF5C22",
                      }}
                      name="check-circle"
                      type="FontAwesome5"
                    />
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 18,
                        fontWeight: "bold",
                        fontFamily: "Avenir",
                        justifyContent: "center",
                        marginTop: 10,
                        alignSelf: "center",
                        textAlign: "left",
                      }}
                      allowFontScaling={false}
                    >
                      Order placed.
                    </Text>
                    <Text
                      style={{
                        color: "#FF7000",
                        fontSize: 15,
                        fontWeight: "bold",
                        fontFamily: "Avenir",
                        justifyContent: "center",
                        marginTop: 3,

                        alignSelf: "center",
                        textAlign: "left",
                      }}
                      allowFontScaling={false}
                    >
                      Your Order placed successfully.
                    </Text>

                    <View>
                      <TxtFullScreenBtn
                        title={"OK"}
                        onPress={() => {
                          this.setState({
                            isPopUpOpeneds: true,
                            Sussessfull: !this.state.Sussessfull,
                          });
                          this.props.promo_code_clear_data();
                        }}
                        disabled={false}
                        containerStyle={{
                          backgroundColor: "#FF5C22",
                          marginTop: 20,
                          marginBottom: 20,
                          height: 30,
                          width: "50%",
                        }}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
              <Modal
                animated={false}
                animationType="none"
                transparent={true}
                visible={this.state.promo_codes}
                onRequestClose={() => {
                  console.log("Modal has been closed.");
                }}
              >
                {/*All views of Modal*/}
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.7)",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: CONST.DEVICE_WIDTH - 100,
                      borderRadius: 5,
                    }}
                  >
                    <TouchableHighlight
                      style={{
                        position: "absolute",
                        top: -15,
                        right: -8,
                        backgroundColor: "#fff",
                        borderRadius: 30,
                      }}
                      onPress={() => {
                        this.setState({ promo_codes: false });
                      }}
                    >
                      <Image
                        style={{ width: 40, height: 40 }}
                        source={AssetsImages.icon_delete}
                      />
                    </TouchableHighlight>
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 20,
                        fontWeight: "bold",
                        fontFamily: "Avenir",
                        width: "80%",
                        marginTop: 20,
                        alignSelf: "center",
                        textAlign: "left",
                      }}
                      allowFontScaling={false}
                    >
                      Have a promo code?
                    </Text>
                    <HeaderTxt title={"Promo code"} marginTop={30} />

                    <TextInput
                      style={{
                        height: 44,
                        width: "86%",
                        borderRadius: 5,
                        borderColor: Colors.InputText,
                        borderWidth: 1,
                        paddingLeft: 10,

                        fontSize: 14,
                        color: Colors.Black,
                        alignSelf: "center",
                        marginTop: 8,
                      }}
                      placeholder=""
                      placeholderTextColor={Colors.Black}
                      value={this.state.promo_cods}
                      onChangeText={(text) => {
                        this.setState({ promo_cods: text }, () => {
                          if (this.state.promo_cods >= 2) {
                            this.setState({ is_btn_disabled: false });
                          }
                        });
                      }}
                      onBlur={() => {
                        // this.validation()
                      }}
                      onPressSubmit={() => {
                        this.setState({ keyboardVerticalOffsetValue: 0 });
                      }}
                    />
                    {this.state.is_error_msg_shown ? (
                      <ErrorContainer error_msg={this.state.error_msg} />
                    ) : null}
                    <TxtFullScreenBtn
                      title={"PROMO CODE"}
                      onPress={() => {
                        //

                        let request = {
                          promocode: this.state.promo_cods,
                        };
                        this.props.promo_code(request);
                        console.log("kapilPromode", request);
                      }}
                      disabled={this.state.is_btn_disabled ? true : false}
                      containerStyle={{
                        backgroundColor: this.state.is_btn_disabled
                          ? Colors.disable
                          : Colors.OrangeRed,
                        marginTop: 25,
                        marginBottom: 20,
                      }}
                    />
                  </View>
                </View>
              </Modal>
              {this.state.membershipTest ? (
                this.state.Delivery_fee ? (
                  <Text
                    style={{
                      fontSize: 10,
                      color: Colors.LightGray,
                      fontWeight: "bold",
                      fontFamily: "Avenir",
                      alignSelf: "flex-end",
                      marginTop: 5,
                    }}
                  >
                    Free delivery with membership
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#FF5C22",
                      fontWeight: "bold",
                      fontFamily: "Avenir",
                      alignSelf: "flex-end",
                      marginTop: 5,
                    }}
                  >
                    Become a member for unlimited free delivery
                  </Text>
                )
              ) : (
                <Text
                  style={{
                    fontSize: 10,
                    color: Colors.LightGray,
                    fontWeight: "bold",
                    fontFamily: "Avenir",
                    alignSelf: "flex-end",
                    marginTop: 5,
                  }}
                >
                  Free delivery with membership
                </Text>
              )}
            </View>
            <View
              style={{
                height: 80,
                width: "86%",
                justifyContent: "center",
                borderBottomColor: "#E6E6E8",
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text
                    style={{
                      color: "#000",
                      fontFamily: "Avenir",
                      fontSize: 12,
                      fontWeight: "700",
                    }}
                  >
                    Fuel Types
                  </Text>
                </View>
                {/* <Text style={{ color: "#80859F", marginLeft: 10, fontFamily: "Avenir", fontSize: 16, fontWeight: '700', textDecorationLine: 'line-through' }}>$1.99</Text> */}
                <Text
                  style={{
                    color: "#000",
                    marginLeft: 10,
                    fontFamily: "Avenir",
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  {this.state.vehicle.fuel_type}
                </Text>
                <Text
                  style={{
                    color: "#000",
                    marginLeft: 10,
                    fontFamily: "Avenir",
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  ${this.state.fuelTypePrice}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 10,
                  color: "#80859F",
                  fontWeight: "bold",
                  fontFamily: "Avenir",
                  alignSelf: "flex-end",
                  marginTop: 5,
                }}
              >
                {this.state.vehicle.make}
              </Text>
            </View>

            {this.state.membership != "no" ? (
              <View
                style={{ height: 80, width: "86%", justifyContent: "center" }}
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text
                      style={{
                        color: "#000",
                        fontFamily: "Avenir",
                        fontSize: 12,
                        fontWeight: "700",
                      }}
                    >
                      Membership
                    </Text>
                  </View>
                  {/* <Text style={{ color: "#80859F", marginLeft: 10, fontFamily: "Avenir", fontSize: 16, fontWeight: '700', textDecorationLine: 'line-through' }}>$1.99</Text> */}
                  <Text
                    style={{
                      color: "#000",
                      marginLeft: 10,
                      fontFamily: "Avenir",
                      fontSize: 16,
                      fontWeight: "700",
                    }}
                  >
                    $9.99 a month
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 10,
                    color: "#80859F",
                    fontWeight: "bold",
                    fontFamily: "Avenir",
                    alignSelf: "flex-end",
                    marginTop: 5,
                  }}
                >
                  Recurring on the date
                </Text>
              </View>
            ) : null}
          </View>
          <HeaderTxt title={"Address"} marginTop={16} />

          <View
            style={{
              flexDirection: "row",
              width: "86%",
              borderWidth: 1,
              borderColor: "#D9DAE3",
              borderRadius: 4,
              alignItems: "center",
              alignSelf: "center",
              height: 44,
              marginTop: 8,
            }}
          >
            <Text
              style={{
                color: "#000",
                marginLeft: 10,
                fontFamily: "Avenir",
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              {this.state.addressName}
            </Text>
          </View>

          {this.state.isFromCheckout ? (
            <View>
              <HeaderTxt title={"Payment Method"} marginTop={16} />
              <View
                style={{
                  flexDirection: "row",
                  width: "86%",
                  borderWidth: 1,
                  borderColor: "#D9DAE3",
                  borderRadius: 4,
                  alignItems: "center",
                  alignSelf: "center",
                  height: 44,
                  marginTop: 8,
                }}
              >
                <View style={{ alignItems: "center", width: 60 }}>
                  <Image
                    source={
                      this.props.route.params.paymentmethod == "google_pay"
                        ? AssetsImages.payment_google
                        : this.props.route.params.paymentmethod == "apple_pay"
                        ? AssetsImages.payment_apple
                        : this.props.route.params.paymentmethod == "paypal"
                        ? AssetsImages.payment_paypal
                        : this.props.route.params.paymentmethod == "card"
                        ? AssetsImages.creditcard
                        : null
                    }
                    style={{
                      resizeMode: "contain",
                      marginLeft: 10,
                      height: 16,
                    }}
                  />
                </View>
                {this.props.route.params.paymentmethod == "card" ? (
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      fontFamily: "Avenir",
                    }}
                  >
                    {this.props.route.params.carddata.card_id.last4}
                  </Text>
                ) : null}

                {this.props.route.params.paymentmethod == "card" ? (
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 13,
                      fontWeight: "700",
                      fontFamily: "Avenir",
                      color: "#8B90AA",
                    }}
                  >
                    {"EXP " +
                      this.props.route.params.carddata.card_id.exp_month +
                      "/" +
                      this.props.route.params.carddata.card_id.exp_year}
                  </Text>
                ) : null}
              </View>
            </View>
          ) : null}
          <HeaderTxt title={"Service Time / Date"} marginTop={16} />
          <View
            style={{
              flexDirection: "row",
              width: "86%",
              borderWidth: 1,
              borderColor: "#D9DAE3",
              borderRadius: 4,
              alignItems: "center",
              alignSelf: "center",
              height: 44,
              marginTop: 8,
            }}
          >
            <Text
              style={{
                color: "#000",
                marginLeft: 10,
                fontFamily: "Avenir",
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              {this.state.schedule_str}
            </Text>
          </View>

          {this.state.isFromCheckout ? (
            <TouchableOpacity>
              <HeaderTxt title={"Promo code"} marginTop={16} />

              <View
                style={{
                  flexDirection: "row",
                  width: "86%",

                  paddingLeft: 10,
                  height: 44,
                  marginTop: 8,
                }}
              >
                <View
                  style={{
                    width: "86%",

                    borderRadius: 4,
                    alignItems: "center",
                    alignSelf: "center",
                    height: 44,
                  }}
                >
                  <TextInput
                    style={{
                      height: 44,
                      width: "86%",
                      borderRadius: 5,
                      borderColor: Colors.InputText,
                      borderWidth: 1,
                      padding: 10,
                      fontSize: 14,
                      // color: Colors.Black,
                      alignSelf: "center",
                    }}
                    placeholder=""
                    placeholderTextColor={Colors.Black}
                    value={this.state.promo_cods}
                    editable={this.state.editable}
                    onChangeText={(text) => {
                      this.setState({ promo_cods: text }, () => {
                        if (this.state.promo_cods >= 2) {
                          this.setState({ is_btn_disabled: false });
                        }
                      });
                    }}
                    onBlur={() => {
                      // this.validation()
                    }}
                    onPressSubmit={() => {
                      this.setState({ keyboardVerticalOffsetValue: 0 });
                    }}
                  />
                  {this.state.is_error_msg_shown ? (
                    <ErrorContainer error_msg={this.state.error_msg} />
                  ) : null}
                </View>
                <TxtFullScreenBtn
                  title={"ADD"}
                  onPress={() => {
                    //

                    let request = {
                      promocode: this.state.promo_cods,
                    };
                    this.props.promo_code(request);
                    console.log("kapilPromode", request);
                  }}
                  disabled={this.state.is_btn_disabled ? true : false}
                  containerStyle={{
                    backgroundColor: this.state.is_btn_disabled
                      ? Colors.disable
                      : Colors.OrangeRed,
                    width: "20%",
                    height: "100%",
                  }}
                />
              </View>
            </TouchableOpacity>
          ) : null}
          <View
            style={{
              flexDirection: "row",
              width: "85%",
              alignItems: "center",
              justifyContent: "flex-start",
              alignSelf: "center",
              height: 44,
              marginTop: 20,
            }}
          >
            {this.state.remove ? (
              <TouchableOpacity
                onPress={() => {
                  this.props.recurringService({
                    order_id: this.state.order_id,
                  });
                }}
                style={{
                  flexDirection: "row",
                  borderRadius: 5,
                  borderColor: "#FF5C22",
                  width: "100%",
                  backgroundColor: "#FF5C22",
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                  height: 44,
                }}
              >
                <Text
                  style={{
                    color: "#FFF",

                    fontFamily: "Avenir",
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  REMOVE RECURRING SERVICE
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </ScrollView>
        {this.state.isFromCheckout ? (
          <View>
            {this.state.is_member ? (
              <TxtFullScreenBtn
                title={"CHECKOUT"}
                onPress={() => {
                  this.setState({ isVisible: true, memberships: true });
                }}
                disabled={this.state.is_btn_disabled}
                containerStyle={{
                  backgroundColor: this.state.is_btn_disabled
                    ? "#D1D2D4"
                    : "#FF5C22",
                  marginTop: 10,
                  marginBottom: 16,
                }}
              />
            ) : (
              <TxtFullScreenBtn
                title={"CHECKOUT"}
                onPress={() => {
                  this.setState({
                    membership: this.state.membership,
                    memberships: true,
                    is_member: false,
                  });
                  this.props.route.params.paymentmethod == "google_pay"
                    ? this.payWithGooglePay(stripeRequestData)
                    : this.props.route.params.paymentmethod == "apple_pay"
                    ? this.handleApplePayPress()
                    : this.props.route.params.paymentmethod == "paypal"
                    ? this.paypaldata()
                    : this.props.route.params.paymentmethod == "card"
                    ? this.handleCard()
                    : null;
                }}
                disabled={this.state.is_btn_disabled}
                containerStyle={{
                  backgroundColor: this.state.is_btn_disabled
                    ? "#D1D2D4"
                    : "#FF5C22",
                  marginTop: 10,
                  marginBottom: 16,
                }}
              />
            )}
          </View>
        ) : null}
      </SafeAreaContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  order_create: (request_data) => dispatch(order_create(request_data)),
  order_create_clear_data: () => dispatch(order_create_clear_data()),

  promo_code: (request_data) => dispatch(promo_code(request_data)),
  promo_code_clear_data: () => dispatch(promo_code_clear_data()),

  add_applepay: (request_data) => dispatch(add_applepay(request_data)),
  add_applepay_clear_data: () => dispatch(add_applepay_clear_data()),

  recurringService: (request_data) => dispatch(recurringService(request_data)),
  recurringService_clear_data: () => dispatch(recurringService_clear_data()),

  membership: (request_data) => dispatch(membership(request_data)),
  membership_clear_data: () => dispatch(membership_clear_data()),
  cancel_membership: (request_data) =>
    dispatch(cancel_membership(request_data)),
  cancle_membership_clear_data: () => dispatch(cancle_membership_clear_data()),
  user_profile: (request_data) => dispatch(user_profile(request_data)),

  membership_list_clear_data: () => dispatch(membership_list_clear_data()),
  membership_list: (request_data) => dispatch(membership_list(request_data)),
});

const mapStateToProps = (state) => ({
  is_success: state.order_create.is_success,
  is_fetching: state.order_create.is_fetching,
  msg: state.order_create.msg,

  is_success_promo_code: state.promo_code.is_success,
  is_fetching_promo_code: state.promo_code.is_fetching,
  error__promo_code: state.promo_code.error,
  msg_promo_code: state.promo_code.msg,
  promo_code_data: state.promo_code.promo_code_data,

  is_success_add: state.add_applepay.is_success,
  is_fetching_add: state.add_applepay.is_fetching,
  msg: state.add_applepay.msg,
  error: state.add_applepay.error,
  add_applepay_data: state.add_applepay.add_applepay_data,

  saved_vehicle_data: state.saved_vehicle.saved_vehicle_data,

  create_card_data_membership: state.membership.membership_data,
  is_success_membership: state.membership.is_success,
  is_fetching_membership: state.membership.is_fetching,
  msg_membership: state.membership.msg,
  error_membership: state.membership.error,
  create_cancel_data: state.cancel_mambership.cancel_membership_data,
  cancel_is_success: state.cancel_mambership.is_success,
  cancel_is_fetching: state.cancel_mambership.is_fetching,
  cancel_msg: state.cancel_mambership.msg,
  cancel_error: state.cancel_mambership.error,
  user_data: state.user_auth.user_data,

  is_succe_recurringService: state.recurringService.is_success,
  recurringService_data: state.recurringService.recurringService_data,
  is_fet_recurringService: state.recurringService.is_fetching,
  err_recurringService: state.recurringService.error,

  is_success_membership_list: state.membership_list.is_success,
  is_fetching_membership_list: state.membership_list.is_fetching,
  msg_membership_list: state.membership_list.msg,
  user_data_membership_list: state.membership_list.membership_list_data,
  user_data_membership_list_data: state.membership_list.memberships_list_data,
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);

import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Keyboard,
  Button,
  Modal,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Icon } from "native-base";
import { CONST } from "../../utils/constants";
import BtnWithImage from "../../components/btn_with_image";
import AssetsImages from "../../res";
import SafeAreaContainer from "../../components/safearea_container";
import styles from "./styles";
import ErrorContainer from "../../components/error_container";
import HeaderTxt from "../../components/header_txt";
import { connect } from "react-redux";
import {
  order_create,
  order_create_clear_data,
  add_applepay,
  add_applepay_clear_data,
  promo_code,
  promo_code_clear_data,
  membership_clear_data,
  membership,
  cancel_membership,
  recurringService,
  recurringService_clear_data,
  user_profile,
  cancle_membership_clear_data,
  membership_list,
  membership_list_clear_data,
} from "../../redux/actions";
import Loader from "../../components/loader";
import TxtFullScreenBtn from "../../components/txt_full_screen_btn";
import moment from "moment";
import stripe from "tipsi-stripe";
stripe.setOptions({
  publishableKey: "pk_test_AUrE92WoAMzjQEn4fThEEkzR",
  merchantId: "merchant.com.ezfillapp.consumer",
  androidPayMode: "test",
});
import Colors from "../../constants/Colors";
import { GooglePay } from "react-native-google-pay";
const allowedCardNetworks = ["AMEX", "DISCOVER", "JCB", "MASTERCARD", "VISA"];
const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];
const stripeRequestData = {
  cardPaymentMethod: {
    tokenizationSpecification: {
      type: "PAYMENT_GATEWAY",
      gateway: "stripe",
      gatewayMerchantId: "13474330361229841865",
      stripe: {
        publishableKey: "pk_test_AUrE92WoAMzjQEn4fThEEkzR",
        version: "2018-11-08",
      },
    },
    allowedCardNetworks,
    allowedCardAuthMethods,
  },
  transaction: {
    totalPrice: "1",
    totalPriceStatus: "FINAL",
    currencyCode: "INR",
  },
  merchantName: "Ezfill holdings Inc",
};
import {
  FreshChat_APP_ID,
  FreshChat_APP_KEY,
  PROJECT_TOKEN,
  API_secret,
} from "../../api/api_config";
import {
  Freshchat,
  FreshchatConfig,
  FaqOptions,
  ConversationOptions,
  FreshchatUser,
  FreshchatMessage,
  FreshchatNotificationConfig,
} from "react-native-freshchat-sdk";
var delivery_Fees = "";
var vehicleid = [];
var membershipdata = "";
var delivery_price = "";
class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,
      loading: false,
      Sussessfull: false,
      addressName: "",
      isFromCheckout: false,
      isPopUpOpeneds: false,
      promo_codes: false,
      promo_cods: "",
      deliveryFee: "",
      Delivery_fee: false,
      membership: "no",
      isPromoCode: "no",
      remove: false,
      editable: true,
      vehicle: {},
      is_member: true,
      memberships: true,
      payment_data: {},
      isVisible: false, //state of modal default false
      orderData: {},
      schedule_str: "",
      error_msg:
        "Please check that you've added a valid email\naddress and password.",
      is_error_msg_shown: false,
      allowed: false,
      complete: true,
      order_id: "",
      status: null,
      token: null,
      amexAvailable: false,
      membershipTest: false,
      discoverAvailable: false,
      masterCardAvailable: false,
      visaAvailable: false,
      oderHistory: false,
      membership_plan: "$9.99",
      plan_includes: [
        {
          title: "Free Deliveries",
          isAdded: true,
        },
        {
          title: "Weekly Refueling Schedule",
          isAdded: true,
        },
        {
          title: "Tire Air Pressure Check",
          isAdded: true,
        },
        {
          title: "24/7 Customer Support",
          isAdded: true,
        },
        {
          title: "Cancel Anytime!",
          isAdded: true,
        },
      ],
    };
  }

  //TODO:- class life cycle
  componentDidMount() {
    let request_user_profile = { user_id: this.props.user_data.data._id };
    this.props.membership_list(request_user_profile);
    this.props.user_profile(request_user_profile);
    if (this.props.user_data.data.membershipStatus == 1) {
      this.setState({
        is_member: false,
        membershipTest: false,
      });
    } else {
      this.setState({ is_member: true, membershipTest: true });
    }
    console.log(
      "DATASSSS => " + JSON.stringify(this.props.promo_code_data.code)
    );
    // Set the environment before the payment request
    if (Platform.OS === "android") {
      GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);
    }
    this.setState(
      { isFromCheckout: this.props.route.params.isFromCheckout },
      () => {
        this.props.navigation.setOptions({
          headerTitle: this.state.isFromCheckout ? "Checkout" : "Order",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 26,
            fontFamily: "Avenir",
            alignSelf: "center",
          },
          headerLeft: () => (
            <BtnWithImage
              img={AssetsImages.icon_back}
              btnImgStyle={{ height: 22, width: 22 }}
              onPress={() => {
                this.props.navigation.goBack();
              }}
              btnStyle={{ marginLeft: 8 }}
            />
          ),
          headerRight: () => (
            <BtnWithImage
              img={AssetsImages.icon_chat}
              btnImgStyle={{ height: 18, width: 18 }}
              onPress={() => {
                Freshchat.showFAQs();
                //this.setupUserFreshchat;
                // this.resetUserFreshchat;
                Freshchat.showConversations();
                // this.props.navigation.navigate("Schedule");
              }}
              btnStyle={{ marginRight: 8 }}
            />
          ),
        });

        this.setState({
          isFromMembership:
            (this.props.route.params &&
              this.props.route.params.isFromMembership) ||
            false,
          isFromAddVehicle:
            (this.props.route.params &&
              this.props.route.params.isFromAddVehicle) ||
            false,
          remove:
            (this.props.route.params && this.props.route.params.remove) ||
            false,

          oderHistory:
            (this.props.route.params && this.props.route.params.oderHistory) ||
            false,
          order_id:
            (this.props.route.params && this.props.route.params.order_id) || "",
        });
        this._unsubscribe = this.props.navigation.addListener("focus", () => {
          this.onFocus();
        });
        this.setState({ orderData: this.props.route.params.orderData }, () => {
          this.initialSetUp();
        });
      }
    );
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  onFocus = () => {
    console.log("ON focus....");
    let request_user_profile = { user_id: this.props.user_data.data._id };
    this.props.user_profile(request_user_profile);
    this.props.membership_list(request_user_profile);
    if (this.props.user_data.data.membershipStatus == 1) {
      this.setState({
        is_member: false,
        renew_date:
          this.props.user_data &&
          this.props.user_data.data &&
          this.props.user_data.data.membershipEnds,
        membership_title: "You're a EzFill Member",
      });
    } else {
      this.setState({ is_member: true });
    }
  };
  componentDidUpdate(prevProps) {
    console.log(
      "prevProps => " +
        JSON.stringify(prevProps) +
        "   ======  " +
        this.props.msg
    );
    if (this.props.is_ !== prevProps._delete) {
      if (this.props._delete) {
        if (!this.state.isApiCalled) {
          this.setState({ loading: true });
        }
      } else if (!this.props._delete) {
        this.setState({ loading: false, isApiCalled: true });
      }
    }
    if (this.props.cancel_is_fetching !== prevProps.cancel_is_fetching) {
      if (this.props.cancel_is_fetching) {
        if (!this.state.isApiCalled) {
          this.setState({ loading: true });
        }
      } else if (!this.props.cancel_is_fetching) {
        this.setState({ loading: false, isApiCalled: true });
      }
    }
    if (
      this.props.is_fetching_membership !== prevProps.is_fetching_membership
    ) {
      if (this.props.is_fetching_membership) {
        if (!this.state.isApiCalled) {
          this.setState({ loading: true });
        }
      } else if (!this.props.is_fetching_membership) {
        this.setState({ loading: false, isApiCalled: true });
      }
    }
    if (this.props.cancel_is_success !== prevProps.cancel_is_success) {
      if (this.props.cancel_is_success) {
        this.setState({ isSavedVahicleApiSuccess: true });
        setTimeout(() => {
          let request_user_profile = { user_id: this.props.user_data.data._id };
          this.props.user_profile(request_user_profile);
        }, 500);
        this.props.membership_clear_data();
        if (
          this.props.user_data &&
          this.props.user_data.data &&
          this.props.user_data.data.membershipStatus == 1
        ) {
          this.setState({
            is_member: false,
            renew_date:
              this.props.user_data &&
              this.props.user_data.data &&
              this.props.user_data.data.membershipEnds,
            membership_title: "You're a EzFill Member",
          });
        } else {
          this.setState({ is_member: true });
        }
      }
    }
    if (
      this.props.is_fetching_membership !== prevProps.is_fetching_membership
    ) {
      if (this.props.is_fetching_membership) {
        if (!this.state.isApiCalled) {
          this.setState({ loading: true });
        }
      } else if (!this.props._delete) {
        this.setState({ loading: false, isApiCalled: true });

        //  () => {
        // if (this.props.is_succes !== prevProps.is_succes) {
        //   if (this.props.is_succes) {
        //     this.props.saved_location_locar_clear_data();
        //   }
        // }
      }
    }
    if (this.props.cancel_is_success !== prevProps.cancel_is_success) {
      console.log("is_succe_delete", this.props.cancel_is_success);
      if (this.props.cancel_is_success == true) {
        // console.log("DATA====>", this.props.delete_Address_clear_data);
        // let request = { user_id: this.props.user_data.data._id };
        // this.props.saved_location(request);

        setTimeout(() => {
          let request_user_profile = { user_id: this.props.user_data.data._id };
          this.props.user_profile(request_user_profile);
        }, 500);
        this.setState({
          membership_title: "Become a EzFill Member",
          isPopUpOpened: false,
        });
        this.props.membership_clear_data();
        this.props.cancle_membership_clear_data();
        if (
          this.props.user_data &&
          this.props.user_data.data &&
          this.props.user_data.data.membershipStatus == 1
        ) {
          this.setState({
            is_member: false,
            renew_date:
              this.props.user_data &&
              this.props.user_data.data &&
              this.props.user_data.data.membershipEnds,
            membership_title: "You're a EzFill Member",
          });
        } else {
          this.setState({ is_member: true });
        }
      }
    }

    ///////////////////////////////////////////////////////////

    if (
      this.props.is_fetching_membership_list !==
      prevProps.is_fetching_membership_list
    ) {
      if (this.props.is_fetching_membership_list) {
        if (!this.state.isApiCalled) {
          this.setState({ loading: true });
        }
      } else if (!this.props.is_fetching_membership_list) {
        this.setState({ loading: false, isApiCalled: true });
      }
    }

    if (
      this.props.is_success_membership_list !==
      prevProps.is_success_membership_list
    ) {
      if (this.props.is_success_membership_list) {
        this.setState({ isSavedVahicleApiSuccess: true });
        // this.props.delete_Address_clear_data();
        console.log(
          "datatatatatata==========>",
          this.props.user_data_membership_list.membershipEndDate
        );
        this.props.membership_list_clear_data();
      }
    }

    if (
      this.props.is_fetching_membership_list !==
      prevProps.is_fetching_membership_list
    ) {
      if (this.props.is_fetching_membership_list) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching_membership_list) {
        this.setState({ loading: false }, () => {
          if (
            this.props.is_success_membership_list !==
            prevProps.is_success_membership_list
          ) {
            if (this.props.is_success_membership_list) {
              console.log(
                "datatatatatata==========>",
                this.props.user_data_membership_list
              );
              this.props.membership_list_clear_data();
            }
          }
        });
      }
    }

    //////////////////////////////////////////////////////

    if (this.props.cancel_is_fetching !== prevProps.cancel_is_fetching) {
      if (this.props.cancel_is_fetching) {
        this.setState({ loading: true });
      } else if (!this.props.cancel_is_fetching) {
        this.setState({ loading: false }, () => {
          if (this.props.cancel_is_success !== prevProps.cancel_is_success) {
            if (this.props.cancel_is_success) {
              setTimeout(() => {
                let request_user_profile = {
                  user_id: this.props.user_data.data._id,
                };
                this.props.user_profile(request_user_profile);
              }, 500);
              this.setState({
                membership_title: "Become a EzFill Member",
                isPopUpOpened: false,
              });
              this.props.membership_clear_data();
              this.props.cancle_membership_clear_data();
              if (
                this.props.user_data &&
                this.props.user_data.data &&
                this.props.user_data.data.membershipStatus == 1
              ) {
                this.setState({
                  is_member: false,
                  renew_date:
                    this.props.user_data &&
                    this.props.user_data.data &&
                    this.props.user_data.data.membershipEnds,
                  membership_title: "You're a EzFill Member",
                });
              } else {
                this.setState({ is_member: true });
              }
            }
          }
        });
      }
    }

    console.log(JSON.stringify(this.props));
    if (this.props.route.params != undefined) {
      if (this.props.route.params.getmembership == true) {
        this.props.route.params.getmembership = false;
      } else {
      }
    } else {
    }
    if (this.props.cancel_is_success !== prevProps.cancel_is_success) {
      console.log("cancel_is_success", this.props.cancel_is_success);
      if (this.props.cancel_is_success == true) {
        setTimeout(() => {
          let request_user_profile = { user_id: this.props.user_data.data._id };
          this.props.user_profile(request_user_profile);
        }, 500);
        this.props.membership_clear_data();
        this.props.cancle_membership_clear_data();
      }
    }

    if (
      this.props.is_fetching_membership !== prevProps.is_fetching_membership
    ) {
      if (this.props.is_fetching_membership) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching_membership) {
        this.setState({ loading: false }, () => {
          if (
            this.props.is_success_membership !== prevProps.is_success_membership
          ) {
            if (this.props.is_success_membership) {
              console.log("is_success_membership_kai");
              setTimeout(() => {
                let request_user_profile = {
                  user_id: this.props.user_data.data._id,
                };
                this.props.user_profile(request_user_profile);
              }, 500);
              this.props.membership_clear_data();
              this.props.cancle_membership_clear_data();
            }
          }
        });
      }
    }

    ///membership////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (
      this.props.is_fet_recurringService !== prevProps.is_fet_recurringService
    ) {
      if (this.props.is_fet_recurringService) {
        if (!this.state.isApiCalled) {
          this.setState({ loading: true });
        }
      } else if (!this.props.is_fet_recurringService) {
        this.setState({ loading: false, isApiCalled: true });
      }
    }
    if (
      this.props.is_succe_recurringService !==
      prevProps.is_succe_recurringService
    ) {
      if (this.props.is_succe_recurringService) {
        // this.setState({ isSavedVahicleApiSuccess: true });
        this.props.recurringService_clear_data();
      }
    }

    if (
      this.props.is_succe_recurringService !==
      prevProps.is_succe_recurringService
    ) {
      console.log("is_succe_delete", this.props.is_succe_recurringService);
      if (this.props.is_succe_recurringService == true) {
        this.props.navigation.navigate("OrderHistory");
        console.log("DATAghfjdklghfhdgfdsj====>");
        //this.props.navigation.navigate("Dashboard");
        // this.props.recurringService_clear_data();
      }
    }
    if (
      this.props.is_fet_recurringService !== prevProps.is_fet_recurringService
    ) {
      if (this.props.is_fet_recurringService) {
        this.setState({ loading: true });
      } else if (!this.props.is_fet_recurringService) {
        this.setState({ loading: false }, () => {
          if (
            this.props.is_succe_recurringService !==
            prevProps.is_succe_recurringService
          ) {
            console.log(
              "kapildevVidua====>",
              this.props.is_succe_recurringService
            );
            if (this.props.is_succe_recurringService) {
              console.log("DATAghfjdklghfhdgfdsj====>");
              console.log(
                "DATAghfjdklghfhdgfdsj====>",
                this.props.recurringService_data
              );
              console.log("DATA====>", this.props.recurringService_data);
              // this.props.navigation.navigate("OrderHistory");

              // this.props.recurringService_clear_data();
            }
          }
        });
      }
    }

    ////////////////////////////////////////////////////////////////////////////

    if (this.props.is_fetching !== prevProps.is_fetching) {
      if (this.props.is_fetching) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching) {
        this.setState({ loading: false });
      }
    }

    if (this.props.is_success !== prevProps.is_success) {
      console.log("prevProps => " + prevProps.is_success);
      console.log("this.props => " + this.props.is_success);

      if (this.props.is_success == true) {
        console.log("success => ");
        this.setState({
          Sussessfull: true,
        });

        this.props.order_create_clear_data();
      }
    }

    if (
      this.props.is_fetching_promo_code !== prevProps.is_fetching_promo_code
    ) {
      if (this.props.is_fetching_promo_code) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching_promo_code) {
        this.setState({ loading: false }, () => {
          if (
            this.props.is_success_promo_code !== prevProps.is_success_promo_code
          ) {
            if (this.props.is_success_promo_code) {
              console.log(
                "DATASSSS => " + JSON.stringify(this.props.promo_code_data.code)
              );
              console.log("success => ");
              this.setState({ editable: false, isPromoCode: "yes" });

              this.props.promo_code_clear_data();
            }
          }
          if (this.props.error__promo_code !== prevProps.error__promo_code) {
            console.log("error==>");
            if (this.props.error__promo_code == true) {
              this.setState({
                error_msg: this.props.msg_promo_code,
                is_error_msg_shown: true,
              });
              this.props.promo_code_clear_data();
            }
          }
        });
      }
    }

    if (this.props.is_fetching_add !== prevProps.is_fetching_add) {
      if (this.props.is_fetching_add) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching_add) {
        this.setState({ loading: false });
      }
    }

    if (this.props.is_success_add !== prevProps.is_success_add) {
      console.log("prevProps => " + prevProps.is_success_add);
      console.log("this.props => " + this.props.is_success_add);

      if (this.props.is_success_add == true) {
        console.log("success => ");
        const vehiclevalue = this.props.route.params.orderData.vehicle;
        vehiclevalue.map((getvehicleId) => {
          var id = getvehicleId._id;
          vehicleid.push(id);
        });

        console.log("vehiclevalue => ", vehicleid);

        // this.state.memberships
        //   ? this.props.membership({
        //       user_id: this.props.user_data.data._id,
        //       cardToken: this.props.add_applepay_data.cards.id,
        //       paymentMethod: this.props.route.params.paymentmethod,
        //     })
        //   : null;
        if (this.props.user_data.data.membershipStatus == 1) {
          delivery_Fees =
            this.props.route.params.fuelTypePrice +
            this.props.user_data_membership_list.delivery_fee;
        } else if (membershipdata == "no") {
          delivery_Fees =
            this.props.route.params.fuelTypePrice +
            this.props.user_data_membership_list.delivery_fee;
        } else {
          delivery_Fees = this.props.route.params.fuelTypePrice;

          this.props.user_data_membership_list.delivery_fee +
            this.props.user_data_membership_list_data.price;
        }

        let request = {
          user_id: this.props.route.params.orderData.user_id,
          vehicle_id: vehicleid.toString(),

          isPromoCode: this.state.isPromoCode,
          promocode: this.props.promo_code_data.code,

          deliveryFee: delivery_Fees,
          membership: this.state.membership,
          Payment: this.props.route.params.orderData.Payment,
          latitude: this.props.route.params.orderData.latitude,
          longitude: this.props.route.params.orderData.longitude,
          addressName: {
            line1: this.props.route.params.line1,
            line2: this.props.route.params.line2,
            city: this.props.route.params.city,
            zipcode: this.props.route.params.zipcode,
            state: this.props.route.params.state,
            type: this.props.route.params.type,
          },
          recurringService: this.props.route.params.orderData.recurringService,
          schedule_date: this.props.route.params.orderData.startTime,
          schedule_time: this.props.route.params.orderData.endTime,
          inGarage: this.props.route.params.orderData.inGarage,
          floor: this.props.route.params.orderData.floor,
          additionalNotes: this.props.route.params.orderData.additionalNotes,
          paymentMethod: this.props.route.params.paymentmethod,
          txn_id: this.props.add_applepay_data.cards.balance_transaction,
          cardinfo: {
            last4: this.props.add_applepay_data.cards.payment_method_details
              .card.last4,
            exp_month: this.props.add_applepay_data.cards.payment_method_details
              .card.exp_month,
            exp_year: this.props.add_applepay_data.cards.payment_method_details
              .card.exp_year,
            name: this.props.add_applepay_data.cards.payment_method_details.card
              .brand,
          },
          card_id: this.props.add_applepay_data.cards.id,
        };
        console.log("cardJeson", JSON.stringify(request));
        this.props.order_create(request);
      }
    }
  }

  initialSetUp = () => {
    let request_user_profile = {
      user_id:
        this.props && this.props.user_data && this.props.user_data.data._id,
    };
    this.props.user_profile(request_user_profile);
    if (
      this.props &&
      this.props.user_data &&
      this.props.user_data.data.membershipStatus == 1
    ) {
      this.setState({
        is_member: false,
      });
    } else {
      this.setState({ is_member: true });
    }
    if (this.state.isFromCheckout) {
      delivery_price = this.props.user_data_membership_list.delivery_fee;
      this.setState({
        deliveryFee: this.props.user_data_membership_list.delivery_fee,
        vehicle: this.state.orderData.vehicle,
        addressName: this.state.orderData.addressName,
        payment_data: this.state.orderData.payment_data,
        schedule_str:
          moment(this.state.orderData.startTime, "YYYY-MM-DD").format(
            "MMM Do"
          ) +
          " at " +
          moment(this.state.orderData.endTime, "hh:mm").format("hA") +
          " (" +
          this.state.orderData.recurringService +
          ")",
      });
    } else {
      this.props.saved_vehicle_data.data.map((item) => {
        if (this.state.orderData.vehicle_id == item._id) {
          this.setState({ vehicle: item });
        }
      });
      var dateStr = "";
      if (this.state.orderData.recurringService != "No") {
        dateStr =
          moment(this.state.orderData.startTime, "YYYY-MM-DD").format(
            "MMM Do"
          ) +
          " at " +
          moment(this.state.orderData.endTime, "hh:mm").format("hA");
        +" (" + this.state.orderData.recurringService + ")";
      } else {
        dateStr =
          moment(this.state.orderData.startTime, "YYYY-MM-DD").format(
            "MMM Do"
          ) +
          " at " +
          moment(this.state.orderData.endTime, "hh:mm").format("hA");
      }
      if (this.state.oderHistory) {
        delivery_price = this.props.user_data_membership_list.delivery_fee;
        this.setState({
          deliveryFee: this.state.orderData.deliveryFee,
          addressName: this.state.orderData.addresses[0].line1,

          schedule_str: dateStr,
        });
      } else {
        this.setState({
          deliveryFee: this.props.user_data_membership_list.delivery_fee,
          addressName: this.state.orderData.addressName,

          schedule_str: dateStr,
        });
      }
    }
  };
  async componentWillMount() {
    let request_user_profile = { user_id: this.props.user_data.data._id };
    this.props.user_profile(request_user_profile);
    if (this.props.user_data.data.membershipStatus == 1) {
      this.setState({
        is_member: false,
      });
    } else {
      this.setState({ is_member: true });
    }
    const allowed = await stripe.deviceSupportsNativePay();
    const amexAvailable = await stripe.canMakeNativePayPayments({
      networks: ["american_express"],
    });
    const discoverAvailable = await stripe.canMakeNativePayPayments({
      networks: ["discover"],
    });
    const masterCardAvailable = await stripe.canMakeNativePayPayments({
      networks: ["master_card"],
    });
    const visaAvailable = await stripe.canMakeNativePayPayments({
      networks: ["visa"],
    });
    this.setState({
      allowed,
      amexAvailable,
      discoverAvailable,
      masterCardAvailable,
      visaAvailable,
    });
  }
  paypaldata() {
    const vehiclevalue = this.props.route.params.orderData.vehicle;
    vehiclevalue.map((getvehicleId) => {
      var id = getvehicleId._id;
      vehicleid.push(id);
    });

    console.log("vehiclevalue => ", vehicleid);
    if (
      this.props &&
      this.props.user_data &&
      this.props.user_data.data.membershipStatus == 1
    ) {
      delivery_Fees =
        this.props.route.params.fuelTypePrice +
        this.props.user_data_membership_list.delivery_fee;
    } else if (membershipdata == "no") {
      delivery_Fees =
        this.props.route.params.fuelTypePrice +
        this.props.user_data_membership_list.delivery_fee;
    } else {
      delivery_Fees = this.props.route.params.fuelTypePrice;

      this.props.user_data_membership_list.delivery_fee;
      this.props.user_data_membership_list_data.price;
    }
    let request = {
      user_id: this.props.route.params.orderData.user_id,
      vehicle_id: vehicleid.toString(),
      deliveryFee: delivery_Fees,
      membership: this.state.membership,
      isPromoCode: this.state.isPromoCode,
      promocode: this.props.promo_code_data.code,
      Payment: this.props.route.params.orderData.Payment,
      latitude: this.props.route.params.orderData.latitude,
      longitude: this.props.route.params.orderData.longitude,
      addressName: {
        line1: this.props.route.params.line1,
        line2: this.props.route.params.line2,
        city: this.props.route.params.city,
        zipcode: this.props.route.params.zipcode,
        state: this.props.route.params.state,
        type: this.props.route.params.type,
      },
      recurringService: this.props.route.params.orderData.recurringService,
      schedule_date: this.props.route.params.orderData.startTime,
      schedule_time: this.props.route.params.orderData.endTime,
      inGarage: this.props.route.params.orderData.inGarage,
      floor: this.props.route.params.orderData.floor,
      additionalNotes: this.props.route.params.orderData.additionalNotes,
      paymentMethod: this.props.route.params.paymentmethod,
      txn_id: "",
      cardinfo: {
        last4: "",
        exp_month: "",
        exp_year: "",
        name: "",
      },
      card_id: "",
    };
    console.log("cardJeson", JSON.stringify(request));
    this.props.navigation.navigate("Paypal", {
      is_selected_home: true,
      requestData: request,
      orderData: this.state.orderData,
      isFromAddVehicle: this.state.isFromAddVehicle,
      isFromMembership: this.state.isFromMembership,
      orderData: "",
      is_selected_home: "",
      memberships: this.state.memberships,
      membership: membershipdata,
      deliveryFee: delivery_Fees,
      line1: this.props.route.params.line1,
      line2: this.props.route.params.line2,
      city: this.props.route.params.city,
      zipcode: this.props.route.params.zipcode,
      state: this.props.route.params.state,
      type: this.props.route.params.type,
    });
  }
  handleCard() {
    const vehiclevalue = this.props.route.params.orderData.vehicle;
    vehiclevalue.map((getvehicleId) => {
      var id = getvehicleId._id;
      vehicleid.push(id);
    });
    console.log("vehiclevalue => ", vehicleid);

    // this.state.memberships
    //   ? this.props.membership({
    //       user_id: this.props.user_data.data._id,
    //       cardToken: this.props.route.params.carddata.card_id._id,
    //       paymentMethod: this.props.route.params.paymentmethod,
    //     })
    //   : null;
    if (
      this.props &&
      this.props.user_data &&
      this.props.user_data.data.membershipStatus == 1
    ) {
      delivery_Fees =
        this.props.route.params.fuelTypePrice +
        this.props.user_data_membership_list.delivery_fee;
    } else if (membershipdata == "no") {
      delivery_Fees =
        this.props.route.params.fuelTypePrice +
        this.props.user_data_membership_list.delivery_fee;
    } else {
      delivery_Fees = this.props.route.params.fuelTypePrice;

      this.props.user_data_membership_list.delivery_fee;
      this.props.user_data_membership_list_data.price;
    }

    let request = {
      user_id: this.props.route.params.orderData.user_id,
      vehicle_id: vehicleid.toString(),
      deliveryFee: delivery_Fees,
      membership: this.state.membership,
      isPromoCode: this.state.isPromoCode,
      promocode: this.props.promo_code_data.code,
      Payment: this.props.route.params.orderData.Payment,
      latitude: this.props.route.params.orderData.latitude,
      longitude: this.props.route.params.orderData.longitude,
      addressName: {
        line1: this.props.route.params.line1,
        line2: this.props.route.params.line2,
        city: this.props.route.params.city,
        zipcode: this.props.route.params.zipcode,
        state: this.props.route.params.state,
        type: this.props.route.params.type,
      },
      recurringService: this.props.route.params.orderData.recurringService,
      schedule_date: this.props.route.params.orderData.startTime,
      schedule_time: this.props.route.params.orderData.endTime,
      inGarage: this.props.route.params.orderData.inGarage,
      floor: this.props.route.params.orderData.floor,
      additionalNotes: this.props.route.params.orderData.additionalNotes,
      paymentMethod: this.props.route.params.paymentmethod,
      txn_id: "",
      cardinfo: {
        last4: this.props.route.params.carddata.card_id.last4,
        exp_month: this.props.route.params.carddata.card_id.exp_month,
        exp_year: this.props.route.params.carddata.card_id.exp_year,
        name: this.props.route.params.carddata.card_id.name,
      },
      card_id: this.props.route.params.carddata.card_id._id,
    };
    console.log(JSON.stringify(request));
    this.props.order_create(request);
  }
  handleCompleteChange = (complete) => this.setState({ complete });

  handleApplePayPress = async () => {
    try {
      const token = await stripe.paymentRequestWithNativePay(
        {
          requiredBillingAddressFields: ["all"],
          requiredShippingAddressFields: ["all"],
          shippingMethods: [
            {
              id: "fedex",
              label: "FedEX",
              detail: "Test @ 10",
              amount: "10.00",
            },
          ],
        },
        [
          {
            label: "Whisky",
            amount: "50.00",
          },
        ]
      );

      this.setState({ loading: false, token });

      if (this.state.complete) {
        // await stripe.completeNativePayRequest();
        this.setState({ status: "Apple Pay payment completed" });
        var request = {
          customer_id: "",
          cardToken: this.state.token.tokenId,
          status: "1",
          amount: "60",
          currency: "usd",
        };
        this.props.add_applepay(request);
      } else {
        await stripe.cancelNativePayRequest();
        this.setState({ status: "Apple Pay payment cenceled" });
      }
    } catch (error) {
      this.setState({ loading: false, status: `Error: ${error.message}` });
    }
  };
  payWithGooglePay = (requestData) => {
    // Check if Google Pay is available
    GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods).then(
      (ready) => {
        if (ready) {
          // Request payment token
          GooglePay.requestPayment(requestData)
            .then(this.handleSuccess)
            .catch(this.handleError);
        }
      }
    );
  };
  handleSuccess = (token) => {
    const tokendata = JSON.parse(token);
    var request = {
      customer_id: "",
      cardToken: tokendata.id,
      status: "1",
      amount: "60",
      currency: "usd",
    };

    console.log(request);
    this.props.add_applepay(request);
  };
  handleError = (error) =>
    console.log("Error", `${error.code}\n${error.message}`);

  render() {
    return (
      <SafeAreaContainer
        title={this.state.title}
        bodyTxt={this.state.bodyTxt}
        isModalOpened={this.state.isPopUpOpened}
        onDismiss={() => {
          this.setState({ isPopUpOpened: false });
        }}
      >
        <Loader loading={this.state.loading} />

        <ScrollView style={styles.container}>
          <View
            style={{
              backgroundColor: "#F3F4F6",
              alignItems: "center",
              justifyContent: "center",
              borderBottomColor: "#E6E6E8",
              borderBottomWidth: 1,
              borderTopColor: "#E6E6E8",
              borderTopWidth: 1,
            }}
          >
            <View
              style={{
                height: 80,
                width: "86%",
                justifyContent: "center",
                borderBottomColor: "#E6E6E8",
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text
                    style={{
                      color: "#000",
                      fontFamily: "Avenir",
                      fontSize: 12,
                      fontWeight: "700",
                    }}
                  >
                    Delivery Fee
                  </Text>
                </View>
                {this.state.membership == this.state.membership ? (
                  this.state.Delivery_fee ? (
                    <View style={{ flexDirection: "row" }}>
                      <View>
                        <Text
                          style={{
                            color: "#80859F",
                            marginLeft: 10,
                            fontFamily: "Avenir",
                            fontSize: 16,
                            fontWeight: "700",
                            textDecorationLine: "line-through",
                          }}
                        >
                          ${this.state.deliveryFee}
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: "#000",
                          marginLeft: 10,
                          fontFamily: "Avenir",
                          fontSize: 16,
                          fontWeight: "700",
                        }}
                      >
                        $0.00
                      </Text>
                    </View>
                  ) : (
                    <Text
                      style={{
                        color: "#000",
                        marginLeft: 10,
                        fontFamily: "Avenir",
                        fontSize: 16,
                        fontWeight: "700",
                      }}
                    >
                      ${this.state.deliveryFee}
                    </Text>
                  )
                ) : (
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color: "#80859F",
                        marginLeft: 10,
                        fontFamily: "Avenir",
                        fontSize: 16,
                        fontWeight: "700",
                        textDecorationLine: "line-through",
                      }}
                    >
                      ${this.state.deliveryFee}
                    </Text>
                    <Text
                      style={{
                        color: "#000",
                        marginLeft: 10,
                        fontFamily: "Avenir",
                        fontSize: 16,
                        fontWeight: "700",
                      }}
                    >
                      $0.00
                    </Text>
                  </View>
                )}
              </View>
              <Modal
                animated={false}
                animationType="none"
                transparent={true}
                visible={this.state.isVisible}
                onRequestClose={() => {
                  console.log("Modal has been closed.");
                }}
              >
                {/*All views of Modal*/}
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.7)",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: CONST.DEVICE_WIDTH - 40,
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 20,
                        fontWeight: "bold",
                        fontFamily: "Avenir",
                        width: "86%",
                        marginTop: 20,
                        alignSelf: "center",
                        textAlign: "left",
                      }}
                      allowFontScaling={false}
                    >
                      Become a EzFill Member
                    </Text>
                    <Text
                      style={{
                        color: "#FF7000",
                        fontSize: 20,
                        fontWeight: "bold",
                        fontFamily: "Avenir",
                        width: "86%",

                        alignSelf: "center",
                        textAlign: "left",
                      }}
                      allowFontScaling={false}
                    >
                      for only $
                      {this.props.user_data_membership_list_data.price} a month
                    </Text>

                    <FlatList
                      style={{ width: "100%", marginTop: 15 }}
                      data={this.props.user_data_membership_list_data.plans}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => {
                        return (
                          <View
                            style={{
                              flexDirection: "row",
                              width: "100%",
                              height: 30,
                            }}
                          >
                            <Image
                              style={{
                                height: 20,
                                width: 20,
                                resizeMode: "contain",
                                marginLeft: 24,
                              }}
                              source={AssetsImages.icon_check}
                            />
                            <Text
                              style={{
                                color: "#80859F",
                                marginLeft: 10,
                                fontFamily: "Avenir",
                                fontSize: 16,
                              }}
                            >
                              {item.title}
                            </Text>
                          </View>
                        );
                      }}
                    />
                    <View>
                      <TxtFullScreenBtn
                        title={"ADD  MEMBERSHIP TO CHECKOUT"}
                        onPress={() => {
                          this.setState({
                            isVisible: !this.state.isVisible,
                            membership: "yes",
                            memberships: false,
                            is_member: false,
                            Delivery_fee: true,
                          });
                        }}
                        disabled={false}
                        containerStyle={{
                          backgroundColor: "#FF5C22",
                          marginTop: 20,
                        }}
                      />
                      <TxtFullScreenBtn
                        title={"NO THANKS"}
                        onPress={() => {
                          this.setState({
                            isVisible: !this.state.isVisible,
                            membership: "no",
                            memberships: true,
                            is_member: false,
                          });
                          // this.props.cancel_membership({
                          //   user_id: this.props.user_data.data._id,
                          // });
                          // this.props.route.params.paymentmethod == "google_pay"
                          //   ? this.payWithGooglePay(stripeRequestData)
                          //   : this.props.route.params.paymentmethod ==
                          //     "apple_pay"
                          //   ? this.handleApplePayPress()
                          //   : this.props.route.params.paymentmethod == "paypal"
                          //   ? this.paypaldata()
                          //   : this.props.route.params.paymentmethod == "card"
                          //   ? this.handleCard()
                          //   : null;
                        }}
                        disabled={false}
                        containerStyle={{
                          backgroundColor: "#00000000",
                          marginTop: 10,
                          marginBottom: 20,
                          borderColor: "#747A93",
                          borderWidth: 1,
                        }}
                        fontColor={"#747A93"}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
              <Modal
                animated={false}
                animationType="none"
                transparent={true}
                visible={this.state.isPopUpOpeneds}
                onRequestClose={() => {
                  console.log("Modal has been closed.");
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.7)",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: CONST.DEVICE_WIDTH - 40,
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 20,
                        fontWeight: "bold",
                        fontFamily: "Avenir",
                        width: "86%",
                        marginTop: 20,
                        alignSelf: "center",
                        textAlign: "left",
                      }}
                      allowFontScaling={false}
                    >
                      Service Scheduled
                    </Text>
                    <Text
                      style={{
                        color: "#747A93",
                        fontSize: 14,
                        width: "86%",
                        marginTop: 10,
                        alignSelf: "center",
                        textAlign: "left",
                        lineHeight: 23,
                        fontFamily: "Avenir",
                      }}
                      allowFontScaling={false}
                    >
                      {
                        "Your service has been ordered.\nDon’t forget to leave your gas door open."
                      }
                    </Text>
                    <Image
                      style={{ width: "100%", height: 180, marginTop: 10 }}
                      source={AssetsImages.bitmap}
                    />
                    <TxtFullScreenBtn
                      title={"CLOSE"}
                      onPress={() => {
                        this.props.navigation.navigate("Dashboard", {
                          oder_success: true,
                          orderData: this.state.orderData,
                          isFromCheckout: true,
                        });
                        this.setState({
                          isPopUpOpeneds: !this.state.isPopUpOpeneds,
                        });
                      }}
                      disabled={false}
                      containerStyle={{
                        backgroundColor: "#FF5C22",
                        marginTop: 20,
                        marginBottom: 20,
                      }}
                    />
                  </View>
                </View>
              </Modal>
              <Modal
                animated={false}
                animationType="none"
                transparent={true}
                visible={this.state.Sussessfull}
                onRequestClose={() => {
                  console.log("Modal has been closed.");
                }}
              >
                {/*All views of Modal*/}
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.7)",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: CONST.DEVICE_WIDTH - 100,
                      borderRadius: 5,
                    }}
                  >
                    <Icon
                      style={{
                        marginTop: 15,

                        justifyContent: "center",
                        alignSelf: "center",
                        fontSize: 45,
                        color: "#FF5C22",
                      }}
                      name="check-circle"
                      type="FontAwesome5"
                    />
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 18,
                        fontWeight: "bold",
                        fontFamily: "Avenir",
                        justifyContent: "center",
                        marginTop: 10,
                        alignSelf: "center",
                        textAlign: "left",
                      }}
                      allowFontScaling={false}
                    >
                      Order placed.
                    </Text>
                    <Text
                      style={{
                        color: "#FF7000",
                        fontSize: 15,
                        fontWeight: "bold",
                        fontFamily: "Avenir",
                        justifyContent: "center",
                        marginTop: 3,

                        alignSelf: "center",
                        textAlign: "left",
                      }}
                      allowFontScaling={false}
                    >
                      Your Order placed successfully.
                    </Text>

                    <View>
                      <TxtFullScreenBtn
                        title={"OK"}
                        onPress={() => {
                          this.setState({
                            isPopUpOpeneds: true,
                            Sussessfull: !this.state.Sussessfull,
                          });
                          this.props.promo_code_clear_data();
                        }}
                        disabled={false}
                        containerStyle={{
                          backgroundColor: "#FF5C22",
                          marginTop: 20,
                          marginBottom: 20,
                          height: 30,
                          width: "50%",
                        }}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
              <Modal
                animated={false}
                animationType="none"
                transparent={true}
                visible={this.state.promo_codes}
                onRequestClose={() => {
                  console.log("Modal has been closed.");
                }}
              >
                {/*All views of Modal*/}
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.7)",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: CONST.DEVICE_WIDTH - 100,
                      borderRadius: 5,
                    }}
                  >
                    <TouchableHighlight
                      style={{
                        position: "absolute",
                        top: -15,
                        right: -8,
                        backgroundColor: "#fff",
                        borderRadius: 30,
                      }}
                      onPress={() => {
                        this.setState({ promo_codes: false });
                      }}
                    >
                      <Image
                        style={{ width: 40, height: 40 }}
                        source={AssetsImages.icon_delete}
                      />
                    </TouchableHighlight>
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 20,
                        fontWeight: "bold",
                        fontFamily: "Avenir",
                        width: "80%",
                        marginTop: 20,
                        alignSelf: "center",
                        textAlign: "left",
                      }}
                      allowFontScaling={false}
                    >
                      Have a promo code?
                    </Text>
                    <HeaderTxt title={"Promo code"} marginTop={30} />

                    <TextInput
                      style={{
                        height: 44,
                        width: "86%",
                        borderRadius: 5,
                        borderColor: Colors.InputText,
                        borderWidth: 1,
                        paddingLeft: 10,

                        fontSize: 14,
                        color: Colors.Black,
                        alignSelf: "center",
                        marginTop: 8,
                      }}
                      placeholder=""
                      placeholderTextColor={Colors.Black}
                      value={this.state.promo_cods}
                      onChangeText={(text) => {
                        this.setState({ promo_cods: text }, () => {
                          if (this.state.promo_cods >= 2) {
                            this.setState({ is_btn_disabled: false });
                          }
                        });
                      }}
                      onBlur={() => {
                        // this.validation()
                      }}
                      onPressSubmit={() => {
                        this.setState({ keyboardVerticalOffsetValue: 0 });
                      }}
                    />
                    {this.state.is_error_msg_shown ? (
                      <ErrorContainer error_msg={this.state.error_msg} />
                    ) : null}
                    <TxtFullScreenBtn
                      title={"PROMO CODE"}
                      onPress={() => {
                        //

                        let request = {
                          promocode: this.state.promo_cods,
                        };
                        this.props.promo_code(request);
                        console.log("kapilPromode", request);
                      }}
                      disabled={this.state.is_btn_disabled ? true : false}
                      containerStyle={{
                        backgroundColor: this.state.is_btn_disabled
                          ? Colors.disable
                          : Colors.OrangeRed,
                        marginTop: 25,
                        marginBottom: 20,
                      }}
                    />
                  </View>
                </View>
              </Modal>
              {this.state.membershipTest ? (
                this.state.Delivery_fee ? (
                  <Text
                    style={{
                      fontSize: 10,
                      color: Colors.LightGray,
                      fontWeight: "bold",
                      fontFamily: "Avenir",
                      alignSelf: "flex-end",
                      marginTop: 5,
                    }}
                  >
                    Free delivery with membership
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#FF5C22",
                      fontWeight: "bold",
                      fontFamily: "Avenir",
                      alignSelf: "flex-end",
                      marginTop: 5,
                    }}
                  >
                    Become a member for unlimited free delivery
                  </Text>
                )
              ) : (
                <Text
                  style={{
                    fontSize: 10,
                    color: Colors.LightGray,
                    fontWeight: "bold",
                    fontFamily: "Avenir",
                    alignSelf: "flex-end",
                    marginTop: 5,
                  }}
                >
                  Free delivery with membership
                </Text>
              )}
            </View>
            <View
              style={{
                height: 80,
                width: "86%",
                justifyContent: "center",
                borderBottomColor: "#E6E6E8",
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text
                    style={{
                      color: "#000",
                      fontFamily: "Avenir",
                      fontSize: 12,
                      fontWeight: "700",
                    }}
                  >
                    Fuel Types
                  </Text>
                </View>
                {/* <Text style={{ color: "#80859F", marginLeft: 10, fontFamily: "Avenir", fontSize: 16, fontWeight: '700', textDecorationLine: 'line-through' }}>$1.99</Text> */}
                <Text
                  style={{
                    color: "#000",
                    marginLeft: 10,
                    fontFamily: "Avenir",
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  {this.state.vehicle.fuel_type}
                </Text>
                <Text
                  style={{
                    color: "#000",
                    marginLeft: 10,
                    fontFamily: "Avenir",
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  ${this.props.route.params.fuelTypePrice}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 10,
                  color: "#80859F",
                  fontWeight: "bold",
                  fontFamily: "Avenir",
                  alignSelf: "flex-end",
                  marginTop: 5,
                }}
              >
                {this.state.vehicle.make}
              </Text>
            </View>

            {this.state.membership != "no" ? (
              <View
                style={{ height: 80, width: "86%", justifyContent: "center" }}
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text
                      style={{
                        color: "#000",
                        fontFamily: "Avenir",
                        fontSize: 12,
                        fontWeight: "700",
                      }}
                    >
                      Membership
                    </Text>
                  </View>
                  {/* <Text style={{ color: "#80859F", marginLeft: 10, fontFamily: "Avenir", fontSize: 16, fontWeight: '700', textDecorationLine: 'line-through' }}>$1.99</Text> */}
                  <Text
                    style={{
                      color: "#000",
                      marginLeft: 10,
                      fontFamily: "Avenir",
                      fontSize: 16,
                      fontWeight: "700",
                    }}
                  >
                    $9.99 a month
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 10,
                    color: "#80859F",
                    fontWeight: "bold",
                    fontFamily: "Avenir",
                    alignSelf: "flex-end",
                    marginTop: 5,
                  }}
                >
                  Recurring on the date
                </Text>
              </View>
            ) : null}
          </View>
          <HeaderTxt title={"Address"} marginTop={16} />

          <View
            style={{
              flexDirection: "row",
              width: "86%",
              borderWidth: 1,
              borderColor: "#D9DAE3",
              borderRadius: 4,
              alignItems: "center",
              alignSelf: "center",
              height: 44,
              marginTop: 8,
            }}
          >
            <Text
              style={{
                color: "#000",
                marginLeft: 10,
                fontFamily: "Avenir",
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              {this.state.addressName}
            </Text>
          </View>

          {this.state.isFromCheckout ? (
            <View>
              <HeaderTxt title={"Payment Method"} marginTop={16} />
              <View
                style={{
                  flexDirection: "row",
                  width: "86%",
                  borderWidth: 1,
                  borderColor: "#D9DAE3",
                  borderRadius: 4,
                  alignItems: "center",
                  alignSelf: "center",
                  height: 44,
                  marginTop: 8,
                }}
              >
                <View style={{ alignItems: "center", width: 60 }}>
                  <Image
                    source={
                      this.props.route.params.paymentmethod == "google_pay"
                        ? AssetsImages.payment_google
                        : this.props.route.params.paymentmethod == "apple_pay"
                        ? AssetsImages.payment_apple
                        : this.props.route.params.paymentmethod == "paypal"
                        ? AssetsImages.payment_paypal
                        : this.props.route.params.paymentmethod == "card"
                        ? AssetsImages.creditcard
                        : null
                    }
                    style={{
                      resizeMode: "contain",
                      marginLeft: 10,
                      height: 16,
                    }}
                  />
                </View>
                {this.props.route.params.paymentmethod == "card" ? (
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      fontFamily: "Avenir",
                    }}
                  >
                    {this.props.route.params.carddata.card_id.last4}
                  </Text>
                ) : null}

                {this.props.route.params.paymentmethod == "card" ? (
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 13,
                      fontWeight: "700",
                      fontFamily: "Avenir",
                      color: "#8B90AA",
                    }}
                  >
                    {"EXP " +
                      this.props.route.params.carddata.card_id.exp_month +
                      "/" +
                      this.props.route.params.carddata.card_id.exp_year}
                  </Text>
                ) : null}
              </View>
            </View>
          ) : null}
          <HeaderTxt title={"Service Time / Date"} marginTop={16} />
          <View
            style={{
              flexDirection: "row",
              width: "86%",
              borderWidth: 1,
              borderColor: "#D9DAE3",
              borderRadius: 4,
              alignItems: "center",
              alignSelf: "center",
              height: 44,
              marginTop: 8,
            }}
          >
            <Text
              style={{
                color: "#000",
                marginLeft: 10,
                fontFamily: "Avenir",
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              {this.state.schedule_str}
            </Text>
          </View>

          {this.state.isFromCheckout ? (
            <TouchableOpacity>
              <HeaderTxt title={"Promo code"} marginTop={16} />

              <View
                style={{
                  flexDirection: "row",
                  width: "86%",

                  paddingLeft: 10,
                  height: 44,
                  marginTop: 8,
                }}
              >
                <View
                  style={{
                    width: "86%",

                    borderRadius: 4,
                    alignItems: "center",
                    alignSelf: "center",
                    height: 44,
                  }}
                >
                  <TextInput
                    style={{
                      height: 44,
                      width: "86%",
                      borderRadius: 5,
                      borderColor: Colors.InputText,
                      borderWidth: 1,
                      padding: 10,
                      fontSize: 14,
                      // color: Colors.Black,
                      alignSelf: "center",
                    }}
                    placeholder=""
                    placeholderTextColor={Colors.Black}
                    value={this.state.promo_cods}
                    editable={this.state.editable}
                    onChangeText={(text) => {
                      this.setState({ promo_cods: text }, () => {
                        if (this.state.promo_cods >= 2) {
                          this.setState({ is_btn_disabled: false });
                        }
                      });
                    }}
                    onBlur={() => {
                      // this.validation()
                    }}
                    onPressSubmit={() => {
                      this.setState({ keyboardVerticalOffsetValue: 0 });
                    }}
                  />
                  {this.state.is_error_msg_shown ? (
                    <ErrorContainer error_msg={this.state.error_msg} />
                  ) : null}
                </View>
                <TxtFullScreenBtn
                  title={"ADD"}
                  onPress={() => {
                    //

                    let request = {
                      promocode: this.state.promo_cods,
                    };
                    this.props.promo_code(request);
                    console.log("kapilPromode", request);
                  }}
                  disabled={this.state.is_btn_disabled ? true : false}
                  containerStyle={{
                    backgroundColor: this.state.is_btn_disabled
                      ? Colors.disable
                      : Colors.OrangeRed,
                    width: "20%",
                    height: "100%",
                  }}
                />
              </View>
            </TouchableOpacity>
          ) : null}
          <View
            style={{
              flexDirection: "row",
              width: "85%",
              alignItems: "center",
              justifyContent: "flex-start",
              alignSelf: "center",
              height: 44,
              marginTop: 20,
            }}
          >
            {this.state.remove ? (
              <TouchableOpacity
                onPress={() => {
                  this.props.recurringService({
                    order_id: this.state.order_id,
                  });
                }}
                style={{
                  flexDirection: "row",
                  borderRadius: 5,
                  borderColor: "#FF5C22",
                  width: "100%",
                  backgroundColor: "#FF5C22",
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                  height: 44,
                }}
              >
                <Text
                  style={{
                    color: "#FFF",

                    fontFamily: "Avenir",
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  REMOVE RECURRING SERVICE
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </ScrollView>
        {this.state.isFromCheckout ? (
          <View>
            {this.state.is_member ? (
              <TxtFullScreenBtn
                title={"CHECKOUT"}
                onPress={() => {
                  this.setState({ isVisible: true, memberships: true });
                }}
                disabled={this.state.is_btn_disabled}
                containerStyle={{
                  backgroundColor: this.state.is_btn_disabled
                    ? "#D1D2D4"
                    : "#FF5C22",
                  marginTop: 10,
                  marginBottom: 16,
                }}
              />
            ) : (
              <TxtFullScreenBtn
                title={"CHECKOUT"}
                onPress={() => {
                  this.setState({
                    membership: this.state.membership,
                    memberships: true,
                    is_member: false,
                  });
                  this.props.route.params.paymentmethod == "google_pay"
                    ? this.payWithGooglePay(stripeRequestData)
                    : this.props.route.params.paymentmethod == "apple_pay"
                    ? this.handleApplePayPress()
                    : this.props.route.params.paymentmethod == "paypal"
                    ? this.paypaldata()
                    : this.props.route.params.paymentmethod == "card"
                    ? this.handleCard()
                    : null;
                }}
                disabled={this.state.is_btn_disabled}
                containerStyle={{
                  backgroundColor: this.state.is_btn_disabled
                    ? "#D1D2D4"
                    : "#FF5C22",
                  marginTop: 10,
                  marginBottom: 16,
                }}
              />
            )}
          </View>
        ) : null}
      </SafeAreaContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  order_create: (request_data) => dispatch(order_create(request_data)),
  order_create_clear_data: () => dispatch(order_create_clear_data()),

  promo_code: (request_data) => dispatch(promo_code(request_data)),
  promo_code_clear_data: () => dispatch(promo_code_clear_data()),

  add_applepay: (request_data) => dispatch(add_applepay(request_data)),
  add_applepay_clear_data: () => dispatch(add_applepay_clear_data()),

  recurringService: (request_data) => dispatch(recurringService(request_data)),
  recurringService_clear_data: () => dispatch(recurringService_clear_data()),

  membership: (request_data) => dispatch(membership(request_data)),
  membership_clear_data: () => dispatch(membership_clear_data()),
  cancel_membership: (request_data) =>
    dispatch(cancel_membership(request_data)),
  cancle_membership_clear_data: () => dispatch(cancle_membership_clear_data()),
  user_profile: (request_data) => dispatch(user_profile(request_data)),

  membership_list_clear_data: () => dispatch(membership_list_clear_data()),
  membership_list: (request_data) => dispatch(membership_list(request_data)),
});

const mapStateToProps = (state) => ({
  is_success: state.order_create.is_success,
  is_fetching: state.order_create.is_fetching,
  msg: state.order_create.msg,

  is_success_promo_code: state.promo_code.is_success,
  is_fetching_promo_code: state.promo_code.is_fetching,
  error__promo_code: state.promo_code.error,
  msg_promo_code: state.promo_code.msg,
  promo_code_data: state.promo_code.promo_code_data,

  is_success_add: state.add_applepay.is_success,
  is_fetching_add: state.add_applepay.is_fetching,
  msg: state.add_applepay.msg,
  error: state.add_applepay.error,
  add_applepay_data: state.add_applepay.add_applepay_data,

  saved_vehicle_data: state.saved_vehicle.saved_vehicle_data,

  create_card_data_membership: state.membership.membership_data,
  is_success_membership: state.membership.is_success,
  is_fetching_membership: state.membership.is_fetching,
  msg_membership: state.membership.msg,
  error_membership: state.membership.error,
  create_cancel_data: state.cancel_mambership.cancel_membership_data,
  cancel_is_success: state.cancel_mambership.is_success,
  cancel_is_fetching: state.cancel_mambership.is_fetching,
  cancel_msg: state.cancel_mambership.msg,
  cancel_error: state.cancel_mambership.error,
  user_data: state.user_auth.user_data,

  is_succe_recurringService: state.recurringService.is_success,
  recurringService_data: state.recurringService.recurringService_data,
  is_fet_recurringService: state.recurringService.is_fetching,
  err_recurringService: state.recurringService.error,

  is_success_membership_list: state.membership_list.is_success,
  is_fetching_membership_list: state.membership_list.is_fetching,
  msg_membership_list: state.membership_list.msg,
  user_data_membership_list: state.membership_list.membership_list_data,
  user_data_membership_list_data: state.membership_list.memberships_list_data,
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
