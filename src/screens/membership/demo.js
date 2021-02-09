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
import TxtFullScreenBtn from "../../components/txt_full_screen_btn";
import { connect } from "react-redux";
import color from "../../constants/Colors";
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
import Loader from "../../components/loader";
import {
  membership_clear_data,
  membership,
  cancel_membership,
  user_profile,
  cancle_membership_clear_data,
  membership_list,
  membership_list_clear_data,
} from "../../redux/actions";
class Membership extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,

      isContainingTwoBtn: true,
      firstBtnTitle: "CANCEL",
      secondBtnTitle: "NO THANKS",
      loading: false,
      isApiCalled: false,
      is_member: true,
      renew_date: "",
      membership_title: "Become a EzFill Member",
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
    console.log(
      "khbiuhfjkndguiiudhjk",
      JSON.stringify(
        this.props &&
          this.props.user_data &&
          this.props.user_data.data &&
          this.props.user_data.data.membershipStatus
      )
    );
    if (
      this.props &&
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
    this.props.navigation.setOptions({
      headerTitle: "Membership",
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
    console.log("ON focus....");

    let request = {
      user_id:
        this.props &&
        this.props.user_data &&
        this.props.user_data.data &&
        this.props.user_data.data._id,
    };

    this.props.membership_list(request);
    if (
      this.props &&
      this.props.user_data &&
      this.props.user_data.data &&
      this.props.user_data.data.membershipStatus == 1
    ) {
      this.setState({
        is_member: false,
        renew_date:
          this.props &&
          this.props.user_data &&
          this.props.user_data.data &&
          this.props.user_data.data.membershipEnds,
        membership_title: "You're a EzFill Member",
      });
    } else {
      this.setState({ is_member: true });
    }
  };
  componentWillUnmount() {
    this._unsubscribe();
  }
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
          "datatatatatata==========>kapil",
          this.props &&
            this.props.user_data_membership_list_data &&
            this.props.user_data_membership_list_data
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
                this.props &&
                  this.props.user_data_membership_list &&
                  this.props.user_data_membership_list
              );
              this.props.membership_list_clear_data();
            }
          }
        });
      }
    }

    //////////////////////////////////////////////////////

    if (this.props.is_fetching !== prevProps.is_fetching) {
      if (this.props.is_fetching) {
        if (!this.state.isApiCalled) {
          this.setState({ loading: true });
        }
      } else if (!this.props.is_fetching) {
        this.setState({ loading: false, isApiCalled: true });
      }
    }
    if (this.props.cancel_is_success !== prevProps.cancel_is_success) {
      if (this.props.cancel_is_success) {
        this.setState({ isSavedVahicleApiSuccess: true });
        setTimeout(() => {
          let request_user_profile = {
            user_id:
              this.props &&
              this.props.user_data &&
              this.props.user_data.data &&
              this.props.user_data.data._id,
          };
          this.props.user_profile(request_user_profile);
        }, 500);
        this.props.membership_clear_data();
        if (
          this.props &&
          this.props.user_data &&
          this.props.user_data.data &&
          this.props.user_data.data.membershipStatus == 1
        ) {
          this.setState({
            is_member: false,
            renew_date:
              this.props &&
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
    if (this.props.is_fetching !== prevProps.is_fetching) {
      if (this.props.is_fetching) {
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
      console.log(
        "is_succe_delete",
        this.props && this.props.user_data && this.props.cancel_is_success
      );
      if (this.props.cancel_is_success == true) {
        // console.log("DATA====>", this.props.delete_Address_clear_data);
        // let request = { user_id: this.props.user_data.data._id };
        // this.props.saved_location(request);

        setTimeout(() => {
          let request_user_profile = {
            user_id:
              this.props &&
              this.props.user_data &&
              this.props.user_data.data._id,
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

    if (this.props.cancel_is_fetching !== prevProps.cancel_is_fetching) {
      if (this.props.cancel_is_fetching) {
        this.setState({ loading: true });
      } else if (!this.props.cancel_is_fetching) {
        this.setState({ loading: false }, () => {
          if (this.props.cancel_is_success !== prevProps.cancel_is_success) {
            if (this.props.cancel_is_success) {
              setTimeout(() => {
                let request_user_profile = {
                  user_id:
                    this.props &&
                    this.props.user_data &&
                    this.props.user_data.data._id,
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
        this.callAPI();
      } else {
      }
    } else {
    }
    if (this.props.cancel_is_success !== prevProps.cancel_is_success) {
      console.log("cancel_is_success", this.props.cancel_is_success);
      if (this.props.cancel_is_success == true) {
        setTimeout(() => {
          let request_user_profile = {
            user_id:
              this.props &&
              this.props.user_data &&
              this.props.user_data.data._id,
          };
          this.props.user_profile(request_user_profile);
        }, 500);
        this.props.membership_clear_data();
        this.props.cancle_membership_clear_data();
        this.setState({ is_member: true });
      }
    }

    if (this.props.is_fetching !== prevProps.is_fetching) {
      if (this.props.is_fetching) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching) {
        this.setState({ loading: false }, () => {
          if (this.props.is_success !== prevProps.is_success) {
            if (this.props.is_success) {
              setTimeout(() => {
                let request_user_profile = {
                  user_id:
                    this.props &&
                    this.props.user_data &&
                    this.props.user_data.data._id,
                };
                this.props.user_profile(request_user_profile);
              }, 500);
              this.props.membership_clear_data();
              this.props.cancle_membership_clear_data();
              this.setState({
                is_member: false,
                renew_date:
                  this.props.user_data &&
                  this.props.user_data.data &&
                  this.props.user_data.data.membershipEnds,
                membership_title: "You're a EzFill Member",
              });
            }
          }
        });
      }
    }
  }

  callAPI() {
    this.props.membership({
      user_id:
        this.props && this.props.user_data && this.props.user_data.data._id,
      cardToken: this.props.route.params.requestData.card_id.card_id,
      paymentMethod: this.props.route.params.paymentmethod,
    });
  }
  cancelmambership() {
    this.props.cancel_membership({
      user_id:
        this.props && this.props.user_data && this.props.user_data.data._id,
    });
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
        onPressFirstBtn={() => {
          this.cancelmambership();
        }}
        secondBtnTitle={this.state.secondBtnTitle}
        onPressSecondBtn={() => {
          this.setState({ isPopUpOpened: false });
        }}
      >
        <Loader loading={this.state.loading} />
        <View style={styles.container}>
          {!this.state.is_member ? (
            <View
              style={{
                width: "100%",
                height: 66,
                backgroundColor: "#FFE0CC",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: "#80859F",
                  width: "80%",
                  marginLeft: 25,
                  fontWeight: "bold",
                  fontFamily: "Avenir",
                }}
              >
                Your membership will auto renew
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#000",
                  width: "80%",
                  marginLeft: 25,
                  marginTop: 2,
                  fontWeight: "bold",
                  fontFamily: "Avenir",
                }}
              >
                {this.props &&
                  this.props.user_data_membership_list &&
                  this.props.user_data_membership_list.membershipEndDate}
              </Text>
            </View>
          ) : null}

          <Image
            source={AssetsImages.img_membership}
            style={{
              resizeMode: "contain",
              width: "85%",
              marginVertical: 25,
              alignSelf: "center",
            }}
          />
          <Text
            style={{
              fontSize: 20,
              color: "#000",
              width: "80%",
              marginLeft: 24,
              marginTop: 2,
              fontWeight: "bold",
              fontFamily: "Avenir",
            }}
          >
            {this.state.membership_title}
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: "#FF7000",
              width: "80%",
              marginLeft: 25,
              marginTop: 2,
              fontWeight: "bold",
              fontFamily: "Avenir",
            }}
          >
            for only $
            {this.props &&
              this.props.user_data_membership_list_data &&
              this.props.user_data_membership_list_data.price}{" "}
            a month
          </Text>

          <FlatList
            style={{ width: "100%", marginTop: 15 }}
            data={
              this.props &&
              this.props.user_data_membership_list_data &&
              this.props.user_data_membership_list_data.plans
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <View
                  style={{ flexDirection: "row", width: "100%", height: 30 }}
                >
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: "contain",
                      marginLeft: 24,
                      tintColor:
                        item.isAdded == true ? color.OrangeRed : color.gray,
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

          {!this.state.is_member ? (
            <TouchableOpacity
              style={{
                height: 35,
                width: "60%",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
              onPress={() => {
                this.setState({
                  isPopUpOpened: true,
                  title: "Cancel Membership?",
                  bodyTxt:
                    "Canceling your membership will remove \n your free deliveries plus all your other pecks.",
                });
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontSize: 14,
                  fontWeight: "bold",
                  fontFamily: "Avenir",
                }}
              >
                Cancel My Membership
              </Text>
            </TouchableOpacity>
          ) : (
            <TxtFullScreenBtn
              title={"SUBSCRIBE TO MEMBERSHIP"}
              onPress={() => {
                this.props.navigation.navigate("Payment", {
                  isFromMembership: true,
                  isFromAddVehicle: false,
                  orderData: "",
                  is_selected_home: "",
                });
              }}
              // disabled={this.state.is_btn_disabled || !this.state.is_error_msg_shown ? true : false}
              containerStyle={{
                backgroundColor: "#FF5C22",
                marginTop: 15,
                marginBottom: 20,
              }}
            />
          )}
        </View>
      </SafeAreaContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
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
  create_card_data: state.membership.membership_data,
  is_success: state.membership.is_success,
  is_fetching: state.membership.is_fetching,
  msg: state.membership.msg,
  error: state.membership.error,
  create_cancel_data: state.cancel_mambership.cancel_membership_data,
  cancel_is_success: state.cancel_mambership.is_success,
  cancel_is_fetching: state.cancel_mambership.is_fetching,
  cancel_msg: state.cancel_mambership.msg,
  cancel_error: state.cancel_mambership.error,
  user_data: state.user_auth.user_data,

  is_success_membership_list: state.membership_list.is_success,
  is_fetching_membership_list: state.membership_list.is_fetching,
  msg_membership_list: state.membership_list.msg,
  user_data_membership_list: state.membership_list.membership_list_data,
  user_data_membership_list_data: state.membership_list.memberships_list_data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Membership);
