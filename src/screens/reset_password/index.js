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
import SocialMediaBtn from "../../components/social_media_btn";
import SingleLineBtn from "../../components/single_line_btn";
import TxtFullScreenBtn from "../../components/txt_full_screen_btn";
import SafeAreaContainer from "../../components/safearea_container";
import HeaderTxt from "../../components/header_txt";
import Loader from "../../components/loader";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-community/google-signin";

import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from "react-native-fbsdk";
import firebase from "react-native-firebase";

import { KEYS_DATA } from "../../utils/constants";

import { connect } from "react-redux";
import {
  forgot_udate_password,
  login_user,
  user_login_clear_data,
  user_social_login,
  user_social_login_clear_data,
} from "../../redux/actions";

//TODO:- Login class
class ResetPassword extends Component {
  //TODO:- constructor
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,
      Confirmpassword: "",
      email: "",
      password: "",
      is_pwd_hide: true,
      id_password_hide: true,
      keyboardVerticalOffsetValue: 0,
      error_msg:
        "New password and confirm password do not match , please try again.",
      is_error_msg_shown: false,
      is_btn_disabled: true,
      loading: false,
      notification_token: "",
    };
  }

  //TODO:- class life cycle
  componentDidMount() {
    GoogleSignin.configure();
  }

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
              this.props.navigation.navigate("Login");
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

  Confirmpasswords = () => {
    if (this.state.password == "") {
      console.log(this.state.password);
      this.setState({ is_error_msg_shown: true });
    } else if (this.state.password != this.state.Confirmpassword) {
      this.setState({ is_error_msg_shown: true });
      console.log("Confirmpassword");
    } else {
      console.log("ok");
      this.props.forgot_udate_password({
        email: this.props.route.params.email,
        password: this.state.password,
      });
    }
  };

  //TODO:- Other Functions
  validation = () => {
    //Email Validation
    var isEmailCorrect = helper.checkEmail(this.state.email);
    if (!isEmailCorrect) {
      return false;
    } else if (this.state.password.length == 0) {
      return false;
    } else {
      return true;
    }
  };
  getInfoFromToken = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: "id, name,  first_name, last_name,email, picture.type(large)",
      },
    };
    const profileRequest = new GraphRequest(
      "/me",
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, result) => {
        if (error) {
          console.log("login info has error: " + error);
          alert("Something went wrong, Please try again later.");
        } else {
          this.setState({ userInfo: result });
          // Alert.alert("Facebook Login Success", "Login ID : " + result.email)
          console.log("result:", result);
          var requestData = {
            signup_type: "facebook",
            name: result.name,
            email: result.email,
            deviceId: result.id,
            deviceToken: "T54852",
            deviceType: "1",
          };
          this.props.user_social_login(requestData);
          // ApiAccess.post("social/login", params).then(res => {
          //   alert(JSON.stringify(res))
          // }).catch(e => console.log(JSON.stringify(token)))
          // this.fbloginnow(result);
        }
      }
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };
  async loginWithFacebook() {
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      (login) => {
        if (login.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();
            this.getInfoFromToken(accessToken);
          });
        }
      },
      (error) => {
        console.log("Login fail with error: " + error);
      }
    );
  }
  // Somewhere in your code
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
      console.log("LoginSucess: " + JSON.stringify(userInfo));
      var requestData = {
        signup_type: "gplus",
        name: userInfo.user.name,
        email: userInfo.user.email,
        deviceId: userInfo.user.id,
        deviceToken: "T54852",
        deviceType: "1",
      };
      this.props.user_social_login(requestData);
      //Alert.alert("Google Login Success", "Login ID : " + userInfo.user.email)
    } catch (error) {
      console.log("Loginfailerror: " + error);
      alert("Something went wrong, Please try again later.");
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
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
            Reset Password
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
            Enter new password
          </Text>
          <HeaderTxt title={"New Password"} marginTop={30} />
          <View
            style={{
              height: 44,
              width: "86%",
              borderRadius: 5,
              borderColor: "rgba(116,122,147,0.5)",
              borderWidth: 1,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              marginTop: 8,
            }}
          >
            <TextInput
              style={{
                height: 44,
                flex: 1,
                paddingLeft: 10,
                fontSize: 14,
                color: "#000",
              }}
              placeholder=""
              placeholderTextColor={"rgba(0,0,0,0.4)"}
              value={this.state.password}
              maxLength={20}
              onChangeText={(text) => {
                this.setState({ password: text }, () => {
                  // this.validation()
                  if (
                    this.state.password.length >= 2 &&
                    this.state.email.length != 0
                  ) {
                    this.setState({ is_btn_disabled: false });
                  }
                });
              }}
              secureTextEntry={this.state.is_pwd_hide}
              onFocus={() => {
                this.setState({ keyboardVerticalOffsetValue: 100 });
              }}
              onBlur={() => {
                // this.validation()
              }}
              onPressSubmit={() => {
                this.setState({ keyboardVerticalOffsetValue: 0 });
              }}
            />
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: 40,
              }}
              activeOpacity={1}
              onPress={() => {
                this.setState({ is_pwd_hide: !this.state.is_pwd_hide });
              }}
            >
              <Image
                source={
                  this.state.is_pwd_hide
                    ? AssetsImages.icon_show_pwd
                    : AssetsImages.icon_hide_pwd
                }
                style={{ height: 20, width: 20, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </View>
          <HeaderTxt title={"Confirm Password"} marginTop={10} />
          <View
            style={{
              height: 44,
              width: "86%",
              borderRadius: 5,
              borderColor: "rgba(116,122,147,0.5)",
              borderWidth: 1,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              marginTop: 8,
            }}
          >
            <TextInput
              style={{
                height: 44,
                width: "80%",
                flex: 1,
                paddingLeft: 10,
                fontSize: 14,
                color: "#000",
              }}
              placeholder=""
              placeholderTextColor={"rgba(0,0,0,0.4)"}
              value={this.state.Confirmpassword}
              maxLength={20}
              onChangeText={(text) => {
                this.setState({ Confirmpassword: text }, () => {
                  // this.validation()
                  if (
                    this.state.password.length >= 2 &&
                    this.state.email.length != 0
                  ) {
                    this.setState({ is_btn_disabled: false });
                  }
                });
              }}
              secureTextEntry={this.state.id_password_hide}
              onFocus={() => {
                this.setState({ keyboardVerticalOffsetValue: 100 });
              }}
              onBlur={() => {
                // this.validation()
              }}
              onPressSubmit={() => {
                this.setState({ keyboardVerticalOffsetValue: 0 });
              }}
            />
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: 40,
              }}
              activeOpacity={1}
              onPress={() => {
                this.setState({
                  id_password_hide: !this.state.id_password_hide,
                });
              }}
            >
              <Image
                source={
                  this.state.id_password_hide
                    ? AssetsImages.icon_show_pwd
                    : AssetsImages.icon_hide_pwd
                }
                style={{ height: 20, width: 20, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </View>
          {this.state.is_btn_disabled && this.state.is_error_msg_shown ? (
            <ErrorContainer error_msg={this.state.error_msg} />
          ) : null}
          <View
            style={{
              width: "50%",
              alignSelf: "flex-end",
            }}
          ></View>
          <TxtFullScreenBtn
            title={"RESET PASSWORD"}
            onPress={this.Confirmpasswords}
            disabled={false}
            containerStyle={{
              backgroundColor: "#FF5C22",
              marginTop: 15,
            }}
          />
          <TxtFullScreenBtn
            title={"CANCEL"}
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
            disabled={false}
            fontColor="#000"
            containerStyle={{
              borderWidth: 1,
              borderColor: "#000",
              marginTop: 15,
            }}
          />
        </View>
      </SafeAreaContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login_user: (request_data) => dispatch(login_user(request_data)),
  user_login_clear_data: () => dispatch(user_login_clear_data()),
  forgot_udate_password: (request_data) =>
    dispatch(forgot_udate_password(request_data)),
  user_social_login: (request_data) =>
    dispatch(user_social_login(request_data)),
  user_social_login_clear_data: () => dispatch(user_social_login_clear_data()),
});

const mapStateToProps = (state) => ({
  is_success: state.reset_password.is_success,
  login_data: state.reset_password.forgot_update_password_data,
  is_fetching: state.reset_password.is_fetching,
  error: state.reset_password.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
