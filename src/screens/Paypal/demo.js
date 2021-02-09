import React, { Component } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import Mixpanel from "react-native-mixpanel";
import { PROJECT_TOKEN, API_secret } from "../../api/api_config";
import { WebView } from "react-native-webview";
const qs = require("qs");
import Loader from "../../components/loader";
import { paypalurl, options } from "../../api";
import { connect } from "react-redux";
import {
  order_create,
  order_create_clear_data,
  membership_clear_data,
  membership,
  addPaymentMethod,
  addPaymentMethod_clear_data,
} from "../../redux/actions";
import Spinner from "react-native-loading-spinner-overlay";
var requestData = "";
class Paypal extends Component {
  state = {
    accessToken: null,
    approvalUrl: null,
    requestData: "",
    paymentId: null,
    loading: true,
    visible: true,
    isApiCalled: false,
    isFromAddVehicle: false,
    isFromMembership: false,
    memberships: false,
  };
  componentDidMount() {
    this.setState({
      isFromMembership:
        (this.props.route.params && this.props.route.params.isFromMembership) ||
        false,
      isFromAddVehicle:
        (this.props.route.params && this.props.route.params.isFromAddVehicle) ||
        false,
      memberships:
        (this.props.route.params && this.props.route.params.memberships) ||
        false,
    });

    let currency = this.props.route.params.requestData.deliveryFee;

    const dataDetail = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      transactions: [
        {
          amount: {
            total: currency,
            currency: "THB",
            details: {
              subtotal: currency,
              tax: "0",
              shipping: "0",
              handling_fee: "0",
              shipping_discount: "0",
              insurance: "0",
            },
          },
        },
      ],
      redirect_urls: {
        return_url: "https://example.com?pay=pay",
        cancel_url: "https://example.com?pay=pay",
      },
    };

