//TODO:- imports
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
import SocialMediaBtn from "../../components/social_media_btn";
import TxtFullScreenBtn from "../../components/txt_full_screen_btn";
import SingleLineBtn from "../../components/single_line_btn";
import SafeAreaContainer from "../../components/safearea_container";
import firebase from "react-native-firebase";
import { KEYS_DATA } from "../../utils/constants";
import Colors from "../../constants/Colors";
import { connect } from "react-redux";
import {
  user_social_login,
  user_social_login_clear_data,
} from "../../redux/actions";
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
} from "react-native-fbsdk"; //TODO:- SignupOption class
import {
  appleAuth,
  AppleButton,
} from "@invertase/react-native-apple-authentication";

class SignupOption extends Component {
  //TODO:- constructor
  constructor(props) {
    super(props);
    this.authCredentialListener = null;
    this.user = null;
    this.state = {
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,
      credentialStateForUser: -1,
      name: "",
      email: "",
      password: "",
      keyboardVerticalOffsetValue: 0,
      notification_token: "",
    };
  }

  //TODO:- class life cycle
  componentDidMount() {
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
      if (!appleAuth.isSupported) {
        const credentialState = await appleAuth.getCredentialStateForUser(
          this.user
        );
        if (credentialState === appleAuth.State.AUTHORIZED) {
          this.setState({ credentialStateForUser: "AUTHORIZED" });
        } else {
          this.setState({ credentialStateForUser: credentialState });
        }
      }
    }
  };
  componentDidUpdate(prevProps) {
    console.log("prevProps => " + JSON.stringify(prevProps));
    console.log("this.props => " + JSON.stringify(this.props));

    if (this.props.is_fetching_social !== prevProps.is_fetching_social) {
      if (this.props.is_fetching_social) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching_social) {
        this.setState({ loading: false }, () => {
          if (this.props.is_success_social !== prevProps.is_success_social) {
            if (this.props.is_success_social) {
              console.log(
                "DATA => " + JSON.stringify(this.props.user_social_login_data)
              );
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
              // setTimeout(() => {
              //   Alert.alert(
              //     "Alert",
              //     this.props.msg_social,
              //     [
              //       {
              //         text: "OK",
              //         onPress: () => {
              //           this.props.user_social_login_clear_data();
              //         },
              //       },
              //     ],
              //     { cancelable: false }
              //   );
              // }, 200);
            }
          }
        });
      }
    }
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
          //alert("Something went wrong, Please try again later.");
        } else {
          this.setState({ userInfo: result });
          // Alert.alert("Facebook Login Success", "Login ID : " + result.email)
          console.log("result:", result);
          var requestData = {
            signup_type: "facebook",
            name: result.name,
            email: result.email,
            deviceId: result.id,
            countryCode:"",
            phone:"",
            deviceToken: this.state.notification_token,
            deviceType: Platform.OS,
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
        countryCode:"",
        phone:"",
        deviceId: userInfo.user.id,
        deviceToken: this.state.notification_token,
        deviceType: Platform.OS,
      };
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
  //   initUserInfo = (accessToken) => {
  //     fetch('https://graph.facebook.com/v2.5/me?fields=id,name,email,picture.type(large){url},first_name,last_name,friends&access_token=' + accessToken)
  //       .then((response) => response.json())
  //       .then((json) => {
  //         var requestData = {
  //           "signup_type":"facebook",
  //           "name": json.name,
  //           "email": json.email,
  //           "deviceId": json.id,
  //           "deviceToken":"T54852",
  //           "deviceType":"1"
  //         }
  //         this.props.user_social_login(requestData)
  //       })
  //       .catch(() => {
  //         alert('ERROR GETTING DATA FROM FACEBOOK')
  //       })
  //   }

  // onPressFBLogIn = () => {

  //     LoginManager.logInWithPermissions(['public_profile', 'email',]).then(
  //       (result) => {
  //         if (result.isCancelled) {
  //           setTimeout(() => {
  //             alert('Login was cancelled');
  //           }, 200);
  //md
  //         } else {

  //           AccessToken.getCurrentAccessToken().then((data) => {
  //             const { accessToken, userID } = data
  //             this.initUserInfo(accessToken)
  //           })

  //         }
  //       },
  //       (error) => {
  //         setTimeout(() => {
  //           // GLOBALMETHODS.showAlert('Login failed with error: ' + error);
  //           this.setState({ customPopUptitle: "Login failed with error: " + error, isCustomPopupShown: true })
  //         }, 200);
  //         this.setState({ loading: !this.state.loading })
  //       }
  //     );
  // }

  // onPressGoogleLogin = async () => {
  //     try {
  //       await GoogleSignin.hasPlayServices();
  //       const userInfoDetails = await GoogleSignin.signIn();

  //       var requestData = {
  //         "signup_type":"gplus",
  //         "name": userInfoDetails.user.name,
  //         "email": userInfoDetails.user.email,
  //         "deviceId": userInfoDetails.user.id,
  //         "deviceToken":"T54852",
  //         "deviceType":"1"
  //       }
  //       this.props.user_social_login(requestData)
  //       console.log(JSON.stringify(userInfoDetails))

  //     } catch (error) {
  //       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //         // user cancelled the login flow
  //       } else if (error.code === statusCodes.IN_PROGRESS) {
  //         // operation (e.g. sign in) is in progress already
  //       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //         // play services not available or outdated
  //       } else {
  //         // some other error happened
  //       }
  //     }
  //   };

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
            Sign Up
          </Text>

          <Text
            style={{
              color: "#747A93",
              fontSize: 13,
              marginLeft: 25,
              marginTop: 8,
              lineHeight: 25,
            }}
            allowFontScaling={false}
          >
            New to EzFill? Create an account using your existing{"\n"}social
            accounts, or sign up for an EzFill account
          </Text>

          <SocialMediaBtn
            img={AssetsImages.icon_fb}
            txt={"SIGNUP WITH FACEBOOK"}
            backgroundColor={"#325BA5"}
            onPress={() => {
              this.loginWithFacebook();
            }}
          />
          <SocialMediaBtn
            img={AssetsImages.icon_google}
            txt={"SIGNUP WITH GOOGLE"}
            backgroundColor={"#E13D36"}
            topMargin={16}
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
          {/* <TxtFullScreenBtn
            title={"SIGNUP WITH EZFILL"}
            onPress={() => {
              this.props.navigation.navigate("Signup");
            }}
            disabled={false}
            containerStyle={{
              backgroundColor: "#FF5C22",
              marginTop: 16,
            }}
          /> */}
          <TxtFullScreenBtn
            title={"SIGNUP WITH EZFILL"}
            onPress={() => {
              this.props.navigation.navigate("SignupCellNo");
            }}
            disabled={false}
            containerStyle={{
              backgroundColor: Colors.OrangeRed,
              marginTop: 16,
            }}
          />

          <View style={{ flex: 1 }} />

          <SingleLineBtn
            txt={"Already have an account?"}
            btnTxt={" Login here"}
            onPress={() => {
              // this.props.navigation.goBack()
              this.props.navigation.navigate("Login");
            }}
            marginBottom={20}
            marginTop={25}
          />
        </View>
      </SafeAreaContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  user_social_login: (request_data) =>
    dispatch(user_social_login(request_data)),
  user_social_login_clear_data: () => dispatch(user_social_login_clear_data()),
});

const mapStateToProps = (state) => ({
  is_success_social: state.user_social_login.is_success,
  user_social_login_data: state.user_social_login.user_social_login_data,
  is_fetching_social: state.user_social_login.is_fetching,
  msg_social: state.user_social_login.msg,
  error_social: state.user_social_login.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupOption);
