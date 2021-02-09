import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "./styles";
import AssetsImages from "../../res";
import helper from "../../utils/helper";
import ErrorContainer from "../../components/error_container";
import SingleLineBtn from "../../components/single_line_btn";
import TxtFullScreenBtn from "../../components/txt_full_screen_btn";
import SafeAreaContainer from "../../components/safearea_container";
import HeaderTxt from "../../components/header_txt";
import Loader from "../../components/loader";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import {
  FreshChat_APP_ID,
  FreshChat_APP_KEY,
  PROJECT_TOKEN,
  API_secret,
} from "../../api/api_config";
import Mixpanel from "react-native-mixpanel";
import { connect } from "react-redux";
import {
  forgot_password,
  user_login_clear_data,
  user_social_login,
  user_social_login_clear_data,
} from "../../redux/actions";

//TODO:- Login class
class ForgotPassword extends Component {
  //TODO:- constructor
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,
      ram: "12345",
      email: "",
      keyboardVerticalOffsetValue: 0,
      error_msg: "Please enter a valid email address.",
      is_error_msg_shown: false,
      is_btn_disabled: true,
      loading: false,
      notification_token: "",
      otp_sent: false,
      otp_code: "",
      otpss: this.props.login_data.data,
    };
  }

  //TODO:- class life cycle
  componentDidMount() {
    Mixpanel.sharedInstanceWithToken(PROJECT_TOKEN, false, true, true, null);
  }

  componentDidUpdate(prevProps) {
    // console.log("prevProps => " + JSON.stringify(prevProps));
    // console.log("this.props => " + JSON.stringify(this.props));

    if (this.props.is_fetching !== prevProps.is_fetching) {
      if (this.props.is_fetching) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching) {
        this.setState({ loading: false }, () => {
          if (this.props.is_success !== prevProps.is_success) {
            if (this.props.is_success) {
              console.log("DATA => " + JSON.stringify(this.props.login_data));
              // this.props.navigation.reset({
              //   index: 1,
              //   routes: [
              //     {
              //       name: "AppDrawer",
              //       state: {
              //         routes: [{ name: "AppDrawer" }],
              //       },
              //     },
              //   ],
              // });
              this.props.user_login_clear_data();
            }
          }

          if (this.props.error !== prevProps.error) {
            if (this.props.error == true) {
              setTimeout(() => {
                Alert.alert(
                  "Alert",
                  this.props.msg,
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        this.props.user_login_clear_data();
                      },
                    },
                  ],
                  { cancelable: false }
                );
              }, 200);
            }
          }
        });
      }
    }
  }

  //TODO:- Other Functions
  validation = () => {
    //Email Validation
    const isEmailCorrect = helper.checkEmail(this.state.email);
    return isEmailCorrect;
  };

  handleForgotPassword = () => {
    if (this.state.otp_sent) {
      console.log(this.state.otpss, "kapi", this.state.otp_code);
      if (this.state.otp_code == "") {
        console.log(this.state.otpss, "vdfjdjffgj", this.state.otp_code);
      } else if (this.state.otpss != this.state.otp_code) {
        console.log(this.state.otpss, "kjkjh", this.state.otp_code);
      } else {
        this.props.navigation.navigate("ResetPassword", {
          email: this.state.email,
        });
      }
    } else {
      if (helper.checkEmail(this.state.email)) {
        this.setState({
          otp_sent: true,
          is_btn_disabled: true,
        });
        this.props.forgot_password({ email: this.state.email });
      } else {
        //Incorrect email id
        this.setState({
          is_error_msg_shown: true,
        });
        console.log("incorrect email id..");
      }
    }
  };

  handleForgotPasswords = () => {
    console.log(
      this.props.login_data.data.otp,
      "vdfjdjffgj",
      this.props.login_data.data
    );
    if (this.state.otp_code == "") {
      console.log(this.state.otpss, "vdfjdjffgj", this.state.otp_code);
      this.setState({
        error_msg: "Incorrect Code",
        is_error_msg_shown: true,
      });
    } else if (this.props.login_data.data.otp != this.state.otp_code) {
      console.log("kjkjh", this.state.otp_code, this.props.login_data.data.otp);
      this.setState({
        error_msg: "Incorrect Code",
        is_error_msg_shown: true,
      });
    } else {
      console.log("Otps", this.props.login_data.data.otp);
      this.props.navigation.navigate("reset_password", {
        email: this.state.email,
      });
    }
  };
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
            Forgot Password
          </Text>
          <Text
            style={{
              color: "#80859F",
              fontSize: 13,
              marginLeft: 25,
              marginTop: 8,
            }}
            allowFontScaling={false}
          >
            Please enter your email ID, We will send you OTP to reset password.
          </Text>

          <HeaderTxt title={"Email"} marginTop={30} />

          <TextInput
            style={{
              height: 44,
              width: "86%",
              borderRadius: 5,
              borderColor: "rgba(116,122,147,0.5)",
              borderWidth: 1,
              paddingLeft: 10,
              fontSize: 14,
              color: "#000",
              alignSelf: "center",
              marginTop: 8,
            }}
            placeholder=""
            placeholderTextColor={"rgba(0,0,0,0.4)"}
            keyboardType="email-address"
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={(text) => {
              this.setState({ email: text }, () => {
                if (this.state.email.length != 0) {
                  this.setState({ is_btn_disabled: false });
                } else {
                  this.setState({ is_btn_disabled: true });
                }
              });
            }}
            onBlur={() => {
              // this.validation()
            }}
            onPressSubmit={() => {
              this.setState({ keyboardVerticalOffsetValue: 0 });
            }}
            editable={!this.state.otp_sent}
          />
          {this.state.otp_sent ? (
            <>
              <HeaderTxt title={"Enter OTP"} marginTop={10} />
              <View
                style={{
                  height: 50,
                  width: "86%",
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <SmoothPinCodeInput
                  ref={this.pinInput}
                  value={this.state.otp_code}
                  onTextChange={(code) =>
                    this.setState({ otp_code: code }, () => {
                      if (this.state.otp_code.length == 6) {
                        this.setState({ is_btn_disabled: false });
                      } else {
                        this.setState({ is_btn_disabled: true });
                      }
                    })
                  }
                  codeLength={6}
                  //   cellSize={CONST.DEVICE_WIDTH / 9}
                  //   cellSpacing={CONST.DEVICE_WIDTH / 25}
                  cellStyle={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "#D1D2D4",
                    backgroundColor: "white",
                    height: 50,
                  }}
                  cellStyleFocused={{
                    borderColor: "#FF5C22",
                    backgroundColor: "white",
                  }}
                  cellStyleFilled={{
                    borderColor: "#FF5C22",
                    backgroundColor: "white",
                  }}
                  textStyle={{
                    fontSize: 22,
                    color: "black",
                    fontWeight: "700",
                  }}
                />
              </View>
              <SingleLineBtn
                txt={"Did not receive OTP ?"}
                btnTxt={" Resend"}
                onPress={() => {
                  this.props.forgot_password({ email: this.state.email });
                  // this.props.navigation.goBack()
                  console.log("send otp");
                }}
                marginTop={20}
                marginBottom={20}
              />
            </>
          ) : null}

          {this.state.is_error_msg_shown ? (
            <ErrorContainer error_msg={this.state.error_msg} />
          ) : null}
          <View
            style={{
              width: "50%",
              alignSelf: "flex-end",
            }}
          ></View>
          <TxtFullScreenBtn
            title={this.state.otp_sent ? "Reset Password" : "Send OTP"}
            onPress={
              this.state.otp_sent
                ? this.handleForgotPasswords
                : this.handleForgotPassword
            }
            disabled={this.state.is_btn_disabled}
            containerStyle={{
              backgroundColor: this.state.is_btn_disabled
                ? "#D1D2D4"
                : "#FF5C22",
              marginTop: 15,
            }}
          />

          <SingleLineBtn
            txt={""}
            btnTxt={" Go back to login"}
            onPress={() => {
              // this.props.navigation.goBack()
              this.props.navigation.navigate("Login");
              this.props.login_data;
            }}
            marginTop={30}
            // marginBottom={20}
          />
        </View>
      </SafeAreaContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  forgot_password: (request_data) => dispatch(forgot_password(request_data)),
  user_login_clear_data: () => dispatch(user_login_clear_data()),
  user_social_login: (request_data) =>
    dispatch(user_social_login(request_data)),
  user_social_login_clear_data: () => dispatch(user_social_login_clear_data()),
});

const mapStateToProps = (state) => ({
  is_success: state.forgot_password.is_success,
  login_data: state.forgot_password.forgot_password_data,
  is_fetching: state.forgot_password.is_fetching,
  error: state.forgot_password.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
