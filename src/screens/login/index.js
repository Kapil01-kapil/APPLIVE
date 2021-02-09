import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
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
import Colors from "../../constants/Colors";
import Mixpanel from "react-native-mixpanel";
import { PROJECT_TOKEN, API_secret } from "../../api/api_config";
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
import {
  appleAuthAndroid,
  appleAuth,
  AppleButton,
} from "@invertase/react-native-apple-authentication";
import { KEYS_DATA } from "../../utils/constants";
import { connect } from "react-redux";
import {
  login_user,
  user_login_clear_data,
  user_social_login,
  user_social_login_clear_data,
} from "../../redux/actions";

//TODO:- Login class
class Login extends Component {
  //TODO:- constructor
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,
      email: "",
      password: "",
      is_pwd_hide: true,
      keyboardVerticalOffsetValue: 0,
      error_msg:
        "Please check that you've added a valid email\naddress and password.",
      is_error_msg_shown: false,
      is_btn_disabled: true,
      loading: false,
      notification_token: "",
    };
  }

  //TODO:- class life cycle
  componentDidMount() {
    Mixpanel.sharedInstanceWithToken(PROJECT_TOKEN, false, true, true, null);
    GoogleSignin.configure();
    if (!appleAuth.isSupported || Platform.OS == "android") {
    } else {
      /**
       * subscribe to credential updates.This returns a function which can be used to remove the event listener
       * when the component unmounts.
       */
      this.authCredentialListener = appleAuth.onCredentialRevoked(async () => {
        console.warn("Credential Revoked");
        this.fetchAndUpdateCredentialState().catch((error) =>
          this.setState({ credentialStateForUser: `Error: ${error.code}` })
        );
      });

      this.fetchAndUpdateCredentialState()
        .then((res) => this.setState({ credentialStateForUser: res }))
        .catch((error) =>
          this.setState({ credentialStateForUser: `Error: ${error.code}` })
        );
    }
    this.checkPermission();
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
  componentWillUnmount() {
    if (!appleAuth.isSupported || Platform.OS == "android") {
    } else {
      /**
       * cleans up event listener
       */
      this.authCredentialListener();
    }
  }
  applesignIn = async () => {
    console.warn("Beginning Apple Authentication");

    // start a login request
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      console.log("appleAuthRequestResponse", appleAuthRequestResponse);
      var requestData = {
        signup_type: "apple",
        name:
          appleAuthRequestResponse.fullName.familyName +
          " " +
          appleAuthRequestResponse.fullName.givenName,
        email: appleAuthRequestResponse.email,
        deviceId: appleAuthRequestResponse.identityToken,
        deviceToken: appleAuthRequestResponse.user,
        deviceType: Platform.OS,
        countryCode:"",
        phone:"",
      };
      this.props.user_social_login(requestData);
      const {
        user: newUser,
        email,
        nonce,
        identityToken,
        realUserStatus /* etc */,
      } = appleAuthRequestResponse;

      this.user = newUser;

      this.fetchAndUpdateCredentialState()
        .then((res) => this.setState({ credentialStateForUser: res }))
        .catch((error) =>
          this.setState({ credentialStateForUser: `Error: ${error.code}` })
        );

      if (identityToken) {
        // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
        console.log(nonce, identityToken);
      } else {
        // no token - failed sign-in?
      }

      if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
        console.log("I'm a real person!");
      }

      console.warn(`Apple Authentication Completed, ${this.user}, ${email}`);
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.warn("User canceled Apple Sign in.");
      } else {
        console.error(error);
      }
    }
  };

  fetchAndUpdateCredentialState = async () => {
    if (this.user === null) {
      this.setState({ credentialStateForUser: "N/A" });
    } else {
      const credentialState = await appleAuth.getCredentialStateForUser(
        this.user
      );
      if (credentialState === appleAuth.State.AUTHORIZED) {
        this.setState({ credentialStateForUser: "AUTHORIZED" });
      } else {
        this.setState({ credentialStateForUser: credentialState });
      }
    }
  };
  componentDidUpdate(prevProps) {
    console.log("prevProps => " + JSON.stringify(prevProps));
    console.log("this.props => " + JSON.stringify(this.props));

    if (this.props.is_fetching !== prevProps.is_fetching) {
      if (this.props.is_fetching) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching) {
        this.setState({ loading: false }, () => {
          if (this.props.is_success !== prevProps.is_success) {
            if (this.props.is_success) {
              console.log("DATA => " + JSON.stringify(this.props.login_data));
              Mixpanel.optInTracking();

              Mixpanel.trackWithProperties("Login", {
                button_type: "yellow button",
                button_text: "Onboarding",
              });
              this.props.navigation.reset({
                index: 1,
                routes: [
                  {
                    name: "AppDrawer",
                    state: {
                      routes: [{ name: "AppDrawer" }],
                    },
                  },
                ],
              });
              this.props.user_login_clear_data();
            }
          }

          if (this.props.error !== prevProps.error) {
            if (this.props.error == true) {
              this.setState({
                error_msg: this.props.msg,
                is_error_msg_shown: true,
              });
              this.props.user_login_clear_data();
            }
          }
        });
      }
    }

    if (this.props.is_fetching_social !== prevProps.is_fetching_social) {
      if (this.props.is_fetching_social) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching_social) {
        this.setState({ loading: false }, () => {
          if (this.props.is_success_social !== prevProps.is_success_social) {
            if (this.props.is_success_social) {
              Mixpanel.optInTracking();
              Mixpanel.trackWithProperties("Login", {
                button_type: "yellow button",
                button_text: "EZ_Fill",
              });
              console.log(
                "DATAmata => " +
                  JSON.stringify(this.props.user_social_login_data.data.phone)
              );

              if (this.props.user_social_login_data.data.phone == "0") {
                this.props.navigation.navigate("SignupCellNo");
              } else {
                this.props.navigation.reset({
                  index: 1,
                  routes: [
                    {
                      name: "AppDrawer",
                      state: {
                        routes: [{ name: "AppDrawer" }],
                      },
                    },
                  ],
                });
              }

              this.props.user_social_login_clear_data();
            }
          }

          if (this.props.error_social !== prevProps.error_social) {
            if (this.props.error_social == true) {
              this.setState({
                title: "Unable to Login",
                isPopUpOpened: true,
                bodyTxt: this.props.msg_social,
              });
              this.props.user_social_login_clear_data();
            }
          }
        });
      }
    }
  }

  //TODO:- Other Functions
  validation = () => {
    //Email Validation
    var isEmailCorrect = helper.checkEmail(this.state.email);
    if (!isEmailCorrect) {
      this.setState({ is_error_msg_shown: true });
      return false;
    } else if (this.state.password.length == 0) {
      this.setState({ is_error_msg_shown: true });
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
          this.setState({
            title: "Unable to Login",
            isPopUpOpened: true,
            bodyTxt: "Something went wrong, Please try again later.",
          });
          // alert("Something went wrong, Please try again later.");
        } else {
          this.setState({ userInfo: result });
          // Alert.alert("Facebook Login Success", "Login ID : " + result.email)
          console.log("result:", result);
          var requestData = {
            signup_type: "facebook",
            name: result.name,
            email: result.email,
            deviceId: result.id,
            deviceToken: this.state.notification_token,
            deviceType: Platform.OS,
            countryCode:"",
            phone:"",
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
        deviceToken: this.state.notification_token,
        deviceType: Platform.OS,
        countryCode:"",
        phone:"",
      };
      Mixpanel.track(userInfo.user.name);
      Mixpanel.set({ $email: userInfo.user.email });
      this.props.user_social_login(requestData);
      //Alert.alert("Google Login Success", "Login ID : " + userInfo.user.email)
    } catch (error) {
      console.log("Loginfailerror: " + error);
      this.setState({
        title: "Unable to Login",
        isPopUpOpened: true,
        bodyTxt: "Something went wrong, Please try again later.",
      });
      // alert("Something went wrong, Please try again later.");
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
              color: Colors.Black,
              fontSize: 25,
              fontWeight: "bold",
              fontFamily: "Avenir",
              marginLeft: 25,
              marginTop: 70,
            }}
            allowFontScaling={false}
          >
            Login
          </Text>
          <Text
            style={{
              color: Colors.LightGray,
              fontSize: 13,
              marginLeft: 25,
              marginTop: 8,
            }}
            allowFontScaling={false}
          >
            Already have an EzFill account?
          </Text>

          <HeaderTxt title={"Email"} marginTop={30} />

          <TextInput
            style={{
              height: 44,
              width: "86%",
              borderRadius: 5,
              borderColor: this.state.is_error_msg_shown
                ? Colors.pink
                : Colors.InputText,
              borderWidth: 1,
              paddingLeft: 10,
              fontSize: 14,
              color: Colors.Black,
              alignSelf: "center",
              marginTop: 8,
            }}
            autoCapitalize="none"
            placeholder=""
            placeholderTextColor={Colors.Black}
            value={this.state.email}
            onChangeText={(text) => {
              this.setState({ email: text }, () => {
                if (
                  this.state.password.length >= 2 &&
                  this.state.email.length != 0
                ) {
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

          <HeaderTxt title={"Password"} marginTop={10} />

          <View
            style={{
              height: 44,
              width: "86%",
              borderRadius: 5,
              borderColor: this.state.is_error_msg_shown
                ? Colors.pink
                : Colors.InputText,
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
                color: Colors.Black,
              }}
              placeholder=""
              placeholderTextColor={Colors.Black}
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
          <View
            style={{
              width: "50%",
              alignSelf: "flex-end",
            }}
          >
            <SingleLineBtn
              btnTxt={"Forgot password ?"}
              onPress={() => {
                // console.log("forgot password..");
                this.props.navigation.navigate("ForgotPassword");
              }}
              marginTop={10}
            />
          </View>

          {this.state.is_error_msg_shown ? (
            <ErrorContainer error_msg={this.state.error_msg} />
          ) : null}

          <TxtFullScreenBtn
            title={"LOGIN"}
            onPress={() => {
              var isValid = this.validation();
              if (isValid) {
                //
                let request = {
                  email: this.state.email,
                  password: this.state.password,
                  deviceId: "D12345",
                  deviceToken: this.state.notification_token,
                  deviceType: Platform.OS,
                };
                this.props.login_user(request);
              }
            }}
            disabled={this.state.is_btn_disabled ? true : false}
            containerStyle={{
              backgroundColor: this.state.is_btn_disabled
                ? Colors.disable
                : Colors.OrangeRed,
              marginTop: 25,
            }}
          />

          <View style={{ flex: 1 }} />

          <SingleLineBtn
            txt={"New to EzFill?"}
            btnTxt={" Create a new account"}
            onPress={() => {
              // this.props.navigation.goBack()
              this.props.navigation.navigate("SignupOption");
            }}
            marginTop={20}
            // marginBottom={20}
          />
          <SocialMediaBtn
            img={AssetsImages.icon_fb}
            txt={"LOGIN WITH FACEBOOK"}
            backgroundColor={Colors.FaceBook}
            onPress={() => {
              this.loginWithFacebook();
            }}
          />
          <SocialMediaBtn
            img={AssetsImages.icon_google}
            txt={"LOGIN WITH GOOGLE"}
            backgroundColor={Colors.Gmail}
            topMargin={15}
            marginBottom={20}
            onPress={this.signIn}
          />
          <GoogleSigninButton
            style={{ width: 0, height: 0 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this.signIn}
            disabled={this.state.isSigninInProgress}
          />
          {!appleAuth.isSupported || Platform.OS == "android" ? null : (
            <AppleButton
              style={styles.appleButton}
              cornerRadius={5}
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.CONTINUE}
              onPress={() => this.applesignIn()}
            />
          )}
        </View>
      </SafeAreaContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login_user: (request_data) => dispatch(login_user(request_data)),
  user_login_clear_data: () => dispatch(user_login_clear_data()),

  user_social_login: (request_data) =>
    dispatch(user_social_login(request_data)),
  user_social_login_clear_data: () => dispatch(user_social_login_clear_data()),
});

const mapStateToProps = (state) => ({
  is_success: state.user_login.is_success,
  login_data: state.user_login.login_data,
  is_fetching: state.user_login.is_fetching,
  msg: state.user_login.msg,
  error: state.user_login.error,

  is_success_social: state.user_social_login.is_success,
  user_social_login_data: state.user_social_login.user_social_login_data,
  is_fetching_social: state.user_social_login.is_fetching,
  msg_social: state.user_social_login.msg,
  error_social: state.user_social_login.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
