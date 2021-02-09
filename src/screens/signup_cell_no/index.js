import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  Platform,
} from "react-native";
import styles from "./styles";
import AssetsImages from "../../res";
import SafeAreaContainer from "../../components/safearea_container";
import TxtFullScreenBtn from "../../components/txt_full_screen_btn";
import HeaderTxt from "../../components/header_txt";
import Loader from "../../components/loader";
import Mixpanel from "react-native-mixpanel";
import Colors from "../../constants/Colors";
import ErrorContainer from "../../components/error_container";
import { PROJECT_TOKEN, API_secret } from "../../api/api_config";
import { connect } from "react-redux";
import { createOtp } from "../../redux/actions";
import firebase from "react-native-firebase";
import PhoneInput from "../../components/PhoneInput";
//TODO:- SignupCellNo class
class SignupCellNo extends Component {
  //TODO:- constructor
  constructor(props) {
    super(props);
    this.phoneInput = React.createRef < PhoneInput > null;
    this.state = {
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,
      phoneInput: null,
      formattedValue: "",
      name: "",
      email: "",
      password: "",
      codes: "",
      error_msg: "Please enter valid cell number .",
      is_error_msg_shown: false,
      countryCode: "",
      cell_no: "",
      keyboardVerticalOffsetValue: 0,
      loading: false,
      is_btn_disabled: true,
      notification_token: "",
    };
  }
  validation = () => {
    //Email Validation

    if (this.state.cell_no.length >= 11 || this.state.cell_no.length <= 9) {
      this.setState({ is_error_msg_shown: true });
      return false;
    } else {
      this.setState({ is_error_msg_shown: false });
      return true;
    }
  };

  UNSAFE_componentWillMount() {
    this.checkPermission();
  }

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getFcmToken();
    } else {
      this.requestPermission();
    }
  };

  getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log(" Token =====>>>>>>> " + fcmToken);
      this.setState({ notification_token: fcmToken });
    } else {
      console.log("Failed", "No token received");
    }
  };

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      this.getFcmToken();
      // User has authorised
    } catch (error) {
      console.log(" error =====>>>>>>> " + error);
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.is_fetching !== prevProps.is_fetching) {
      if (this.props.is_fetching) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching) {
        this.setState({ loading: false }, () => {
          if (this.props.is_success !== prevProps.is_success) {
            if (this.props.is_success) {
              console.log(
                "user_datas",
                this.props && this.props.user_data && this.props.user_data
              );
              this.props.navigation.navigate("SignupVerifyNo", {
                cell_no: this.state.formattedValue,
              });
            }
          }
          if (this.props.error !== prevProps.error) {
            if (this.props.error == true) {
              this.setState({
                error_msg: this.props.msg,
                is_error_msg_shown: true,
              });
            }
          }
        });
      }
    }
  }

  //TODO:- render event
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
        <View style={styles.container}>
          <Text
            style={{
              color: "#000",
              fontSize: 30,
              fontWeight: "bold",
              fontFamily: "Avenir",
              marginLeft: 25,
              marginTop: 70,
            }}
            allowFontScaling={false}
          >
            Cell Number
          </Text>

          <Text
            style={{
              color: "#747A93",
              fontSize: 13,
              marginLeft: 25,
              marginTop: 8,
            }}
            allowFontScaling={false}
          >
            Please enter your cell phone number below.
          </Text>

          <HeaderTxt title={"Cell"} marginTop={30} />
          <View
            style={{
              height: 54,
              width: "86%",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              marginTop: 3,
            }}
          >
            <PhoneInput
              containerStyle={{
                width: "100%",

                flexDirection: "row",
                borderRadius: 5,
                borderColor: this.state.is_error_msg_shown
                  ? Colors.pink
                  : Colors.InputText,
                borderWidth: 1,
              }}
              ref={this.phoneInput}
              defaultValue={this.state.cell_no}
              defaultCode="US"
              onChangeText={(text) => {
                this.setState({ cell_no: text }, () => {
                  if (this.state.cell_no.length >= 10) {
                    this.setState({ is_btn_disabled: false });

                    this.setState({
                      countryCode:
                        this.phoneInput.current?.getCountryCode() || "",
                    });
                  }
                });
              }}
              onChangeFormattedText={(text) => {
                this.setState({ formattedValue: text }, () => {
                  if (this.state.formattedValue.length >= 10) {
                    this.setState({ is_btn_disabled: false });
                  }
                });
              }}
              withDarkTheme
              withShadow
              autoFocus
            />
          </View>
          {this.state.is_error_msg_shown ? (
            <ErrorContainer error_msg={this.state.error_msg} />
          ) : null}
          <View style={{ flex: 1 }} />

          <TxtFullScreenBtn
            title={"ADD PHONE NUMBER"}
            onPress={() => {
              console.log("jkjm", this.state.countryCode);
              var isValid = this.validation();

              if (isValid) {
                //
                let request = {
                  mobile: this.state.formattedValue,
                };
                this.props.createOtp(request);
              }
            }}
            disabled={this.state.is_btn_disabled ? true : false}
            containerStyle={{
              backgroundColor: this.state.is_btn_disabled
                ? "#D1D2D4"
                : "#FF5C22",
              marginTop: 28,
              marginBottom: 20,
            }}
          />
        </View>
      </SafeAreaContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createOtp: (request_data) => dispatch(createOtp(request_data)),
});

const mapStateToProps = (state) => ({
  is_success: state.createOtp.is_success,
  register_data: state.createOtp.register_data,
  is_fetching: state.createOtp.is_fetching,
  error: state.createOtp.error,
  msg: state.createOtp.msg,
  user_data: state.createOtp.createOtp_data,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupCellNo);
