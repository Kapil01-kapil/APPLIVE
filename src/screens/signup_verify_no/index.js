import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Icon,
} from "react-native";
import styles from "./styles";
import AssetsImages from "../../res";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { CONST } from "../../utils/constants";
import SafeAreaContainer from "../../components/safearea_container";
import TxtFullScreenBtn from "../../components/txt_full_screen_btn";
import Loader from "../../components/loader";
import Mixpanel from "react-native-mixpanel";
import { PROJECT_TOKEN, API_secret } from "../../api/api_config";
import { connect } from "react-redux";
import { createOtp, updatePhone } from "../../redux/actions";
import Colors from "../../constants/Colors";
import ErrorContainer from "../../components/error_container";
//TODO:- SignupVerifyNo class
class SignupVerifyNo extends Component {
  //TODO:- constructor
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,
      error_msg: "",
      otp_code: "",
      cell_no: "",
      keyboardVerticalOffsetValue: 0,
      is_btn_disabled: true,
      is_error: false,
      loading: false,
    };
  }

  //TODO:- class life cycle
  componentDidMount() {
    Mixpanel.sharedInstanceWithToken(PROJECT_TOKEN, false, true, true, null);
    this.setState({
      cell_no: this.props.route.params.cell_no,
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.is_fetching !== prevProps.is_fetching) {
      if (this.props.is_fetching) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching) {
        this.setState({ loading: false });
      }
    }

    if (
      this.props.is_fetching_updatePhone !== prevProps.is_fetching_updatePhone
    ) {
      if (this.props.is_fetching_updatePhone) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching_updatePhone) {
        this.setState({ loading: false });
      }
    }
    if (this.props.is_success !== prevProps.is_success) {
      console.log("prevProps => " + prevProps.is_success);
      console.log("this.props => " + this.props.is_success);

      if (this.props.is_success) {
        console.log(
          "user_datas",
          this.props && this.props.user_data && this.props.user_data
        );
        // this.props.navigation.navigate("SignupVerifyNo", {
        //   cell_no: this.state.formattedValue,
        // });
      }
    }

    if (
      this.props.is_success_updatePhone !== prevProps.is_success_updatePhone
    ) {
      console.log("prevProps hvgklhm => " + prevProps.is_success);
      console.log("this.props => " + this.props.is_success);

      if (this.props.is_success_updatePhone) {
        console.log(
          "user_datas",
          this.props &&
            this.props.user_data_updatePhone_Auth &&
            this.props.user_data_updatePhone_Auth
        );
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
        <View style={styles.container} keyboardShouldPersistTaps="handled">
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
            Verify
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
            Please enter the verification code sent{"\n"}to {this.state.cell_no}{" "}
            via SMS{" "}
          </Text>

          <View
            style={{
              height: 50,
              width: "86%",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
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
              cellSize={CONST.DEVICE_WIDTH / 9}
              cellSpacing={CONST.DEVICE_WIDTH / 25}
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

          {this.state.is_error ? (
            <ErrorContainer error_msg={this.state.error_msg} />
          ) : null}

          <View style={{ flexDirection: "row", marginLeft: 25, marginTop: 25 }}>
            <Text style={{ fontSize: 13, color: "#747A93" }}>
              Didn't receive a code?
            </Text>

            <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={() => {
                let request = {
                  mobile: this.state.cell_no,
                };
                this.props.createOtp(request);
              }}
            >
              <Text style={{ fontSize: 13, color: "#000", fontWeight: "600" }}>
                {" "}
                Send it again
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }} />

          <TxtFullScreenBtn
            title={"CONFIRM"}
            onPress={() => {
              if (
                this.props &&
                this.props.user_data &&
                this.props.user_data.data.otp == this.state.otp_code
              ) {
                this.props &&
                this.props.user_data_updatePhone_Auth &&
                this.props.user_data_updatePhone_Auth.data
                  ? this.props.updatePhone({
                      user_id:
                        this.props &&
                        this.props.user_data_updatePhone_Auth &&
                        this.props.user_data_updatePhone_Auth.data._id,
                      phone: this.props.route.params.cell_no,
                    })
                  : this.props.navigation.navigate("Signup", {
                      cell_no: this.props.route.params.cell_no,
                    });
              } else {
                this.setState({
                  error_msg: "Incorrect Code",
                  is_error: true,
                });
                //this.setState({ is_error: false });
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

  updatePhone: (request_data) => dispatch(updatePhone(request_data)),
});

const mapStateToProps = (state) => ({
  user_data: state.createOtp.createOtp_data,
  is_success: state.createOtp.is_success,
  register_data: state.createOtp.register_data,
  is_fetching: state.createOtp.is_fetching,
  user_data: state.createOtp.createOtp_data,

  user_data_updatePhone: state.updatePhone.updatePhone_data,
  is_success_updatePhone: state.updatePhone.is_success,
  register_data_updatePhone: state.updatePhone.register_data,
  is_fetching_updatePhone: state.updatePhone.is_fetching,

  user_data_updatePhone_Auth: state.user_auth.user_data,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupVerifyNo);