    fetch(paypalurl.tokengenerate, options)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          accessToken: responseJson.access_token,
          loading: false,
        });
        console.log("PayPal", responseJson);
        fetch(paypalurl.paymentgetpage, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.state.accessToken}`,
          },
          body: JSON.stringify(dataDetail),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);

            const { id, links } = responseJson;
            const approvalUrl = links.find(
              (data) => data.rel == "approval_url"
            );
            console.log("PayPalsss=======>", responseJson);
            this.setState({
              paymentId: id,
              approvalUrl: approvalUrl.href,
              loading: false,
            });
          })
          .catch((err) => {
            console.log({ ...err });
          });
      })
      .catch((err) => {
        console.log({ ...err });
      });
  }

  _onNavigationStateChange = (webViewState) => {
    if (webViewState.url.includes("https://example.com")) {
      this.setState({
        approvalUrl: null,
      });
      let params = qs.parse(webViewState.url);
      console.log(params);
      console.log();

      const PayerID = params.PayerID;
      const paymentId = params.paymentId;

      fetch(
        `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.state.accessToken}`,
          },
          body: JSON.stringify({ payer_id: PayerID }),
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          requestData = {
            customer_id: this.props.user_data.data.stripe_id,
            card_id: responseJson.id,
          };

          console.log(
            "paypalresponseJson",
            responseJson.payer.payer_info.email
          );
          this.setState({ requestData: requestData });
          this.state.memberships
            ? this.props.membership({
                user_id:
                  this.props &&
                  this.props.user_data &&
                  this.props.user_data.data._id,
                cardToken: responseJson.id,
                paymentMethod: "paypal",
              })
            : null;
          if (this.state.isFromAddVehicle) {
            let request = {
              user_id: this.props.route.params.requestData.user_id,
              vehicle_id: this.props.route.params.requestData.vehicle_id,
              deliveryFee: this.props.route.params.requestData.deliveryFee,
              membership: this.props.route.params.requestData.membership,
              Payment: this.props.route.params.requestData.Payment,
              latitude: this.props.route.params.requestData.latitude,
              longitude: this.props.route.params.requestData.longitude,
              addressName: {
                line1: this.props.route.params.line1,
                line2: this.props.route.params.line2,
                city: this.props.route.params.city,
                zipcode: this.props.route.params.zipcode,
                state: this.props.route.params.state,
                type: this.props.route.params.type,
              },
              recurringService: this.props.route.params.requestData
                .recurringService,
              schedule_date: this.props.route.params.requestData.schedule_date,
              schedule_time: this.props.route.params.requestData.schedule_time,
              inGarage: this.props.route.params.requestData.inGarage,
              floor: this.props.route.params.requestData.floor,
              additionalNotes: this.props.route.params.requestData
                .additionalNotes,
              paymentMethod: "paypal",
              txn_id: responseJson.id,
              cardinfo: {
                last4: "",
                exp_month: "",
                exp_year: "",
                name: "",
              },
              card_id: "",
            };
            console.log(
              JSON.stringify("paypaldata", this.props.route.params.orderData)
            );
            this.props.order_create(request);
            var requestDatas = {
              user_id:
                this.props &&
                this.props.user_data &&
                this.props.user_data.data._id,
              card_id: responseJson.payer.payer_info.email,
              payment_method_type: "paypal",
            };

            this.props.addPaymentMethod(requestDatas);
          } else if (this.state.isFromMembership) {
            var requestData = {
              customer_id: this.props.user_data.data.stripe_id,
              card_id: responseJson.id,
            };
            this.setState({ requestData: requestData });
            //  this.props.make_card_default(requestData);
            // this.handleApplePayPress();
            // this.state.requestData.card_id = responseJson.id;
            this.props.navigation.navigate("Membership", {
              requestData: this.state.requestData,
              paymentmethod: "paypal",
              getmembership: true,
            });
            var requestDatas = {
              user_id:
                this.props &&
                this.props.user_data &&
                this.props.user_data.data._id,
              card_id: responseJson.payer.payer_info.email,
              payment_method_type: "paypal",
            };

            this.props.addPaymentMethod(requestDatas);
          } else {
            var requestData = {
              user_id:
                this.props &&
                this.props.user_data &&
                this.props.user_data.data._id,
              card_id: responseJson.payer.payer_info.email,
              payment_method_type: "paypal",
            };

            this.props.addPaymentMethod(requestData);
          }
        })
        .catch((err) => {
          console.log({ ...err });
        });
    }
  };
  componentDidUpdate(prevProps) {
    console.log(
      "prevProps => " +
        JSON.stringify(prevProps) +
        "   ======  " +
        this.props.msg
    );

    if (this.props.is_fetching !== prevProps.is_fetching) {
      if (this.props.is_fetching) {
        if (!this.state.isApiCalled) {
          this.setState({ loading: true });
        }
      } else if (!this.props.is_fetching) {
        this.setState({ loading: false, isApiCalled: true });
      }
    }

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
          // this.props.navigation.navigate("Membership", {
          //   requestData: this.state.requestData,
          //   paymentmethod: "card",
          //   getmembership: true,
          // });
        } else {
          this.props.navigation.navigate("Payment", {
            paymentmethod: "paypal",
          });
        }
      }
    }
    ////////////////////////////////////
    if (this.props.is_fetching !== prevProps.is_fetching) {
      if (this.props.is_fetching) {
        if (!this.state.isApiCalled) {
          this.setState({ loading: true });
        }
      } else if (!this.props.is_fetching) {
        this.setState({ loading: false, isApiCalled: true });
      }
    }

    if (this.props.is_success !== prevProps.is_success) {
      console.log("prevProps => " + prevProps.is_success);
      console.log("this.props => " + this.props.is_success);

      if (this.props.is_success == true) {
        console.log("success => ");
        if (this.state.isFromAddVehicle) {
        } else if (this.state.isFromMembership) {
          // this.props.navigation.navigate("Membership", {
          //   requestData: requestData,
          //   paymentmethod: "card",
          //   getmembership: true,
          // });
        }
        // Alert.alert(
        //   "Order placed.",
        //   "Your Order placed successfully.",
        //   [
        //     {
        //       text: "Cancel",
        //       onPress: () => console.log("Cancel Pressed"),
        //       style: "cancel",
        //     },
        //     {
        //       text: "OK",
        //       onPress: () =>
        //         this.props.navigation.navigate("Dashboard", {
        //           oder_success: true,
        //           orderData: this.props.route.params.orderData,
        //           isFromCheckout: true,
        //         }),
        //     },
        //   ],
        //   { cancelable: false }
        // );

        // if (this.state.isFromMembership) {
        //   //this.state.orderData.payment_data = item;
        //   // var requestData = {
        //   //   customer_id: this.props.user_data.data.stripe_id,
        //   //   card_id: this.props.add_applepay_data.cards.id,
        //   // };
        //   //  this.props.make_card_default(requestData);
        //   // this.handleApplePayPress();
        //   this.props.navigation.navigate("Membership", {
        //     requestData: requestData,
        //     paymentmethod: "card",
        //     getmembership: true,
        //   });
        // }
        this.props.order_create_clear_data();
      }
    }
  }
  showSpinner() {
    console.log("Show Spinner");
    this.setState({ visible: true });
  }

  hideSpinner() {
    console.log("Hide Spinner");
    this.setState({ visible: false });
  }

  render() {
    const { approvalUrl } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Spinner
          visible={this.state.visible}
          textContent={"Loading..."}
          color="#FF5C22"
          textStyle={{ color: "#FF5C22" }}
        />
        {approvalUrl ? (
          <WebView
            style={{ height: 420, width: 300 }}
            source={{ uri: approvalUrl }}
            onNavigationStateChange={this._onNavigationStateChange}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            style={{ marginTop: 20 }}
            onLoadStart={() => this.showSpinner()}
            onLoadEnd={() => this.hideSpinner()}
          />
        ) : (
          <ActivityIndicator />
        )}
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  order_create: (request_data) => dispatch(order_create(request_data)),
  order_create_clear_data: () => dispatch(order_create_clear_data()),
  addPaymentMethod: (request_data) => dispatch(addPaymentMethod(request_data)),
  addPaymentMethod_clear_data: () => dispatch(addPaymentMethod_clear_data()),

  membership: (request_data) => dispatch(membership(request_data)),
  membership_clear_data: () => dispatch(membership_clear_data()),
});

const mapStateToProps = (state) => ({
  is_success: state.order_create.is_success,
  is_fetching: state.order_create.is_fetching,
  msg: state.order_create.msg,
  user_data: state.user_auth.user_data,

  is_success_addPaymentMethod: state.addPaymentMethod.is_success,
  is_fetching_addPaymentMethod: state.addPaymentMethod.is_fetching,
  msg_addPaymentMethod: state.addPaymentMethod.msg,
});

export default connect(mapStateToProps, mapDispatchToProps)(Paypal);
