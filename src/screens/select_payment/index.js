import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import BtnWithImage from "../../components/btn_with_image";
import AssetsImages from "../../res";
import SafeAreaContainer from "../../components/safearea_container";
import styles from "./styles";
import PaymentMethodView from "../../components/payment_method_view";
import TxtFullScreenBtn from "../../components/txt_full_screen_btn";
import HeaderTxt from "../../components/header_txt";
import stripe from "tipsi-stripe";
stripe.setOptions({
  publishableKey: "pk_test_AUrE92WoAMzjQEn4fThEEkzR",
  merchantId: "merchant.com.ezfillapp.consumer",
  androidPayMode: "test",
});
import { connect } from "react-redux";
import {
  add_applepay,
  add_applepay_clear_data,
  addPaymentMethod,
  addPaymentMethod_clear_data,
} from "../../redux/actions";
import Loader from "../../components/loader";

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
class SelectPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,
      isContainingTwoBtn: true,
      firstBtnTitle: "REMOVE",
      secondBtnTitle: "NO THANKS",
      saved_cards: [],
      isFromAddVehicle: false,
      isFromMembership: false,

      allowed: false,
      complete: true,
      status: null,
      token: null,
      amexAvailable: false,
      discoverAvailable: false,
      masterCardAvailable: false,
      visaAvailable: false,
      isFromPayment: false,
      requestData: {
        deliveryFee: "1",
      },
    };
  }

  //TODO:- class life cycle
  componentDidMount() {
    // Set the environment before the payment request
    if (Platform.OS === "android") {
      GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);
    }
    this.props.navigation.setOptions({
      headerTitle: "Payment",
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

    console.log(
      "this.props.route.params.isFromAddVehicle  => " +
        JSON.stringify(this.props)
    );

    this.setState({
      isFromMembership:
        (this.props.route.params && this.props.route.params.isFromMembership) ||
        false,
      isFromAddVehicle:
        (this.props.route.params && this.props.route.params.isFromAddVehicle) ||
        false,
      isFromPayment:
        (this.props.route.params && this.props.route.params.isFromAddVehicle) ||
        false,
      orderData:
        (this.props.route.params && this.props.route.params.orderData) || {},
    });

    var saved_cards_data = [
      {
        img: AssetsImages.payment_apple_white,
        color_bg: "#000",
      },
      {
        img: AssetsImages.payment_google,
        color_bg: "#fff",
      },
    ];
    this.setState({ saved_cards: saved_cards_data });
  }

  onPressBtn = () => {
    if (!this.state.isFromAddVehicle) {
      this.setState({
        isPopUpOpened: true,
        title: "Remove Payment Method",
        bodyTxt:
          "You are about to remove this payment method from your service profile.",
      });
    } else {
      this.props.navigation.navigate("Schedule");
    }
  };

  async componentWillMount() {
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

  handleCompleteChange = (complete) => this.setState({ complete });

  handleApplePayPress = async () => {
    try {
      this.setState({
        loading: true,
        status: null,
        token: null,
      });
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
          {
            label: "Vine",
            amount: "60.00",
          },
        ]
      );

      this.setState({ loading: false, token });

      if (this.state.complete) {
        //  await stripe.completeNativePayRequest()
        this.setState({ status: "Apple Pay payment completed" });
        var request = {
          customer_id: "",
          cardToken: this.state.token.tokenId,
          status: "1",
          amount: "60",
          currency: "usd",
        };
        this.props.add_applepay(request);
        if (this.state.isFromMembership) {
          //this.state.orderData.payment_data = item;
          var requestData = {
            customer_id:
              this.props &&
              this.props.user_data &&
              this.props.user_data.data.stripe_id,
            card_id: this.state.token.tokenId,
          };
          //  this.props.make_card_default(requestData);
          // this.handleApplePayPress();
          this.props.navigation.navigate("Membership", {
            requestData: requestData,
            paymentmethod: "card",
            getmembership: true,
          });
        } else {
          var requestData = {
            user_id:
              this.props &&
              this.props.user_data &&
              this.props.user_data.data._id,
            email: responseJson.payer.payer_info.email,
            payment_method_type: "card",
          };

          this.props.addPaymentMethod(requestData);
        }
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

    if (this.state.isFromMembership) {
      //this.state.orderData.payment_data = item;
      var requestData = {
        customer_id:
          this.props &&
          this.props.user_data &&
          this.props.user_data.data.stripe_id,
        card_id: tokendata.id,
      };

      //  this.props.make_card_default(requestData);
      // this.handleApplePayPress();
      this.props.navigation.navigate("Membership", {
        requestData: requestData,
        paymentmethod: "google_pay",
        getmembership: true,
      });
    } else {
      var requestData = {
        user_id:
          this.props && this.props.user_data && this.props.user_data.data._id,
        email: responseJson.payer.payer_info.email,
        payment_method_type: "google_pay",
      };

      this.props.addPaymentMethod(requestData);
    }
  };

  paypaldata() {
    this.state.requestData.deliveryFee = this.props.route.params.requestData.deliveryFee;
    this.props.navigation.navigate("Paypal", {
      orderData: this.props.route.params.orderData,
      is_selected_home: this.props.route.params.is_selected_home,
      carddata: "",
      isFromAddVehicle: this.state.isFromAddVehicle,
      isFromMembership: this.state.isFromMembership,
      requestData: this.state.requestData,
    });
  }
  handleError = (error) =>
    console.log("Error", `${error.code}\n${error.message}`);

  componentDidUpdate(prevProps) {
    console.log(
      "prevProps => " +
        JSON.stringify(prevProps) +
        "   ======  " +
        this.props.msg
    );

    if (
      this.props.is_fetching_addPaymentMethod !==
      prevProps.is_fetching_addPaymentMethod
    ) {
      if (this.props.is_fetching_addPaymentMethod) {
        if (!this.state.isApiCalled) {
          this.setState({ loading: true });
        }
      } else if (!this.props.is_fetching) {
        this.setState({ loading: false, isApiCalled: true });
      }
    }

    if (
      this.props.is_success_addPaymentMethod !==
      prevProps.is_success_addPaymentMethod
    ) {
      console.log("prevProps => " + prevProps.is_success_addPaymentMethod);
      console.log("this.props => " + this.props.is_success_addPaymentMethod);

      if (this.props.is_success_addPaymentMethod == true) {
        console.log("success => ");
        if (this.state.isFromAddVehicle) {
        } else if (this.state.isFromMembership) {
        } else {
          this.props.navigation.navigate("Payment", {
            paymentmethod: "paypal",
          });
        }
      }
    }
  }

  render() {
    return (
      <SafeAreaContainer
        title={this.state.title}
        bodyTxt={this.state.bodyTxt}
        isModalOpened={this.state.isPopUpOpened}
        onDismiss={() => {
          this.setState({ isPopUpOpened: false });
        }}
        isContainingTwoBtn={this.state.isContainingTwoBtn}
        firstBtnTitle={this.state.firstBtnTitle}
        onPressFirstBtn={() => {}}
        secondBtnTitle={this.state.secondBtnTitle}
        onPressSecondBtn={() => {
          this.setState({ isPopUpOpened: false });
        }}
      >
        <View style={styles.container}>
          <HeaderTxt
            title={"Select Payment Methods"}
            marginTop={40}
            marginBottom={10}
          />
          <View>
            {Platform.OS === "ios" ? (
              <TxtFullScreenBtn
                onPress={() => {
                  if (this.state.isFromAddVehicle) {
                    this.props.navigation.navigate("Schedule", {
                      orderData: this.props.route.params.orderData,
                      is_selected_home: this.props.route.params
                        .is_selected_home,
                      paymentmethod: "apple_pay",
                      carddata: "",
                      line1: this.props.route.params.line1,
                      line2: this.props.route.params.line2,
                      isFromPayment: this.state.isFromPayment,
                      isFromAddVehicle: this.state.isFromAddVehicle,
                      isFromMembership: this.state.isFromMembership,
                      city: this.props.route.params.city,
                      zipcode: this.props.route.params.zipcode,
                      state: this.props.route.params.state,
                      latitude: this.props.route.params.latitude,
                      longitude: this.props.route.params.longitude,
                      type: this.props.route.params.type,
                      delivery_fee: this.props.route.params.delivery_fee,
                      fuelTypePrice: this.props.route.params.fuelTypePrice,
                    });
                  } else if (this.state.isFromMembership) {
                    //  this.handleApplePayPress();
                  } else {
                    //  this.handleApplePayPress();
                  }
                }}
                containerStyle={{
                  backgroundColor: "#000",
                  marginTop: 5,
                  marginBottom: 5,
                  shadowRadius: 0,
                  borderWidth: 1,
                  borderColor: "#bbb",
                }}
                fontColor={"#FFF"}
                btnImg={AssetsImages.payment_apple_white}
                // btnImgStyle
              />
            ) : null}
            {Platform.OS === "android" ? (
              <TxtFullScreenBtn
                onPress={() => {
                  if (this.state.isFromAddVehicle) {
                    this.props.navigation.navigate("Schedule", {
                      orderData: this.props.route.params.orderData,
                      isFromAddVehicle: this.state.isFromAddVehicle,
                      isFromMembership: this.state.isFromMembership,
                      isFromPayment: this.state.isFromPayment,
                      isFromPayment: this.state.isFromPayment,
                      is_selected_home: this.props.route.params
                        .is_selected_home,
                      paymentmethod: "google_pay",
                      carddata: "",
                      line1: this.props.route.params.line1,
                      line2: this.props.route.params.line2,
                      city: this.props.route.params.city,
                      zipcode: this.props.route.params.zipcode,
                      state: this.props.route.params.state,
                      latitude: this.props.route.params.latitude,
                      longitude: this.props.route.params.longitude,
                      type: this.props.route.params.type,
                      delivery_fee: this.props.route.params.delivery_fee,
                      fuelTypePrice: this.props.route.params.fuelTypePrice,
                    });
                  } else if (this.state.isFromMembership) {
                    this.payWithGooglePay(stripeRequestData);
                  } else {
                    this.payWithGooglePay(stripeRequestData);
                  }
                }}
                containerStyle={{
                  backgroundColor: "#fff",
                  marginTop: 5,
                  marginBottom: 5,
                  shadowRadius: 0,
                  borderWidth: 1,
                  borderColor: "#bbb",
                }}
                fontColor={"#FFF"}
                btnImg={AssetsImages.payment_google}
              />
            ) : null}

            <TxtFullScreenBtn
              onPress={() => {
                if (this.state.isFromAddVehicle) {
                  this.props.navigation.navigate("Schedule", {
                    orderData: this.props.route.params.orderData,
                    isFromAddVehicle: this.state.isFromAddVehicle,

                    isFromMembership: this.state.isFromMembership,
                    is_selected_home: this.props.route.params.is_selected_home,
                    paymentmethod: "paypal",
                    carddata: "",
                    isFromPayment: this.state.isFromPayment,
                    line1: this.props.route.params.line1,
                    line2: this.props.route.params.line2,
                    city: this.props.route.params.city,
                    zipcode: this.props.route.params.zipcode,
                    state: this.props.route.params.state,
                    latitude: this.props.route.params.latitude,
                    longitude: this.props.route.params.longitude,
                    type: this.props.route.params.type,
                    delivery_fee: this.props.route.params.delivery_fee,
                    fuelTypePrice: this.props.route.params.fuelTypePrice,
                  });
                } else if (this.state.isFromMembership) {
                  this.paypaldata();
                } else {
                  this.setState({ isFromPayment: true });
                  this.paypaldata();
                }
              }}
              containerStyle={{
                backgroundColor: "#CDE8FD",
                marginTop: 5,
                marginBottom: 5,
                shadowRadius: 0,
                borderWidth: 1,
                borderColor: "#bbb",
              }}
              fontColor={"#FFF"}
              btnImg={AssetsImages.payment_paypal}
              // btnImgStyle
            />
            <TxtFullScreenBtn
              title={"ADD CREDIT CARD"}
              onPress={() => {
                this.props.navigation.navigate("AddPayment", {
                  is_selected_home: true,
                });
              }}
              // disabled={this.state.is_btn_disabled || !this.state.is_error_msg_shown ? true : false}
              containerStyle={{
                backgroundColor: "#FF6600",
                marginTop: 5,
                marginBottom: 5,
                shadowRadius: 0,
              }}
              fontColor={"#FFF"}
            />
          </View>
        </View>
      </SafeAreaContainer>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  add_applepay: (request_data) => dispatch(add_applepay(request_data)),
  add_applepay_clear_data: () => dispatch(add_applepay_clear_data()),

  addPaymentMethod: (request_data) => dispatch(addPaymentMethod(request_data)),
  addPaymentMethod_clear_data: () => dispatch(addPaymentMethod_clear_data()),
});

const mapStateToProps = (state) => ({
  // add_applepay_data: state.add_applepay.add_applepay_data,

  // is_success_add: state.add_applepay.is_success,
  // is_fetching_add: state.add_applepay.is_fetching,
  // msg: state.add_applepay.msg,
  // error: state.add_applepay.error,
  add_applepay_data: state.add_applepay.add_applepay_data,
  user_data: state.user_auth.user_data,

  is_success_addPaymentMethod: state.addPaymentMethod.is_success,
  is_fetching_addPaymentMethod: state.addPaymentMethod.is_fetching,
  msg_addPaymentMethod: state.addPaymentMethod.msg,
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectPayment);
