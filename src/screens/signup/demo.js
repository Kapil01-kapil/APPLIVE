import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import styles from "./styles";
import AssetsImages from "../../res";
import helper from "../../utils/helper";
import SingleLineBtn from "../../components/single_line_btn";
import TxtFullScreenBtn from "../../components/txt_full_screen_btn";
import { CONST } from "../../utils/constants";
import ModalPopup from "../../components/modal_popup";
import SafeAreaContainer from "../../components/safearea_container";
import HeaderTxt from "../../components/header_txt";
import ErrorContainer from "../../components/error_container";
import Colors from "../../constants/Colors";
import Mixpanel from "react-native-mixpanel";
import { PROJECT_TOKEN, API_secret } from "../../api/api_config";
//TODO:- Signup class
export default class Signup extends Component {
  //TODO:- constructor
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,

      name: "",
      email: "",
      password: "",
      keyboardVerticalOffsetValue: 0,
      is_terms_modal_opened: false,
      error_msg:
        "Please check that you've added a valid email\naddress and password.",
      is_error_msg_shown: false,
      is_btn_disabled: true,
      txt_one:
        "These Terms of Use (“Terms”) govern your access or use of applications, websites, content, products, and services (the “Services”) made available by EZFill LLC,its subsidiaries, affiliates, and related entities (collectively, “EZFill”). Please read the following Terms of Use carefully before accessing and/or using the Services.",
      txt_two:
        "Your access and use of the Services constitutes your agreement to be bound by these Terms, which establishes a legally binding agreement between you and EZFill. If you do not agree to these Terms, you may not access or use the Services.EZFill reserves the right, in our sole and absolute discretion, at any time, for any reason whatsoever, with or without notice, to terminate, suspend, amend, or modify the Services and/or the Terms related to the Services, which will be effective upon the posting of such updated Terms by EZFilll on the EZFill website located at “www.ezfillapp.com” (the “Website”). Your continued access or use of the Services after such posting constitutes your consent to be bound by the Terms, as amended.  EZFillmay immediately terminate these Terms or any Services with respect to you, or generally cease offering or deny access to the Services or any portion thereof, at any time for any reason.EZFill’s collection and use of personal information in connection with the Services is as provided in the Privacy Policy located at www.ezfillapp.com/privacypolicy.In these Terms, the words “including” and “include” mean “including, but not limited to.”",
    };
  }

  //TODO:- class life cycle
  componentDidMount() {
    Mixpanel.sharedInstanceWithToken(PROJECT_TOKEN, false, true, true, null);
  }

  //TODO:- Other Functions
  validation = () => {
    //Email Validation
    var isEmailCorrect = helper.checkEmail(this.state.email);
    if (this.state.name.length == 0) {
      this.setState({ is_error_msg_shown: true });
      return false;
    } else if (!isEmailCorrect) {
      this.setState({ is_error_msg_shown: true });
      return false;
    } else if (this.state.password.length == 0) {
      this.setState({ is_error_msg_shown: true });
      return false;
    } else {
      return true;
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
        <Modal
          animated={false}
          animationType="none"
          transparent={true}
          visible={this.state.is_terms_modal_opened}
          onDismiss={() => {
            this.setState({ is_terms_modal_opened: false });
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.7)",
              padding: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                height: "95%",
                width: CONST.DEVICE_WIDTH - 40,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  backgroundColor: "#fff",
                  height: "92%",
                  width: CONST.DEVICE_WIDTH - 40,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    marginTop: 20,
                    marginBottom: 10,
                    fontSize: 15,
                    color: "#000",
                    width: "80%",
                    marginLeft: 25,
                    fontWeight: "bold",
                  }}
                >
                  TERMS OF USE
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: "#80859F",
                    width: "80%",
                    marginLeft: 25,

                    fontFamily: "Avenir",
                  }}
                >
                  {this.state.txt_one}
                </Text>

                <Text
                  style={{
                    marginTop: 10,
                    margin: 5,
                    fontSize: 14,
                    color: "#000",
                    width: "80%",
                    marginLeft: 25,
                    fontWeight: "bold",

                    fontFamily: "Avenir",
                  }}
                >
                  APPLICABILITY & ACCEPTANCE OF THESE TERMS OF USE.
                </Text>

                <Text
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    fontSize: 13,
                    color: "#80859F",
                    width: "80%",
                    marginLeft: 25,
                    // fontWeight: '500',
                    fontFamily: "Avenir",
                  }}
                >
                  {this.state.txt_two}
                </Text>
              </ScrollView>

              <TxtFullScreenBtn
                title={"CLOSE"}
                onPress={() => {
                  this.setState({ is_terms_modal_opened: false });
                }}
                disabled={false}
                containerStyle={{
                  backgroundColor: "#FF5C22",
                  marginTop: 5,
                  marginBottom: 10,
                }}
              />
            </View>
          </View>
        </Modal>

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
            Sign Up with EzFill
          </Text>

          <View style={{ flexDirection: "row", marginLeft: 25, marginTop: 8 }}>
            <Text
              style={{ color: "#747A93", fontSize: 13 }}
              allowFontScaling={false}
            >
              By refistering you agree to the{" "}
            </Text>

            <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={() => {
                this.setState({ is_terms_modal_opened: true });
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: Colors.Black,
                  fontWeight: "600",
                  textDecorationLine: "underline",
                }}
              >
                Terms of Use{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <HeaderTxt title={"Name"} marginTop={30} />
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
            <TextInput
              style={{
                height: 44,
                width: "100%",
                borderRadius: 5,
                borderColor: Colors.InputText,
                borderWidth: 1,
                paddingLeft: 10,
                fontSize: 14,
                color: Colors.Black,
              }}
              placeholder=""
              placeholderTextColor={Colors.Black}
              value={this.state.name}
              onChangeText={(text) => {
                this.setState({ name: text }, () => {
                  if (
                    this.state.name.length != 0 &&
                    this.state.email.length != 0 &&
                    this.state.password.length != 0
                  ) {
                    this.setState({ is_btn_disabled: false });
                  }
                });
              }}
            />
          </View>
          <HeaderTxt title={"Email"} marginTop={10} />
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
            <TextInput
              style={{
                height: 44,
                width: "100%",
                borderRadius: 5,
                borderColor: this.state.is_error_msg_shown
                  ? Colors.pink
                  : Colors.InputText,
                borderWidth: 1,
                paddingLeft: 10,
                fontSize: 14,
                color: Colors.Black,
              }}
              placeholder=""
              placeholderTextColor={Colors.Black}
              value={this.state.email}
              onChangeText={(text) => {
                this.setState({ email: text }, () => {
                  if (
                    this.state.name.length != 0 &&
                    this.state.email.length != 0 &&
                    this.state.password.length != 0
                  ) {
                    this.setState({ is_btn_disabled: false });
                  }
                });
              }}
              onBlur={() => {
                this.setState({ keyboardVerticalOffsetValue: 0 });
              }}
              onPressSubmit={() => {
                this.setState({ keyboardVerticalOffsetValue: 0 });
              }}
            />
          </View>

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
              onChangeText={(text) => {
                this.setState({ password: text }, () => {
                  if (
                    this.state.name.length != 0 &&
                    this.state.email.length != 0 &&
                    this.state.password.length != 0
                  ) {
                    this.setState({ is_btn_disabled: false });
                  }
                });
              }}
              secureTextEntry={true}
              onFocus={() => {
                this.setState({ keyboardVerticalOffsetValue: 100 });
              }}
              onBlur={() => {
                this.setState({ keyboardVerticalOffsetValue: 0 });
              }}
              onPressSubmit={() => {
                this.setState({ keyboardVerticalOffsetValue: 0 });
              }}
            />
            {/* <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: "100%", width: 40, }}
                            onPress={() => {

                            }}>
                            <Image source={AssetsImages.icon_show_pwd} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                        </TouchableOpacity> */}
          </View>
          {this.state.is_error_msg_shown ? (
            <ErrorContainer error_msg={this.state.error_msg} />
          ) : null}
          <View style={{ flex: 1 }} />

          <SingleLineBtn
            txt={"Already have an account?"}
            btnTxt={" Login here"}
            onPress={() => {
              // this.props.navigation.goBack()
              this.props.navigation.navigate("Login");
            }}
            marginTop={20}
            // marginBottom={20}
          />

          <TxtFullScreenBtn
            title={"CREATE ACCOUNT"}
            onPress={() => {
              var isValid = this.validation();
              if (isValid) {
                var data = {
                  name: this.state.name,
                  email: this.state.email,
                  password: this.state.password,
                };
                this.props.navigation.navigate("SignupCellNo", {
                  sign_up_data: data,
                });
              }
            }}
            disabled={this.state.is_btn_disabled ? true : false}
            containerStyle={{
              backgroundColor: this.state.is_btn_disabled
                ? Colors.disable
                : Colors.OrangeRed,
              marginTop: 25,
              marginBottom: 20,
            }}
          />
        </View>
      </SafeAreaContainer>
    );
  }
}
