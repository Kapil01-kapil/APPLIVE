import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Animated,
  Keyboard,
} from "react-native";
import BtnWithImage from "../../components/btn_with_image";
import AssetsImages from "../../res";
import SafeAreaContainer from "../../components/safearea_container";
import styles from "./styles";
import HeaderTxt from "../../components/header_txt";
import LocationView from "../../components/location_view";
import { connect } from "react-redux";
import {
  order_history,
  order_history_clear_data,
  recurringService,
  recurringService_clear_data,
} from "../../redux/actions";
import Loader from "../../components/loader";
import moment from "moment";
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
class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,
      loading: false,

      order_list: [],
      isApiCalled: false,

      onPressFirstBtn: "",
      isContainingTwoBtn: true,
      firstBtnTitle: "Yes",
      secondBtnTitle: "No",

      isApiCalled: false,
    };
  }

  //TODO:- class life cycle
  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: "Order History",
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
          img={AssetsImages.icon_sidemenu}
          btnImgStyle={{ height: 22, width: 22 }}
          onPress={() => {
            this.props.navigation.openDrawer();
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

    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.onFocus();
    });
  }

  onFocus = () => {
    let request = {
      user_id:
        this.props && this.props.user_data && this.props.user_data.data._id,
    };
    this.props.order_history(request);
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

  componentDidUpdate(prevProps) {
    if (this.props.is_ !== prevProps._delete) {
      if (this.props._delete) {
        if (!this.state.isApiCalled) {
          this.setState({ loading: true });
        }
      } else if (!this.props._delete) {
        this.setState({ loading: false, isApiCalled: true });
      }
    }

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
        console.log(
          "DATA====>",
          this.props &&
            this.props.recurringService_data &&
            this.props.recurringService_data
        );
        let request = {
          user_id:
            this.props && this.props.user_data && this.props.user_data.data._id,
        };
        this.props.order_history(request);

        this.props.order_history_clear_data();
        this.props.recurringService_clear_data();
      }
    }

    if (this.props.is_success !== prevProps.is_success) {
      if (this.props.is_success == true) {
        console.log(
          "success => " + JSON.stringify(this.props.order_history_data)
        );
        this.setState({
          order_list:
            this.props &&
            this.props.order_history_data &&
            this.props.order_history_data,
        });
        this.props.order_history_clear_data();
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
            if (this.props.is_succe_recurringService) {
              console.log(
                "DATA====>",
                this.props &&
                  this.props.recurringService_data &&
                  this.props.recurringService_data
              );
              let request = {
                user_id:
                  this.props &&
                  this.props.user_data &&
                  this.props.user_data.data._id,
              };
              this.props.order_history(request);

              this.props.order_history_clear_data();
              this.props.recurringService_clear_data();
            }
          }
        });
      }
    }
  }

  orderHeader = () => {
    return (
      <View style={{ width: "100%" }}>
        <HeaderTxt title={"All Orders"} marginTop={30} />
      </View>
    );
  };
  _listEmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "#80859F",
            width: "90%",
            fontWeight: "bold",
            fontFamily: "Avenir",
            textAlign: "center",
          }}
        >
          You have not made any order yet
        </Text>
      </View>
    );
  };
  render() {
    return (
      <SafeAreaContainer
        title={this.state.title}
        bodyTxt={this.state.bodyTxt}
        isModalOpened={this.state.isPopUpOpened}
        onDismiss={() => {
          // this.deleteHandler(this.props.user_data.data.user_token, item._id);
          this.setState({ isPopUpOpened: false });
        }}
        isContainingTwoBtn={this.state.isContainingTwoBtn}
        firstBtnTitle={this.state.firstBtnTitle}
        onPressFirstBtn={() => {
          this.setState({ isPopUpOpened: false });
          let request = {
            user_id:
              this.props &&
              this.props.user_data &&
              this.props.user_data.data._id,
          };
          this.props.order_history(request);

          console.log(
            "id==>",
            this.state.onPressFirstBtn,
            this.props &&
              this.props.user_data &&
              this.props.user_data.data.user_token
          );
          this.props.recurringService({
            //  user_id: this.props.user_data.data._id,
            // user_token: this.props.user_data.data.user_token,
            order_id: this.state.onPressFirstBtn,
          });
          // address_components.push(key, item.types[0])
        }}
        secondBtnTitle={this.state.secondBtnTitle}
        onPressSecondBtn={() => {
          this.setState({ isPopUpOpened: false });
        }}
      >
        <Loader loading={this.state.loading} />

        <View style={styles.container}>
          {this.state.order_list.length != 0 ? (
            <FlatList
              style={{ width: "100%", marginTop: 5 }}
              data={this.state.order_list}
              ListEmptyComponent={this._listEmptyComponent()}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={this.orderHeader()}
              renderItem={({ item }) => {
                return (
                  <LocationView
                    header={
                      "Service Scheduled " +
                      moment(item.startTime, "YYYY-MM-DD").format("MMM Do") +
                      " at " +
                      moment(item.endTime, "hh:mm").format("hh:mm a")
                    }
                    body={
                      item.addresses[0].line1 ? item.addresses[0].line1 : ""
                    }
                    // body={
                    //   item.addresses[0].line1 ? item.addresses[0].line1 : ""
                    // }
                    // body={item.addresses[0].line1}
                    on_press_btn={() => {
                      console.log("addressNamekapul", item.addresses[0].line1);
                      if (item.recurringService == "no") {
                        this.props.navigation.navigate("OrderDetails", {
                          isFromCheckout: false,
                          orderData: item,
                          oderHistory: true,
                          remove: false,
                          fuelTypePrice: "2.60",
                          order_id: item._id,
                        });
                      } else {
                        this.props.navigation.navigate("OrderDetails", {
                          isFromCheckout: false,
                          orderData: item,
                          oderHistory: true,
                          remove: true,
                          fuelTypePrice: "2.60",
                          order_id: item._id,
                        });
                      }
                    }}
                    btn_img={AssetsImages.icon_forward_arrow}
                  />
                );
              }}
            />
          ) : null}

          {this.state.order_list.length == 0 && !this.state.loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#80859F",
                  width: "90%",
                  fontWeight: "bold",
                  fontFamily: "Avenir",
                  textAlign: "center",
                }}
              >
                You have not made any order yet
              </Text>
            </View>
          ) : null}
        </View>
      </SafeAreaContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  recurringService: (request_data) => dispatch(recurringService(request_data)),
  recurringService_clear_data: () => dispatch(recurringService_clear_data()),

  order_history: (request_data) => dispatch(order_history(request_data)),
  order_history_clear_data: () => dispatch(order_history_clear_data()),
});

const mapStateToProps = (state) => ({
  is_success: state.order_history.is_success,
  is_fetching: state.order_history.is_fetching,
  msg: state.order_history.msg,

  order_history_data: state.order_history.order_history_data,
  user_data: state.user_auth.user_data,

  is_succe_recurringService: state.recurringService.is_success,
  recurringService_data: state.recurringService.recurringService_data,
  is_fet_recurringService: state.recurringService.is_fetching,
  err_recurringService: state.recurringService.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
