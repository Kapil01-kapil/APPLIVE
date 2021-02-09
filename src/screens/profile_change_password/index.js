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
import Mixpanel from "react-native-mixpanel";
import BtnWithImage from "../../components/btn_with_image";
import AssetsImages from "../../res";
import SafeAreaContainer from "../../components/safearea_container";
import styles from "./styles";
import TxtFullScreenBtn from "../../components/txt_full_screen_btn";
import HeaderTxt from "../../components/header_txt";
import { user_profile, update_user_password } from "../../redux/actions";
import Loader from "../../components/loader";
import ErrorContainer from "../../components/error_container";
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
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
class ProfileChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,
      oldpass: "",
      newpass: "",
      conpass: "",
      loading: false,
      old_pwd_hide: true,
      new_pwd_hide: true,
      Confirm_pwd_hide: true,
      error_msg:
        "New password and confirm password do not match , please try again.",
      is_error_msg_shown: false,
      is_btn_disabled: true,
      keyboardVerticalOffsetValue: 0,
    };
  }
  validation = () => {
    //Email Validation
    // var isEmailCorrect = helper.checkEmail(this.state.email);
    if (this.state.oldpass.length == 0) {
      // this.setState({ is_error_msg_shown: true });
      return false;
    } else if (this.state.newpass.length == 0) {
      // this.setState({ is_error_msg_shown: true });
      return false;
    } else if (this.state.conpass.length == 0) {
      // this.setState({ is_error_msg_shown: true });
      return false;
    } else if (this.state.newpass != this.state.conpass) {
      this.setState({ is_error_msg_shown: true });
      return false;
    } else {
      // this.props.navigation.goBack();
      return true;
    }
  };
  //TODO:- class life cycle
  componentDidMount() {
    Mixpanel.sharedInstanceWithToken(PROJECT_TOKEN, false, true, true, null);
    this.props.navigation.setOptions({
      headerTitle: "Password",
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
      id: this.props && this.props.user_data && this.props.user_data.data._id,
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.is_fetching !== prevProps.is_fetching) {
      if (this.props.is_fetching) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching) {
        this.setState({ loading: false }, () => {
          if (this.props.is_success !== prevProps.is_success) {
            if (this.props.is_success) {
              console.log("DATA => kapil ");
              this.props.navigation.goBack();
            }
          }
          if (this.props.error !== prevProps.error) {
            console.log("this.props.error", this.props.error);
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

    // if (this.props.is_success !== prevProps.is_success) {
    //   this.props.navigation.goBack();
    //   console.log("prevProps => " + prevProps.is_success);
    //   console.log("this.props => " + this.props.is_success);

    //   if (this.props.is_success) {
    //     console.log("is_successsss");
    //     this.props.navigation.goBack();
    //   }
    // }
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
      >
        <View style={styles.container}>
          <Loader loading={this.state.loading} />
          <HeaderTxt title={"Old Password"} marginTop={30} />
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
                color: Colors.Black,
              }}
              placeholder=""
              placeholderTextColor={"rgba(0,0,0,0.4)"}
              value={this.state.oldpass}
              //   onChangeText={(text) => {
              //     this.setState({ oldpass: text });
              //   }}
              onChangeText={(text) => {
                this.setState({ oldpass: text }, () => {
                  // this.validation();
                  if (
                    this.state.oldpass.length >= 2 &&
                    this.state.newpass.length >= 2 &&
                    this.state.conpass.length >= 2 &&
                    this.state.newpass != this.state.conpass
                  ) {
                    this.setState({ is_btn_disabled: false });
                  }
                });
              }}
              secureTextEntry={this.state.old_pwd_hide}
              onBlur={() => {
                // this.validation();
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
                this.setState({ old_pwd_hide: !this.state.old_pwd_hide });
              }}
            >
              <Image
                source={
                  this.state.old_pwd_hide
                    ? AssetsImages.icon_show_pwd
                    : AssetsImages.icon_hide_pwd
                }
                style={{ height: 20, width: 20, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </View>

          <HeaderTxt title={"New Password"} marginTop={16} />
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
              placeholderTextColor={"rgba(0,0,0,0.4)"}
              value={this.state.newpass}
              //   onChangeText={(text) => {
              //     this.setState({ newpass: text });
              //   }}

              onChangeText={(text) => {
                this.setState({ newpass: text }, () => {
                  // this.validation();
                  if (
                    this.state.oldpass.length >= 2 &&
                    this.state.newpass.length >= 2 &&
                    this.state.conpass.length >= 2 &&
                    this.state.newpass != this.state.conpass
                  ) {
                    this.setState({ is_btn_disabled: false });
                  }
                });
              }}
              secureTextEntry={this.state.new_pwd_hide}
              onBlur={() => {
                // this.validation();
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
                this.setState({ new_pwd_hide: !this.state.new_pwd_hide });
              }}
            >
              <Image
                source={
                  this.state.new_pwd_hide
                    ? AssetsImages.icon_show_pwd
                    : AssetsImages.icon_hide_pwd
                }
                style={{ height: 20, width: 20, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </View>

          <HeaderTxt title={"New Confirm Password"} marginTop={16} />
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
              placeholderTextColor={"rgba(0,0,0,0.4)"}
              value={this.state.conpass}
              //   onChangeText={(text) => {
              //     this.setState({ conpass: text });
              //   }}

              onChangeText={(text) => {
                this.setState({ conpass: text }, () => {
                  //  this.validation();
                  if (
                    this.state.oldpass.length >= 2 &&
                    this.state.newpass.length >= 2 &&
                    this.state.conpass.length >= 2 &&
                    this.state.newpass != this.state.conpass
                  ) {
                    this.setState({ is_btn_disabled: false });
                  }
                });
              }}
              secureTextEntry={this.state.Confirm_pwd_hide}
              onBlur={() => {
                // this.validation();
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
                  Confirm_pwd_hide: !this.state.Confirm_pwd_hide,
                });
              }}
            >
              <Image
                source={
                  this.state.Confirm_pwd_hide
                    ? AssetsImages.icon_show_pwd
                    : AssetsImages.icon_hide_pwd
                }
                style={{ height: 20, width: 20, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </View>
          {this.state.is_error_msg_shown ? (
            <ErrorContainer error_msg={this.state.error_msg} />
          ) : null}
          <View style={{ flex: 1 }} />

          <TxtFullScreenBtn
            title={"SAVE CHANGES"}
            onPress={() => {
              var isValid = this.validation();

              if (isValid) {
                //
                let request = {
                  old_password: this.state.oldpass,
                  user_id:
                    this.props &&
                    this.props.user_data &&
                    this.props.user_data.data._id,
                  new_password: this.state.newpass,
                };
                console.log("userIDreqyu==========>", request);
                this.props.update_user_password(request);
              }
            }}
            disabled={this.state.is_btn_disabled ? true : false}
            containerStyle={{
              backgroundColor: this.state.is_btn_disabled
                ? "#D1D2D4"
                : "#FF5C22",
              marginTop: 15,
              marginBottom: 20,
            }}
          />
        </View>
      </SafeAreaContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  user_profile: (request_data) => dispatch(user_profile(request_data)),
  update_user_password: (request_data) =>
    dispatch(update_user_password(request_data)),
});

const mapStateToProps = (state) => ({
  user_data: state.user_auth.user_data,

  is_success: state.update_user_password.is_success,
  user_datas: state.update_user_password.update_password_data,
  is_fetching: state.update_user_password.is_fetching,
  msg: state.update_user_password.msg,
  error: state.update_user_password.error,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileChangePassword);
