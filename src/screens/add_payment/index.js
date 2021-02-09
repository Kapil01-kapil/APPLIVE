import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Alert,
  Modal,
} from "react-native";
import BtnWithImage from "../../components/btn_with_image";
import AssetsImages from "../../res";
import SafeAreaContainer from "../../components/safearea_container";
import styles from "./styles";
import PaymentMethodView from "../../components/payment_method_view";
import TxtFullScreenBtn from "../../components/txt_full_screen_btn";
import HeaderTxt from "../../components/header_txt";
import SelectInput from "react-native-select-input-ios";
import { connect } from "react-redux";
import {
  add_card,
  create_card,
  add_card_clear_data,
  create_card_clear_data,
} from "../../redux/actions";
import Loader from "../../components/loader";
import ImagePicker from "react-native-image-crop-picker";
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
class AddPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,
      isContainingTwoBtn: true,
      firstBtnTitle: "REMOVE",
      secondBtnTitle: "NO THANKS",
      image: null,
      isFromAddVehicle: false,
      isFromMembership: false,
      loading: false,
      is_terms_modal_opened: false,
      is_btn_disabled: true,
      card_no: "",
      zipCode: "",
      expDate: "",
      ccv: "",
      countryValue: "",
      country: [
        { value: "Select", label: "Select" },
        { value: "United States", label: "United States" },
      ],
      is_error: true,
      expDatePrevLength: 0,
      txt_one:
        "A CVV is the three- or four-digit number that can be found on the back on your card.",
    };
  }

  //TODO:- class life cycle
  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: "Add Payment",
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
      isFromAddVehicle:
        (this.props.route.params && this.props.route.params.isFromAddVehicle) ||
        false,
      isFromMembership:
        (this.props.route.params && this.props.route.params.isFromMembership) ||
        false,
    });
  }

  validateData = () => {
    if (
      this.state.countryValue.length != 0 &&
      this.state.zipCode.length != 0 &&
      this.state.card_no.length != 0 &&
      this.state.ccv.length != 0 &&
      this.state.expDate.length != 0
    ) {
      this.setState({ is_btn_disabled: false });
    }
  };

  onSubmitCountryValue(value) {
    this.setState(
      {
        countryValue: value,
      },
      () => {
        this.validateData();
      }
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.is_fetching_create !== prevProps.is_fetching_create) {
      if (this.props.is_fetching_create) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching_create) {
        this.setState({ loading: false }, () => {
          if (this.props.is_success_create !== prevProps.is_success_create) {
            if (this.props.is_success_create) {
              var requestData = {
                user_token:
                  this.props &&
                  this.props.user_data &&
                  this.props.user_data.data.user_token,
                customer_id:
                  this.props &&
                  this.props.user_data &&
                  this.props.user_data.data.stripe_id,
                token:
                  this.props &&
                  this.props.user_data &&
                  this.props.create_card_data,
                user_id:
                  this.props &&
                  this.props.user_data &&
                  this.props.user_data.data._id,
              };
              console.log(
                "this.props.user_data" +
                  JSON.stringify(
                    this.props && this.props.user_data && this.props.user_data
                  )
              );

              console.log("requestData" + JSON.stringify(requestData));
              this.props.add_card(requestData);
            }
            this.props.create_card_clear_data();
          }

          if (this.props.error_create !== prevProps.error_create) {
            if (this.props.error_create) {
              setTimeout(() => {
                this.setState({ is_error: false });
                this.props.add_card_clear_data();
                // Alert.alert(
                //   'Alert',
                //   this.props.msg_create,
                //   [{
                //     text: 'OK', onPress: () => {
                //       this.props.create_card_clear_data()
                //     }
                //   }],
                //   { cancelable: false },
                // );
              }, 200);
            }
          }
        });
      }
    }

    if (this.props.is_fetching_add !== prevProps.is_fetching_add) {
      if (this.props.is_fetching_add) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching_add) {
        this.setState({ loading: false }, () => {
          if (this.props.is_success_add !== prevProps.is_success_add) {
            if (this.props.is_success_add) {
              this.props.navigation.navigate("Payment", {
                isFromAddVehicle: this.state.isFromAddVehicle,
                isFromMembership: this.state.isFromMembership,
              });
            }
            this.props.add_card_clear_data();
          }

          if (this.props.error !== prevProps.error) {
            if (this.props.error) {
              setTimeout(() => {
                // Alert.alert(
                //   'Alert',
                //   this.props.msg,
                //   [{
                //     text: 'OK', onPress: () => {
                this.props.add_card_clear_data();
                this.setState({ is_error: false });
                //     }
                //   }],
                //   { cancelable: false },
                // );
              }, 200);
            }
          }
        });
      }
    }
  }
  pickSingleWithCamera(cropping, mediaType = "photo") {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then((image) => {
        console.log("received image", image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch((e) => alert(e));
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
        onPressFirstBtn={() => {}}
        secondBtnTitle={this.state.secondBtnTitle}
        onPressSecondBtn={() => {
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
              backgroundColor: "rgba(0,0,0,0.7)",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <View
              style={{
                width: "95%",
                backgroundColor: "#fff",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                bottom: 10,
                marginBottom: 30,
              }}
            >
              <Text
                style={{
                  marginTop: 40,
                  fontSize: 18,
                  color: "#000",
                  width: "80%",
                  marginLeft: 25,
                  fontWeight: "bold",
                }}
              >
                What is a CCV?
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 20,
                  fontSize: 13,
                  color: "#80859F",
                  width: "80%",
                  marginLeft: 25,
                  fontFamily: "Avenir",
                }}
              >
                {this.state.txt_one}
              </Text>

              <TxtFullScreenBtn
                title={"CLOSE"}
                onPress={() => {
                  this.setState({ is_terms_modal_opened: false });
                }}
                disabled={false}
                containerStyle={{
                  backgroundColor: "#FF5C22",
                  marginTop: 5,
                  marginBottom: 20,
                }}
              />
            </View>
          </View>
        </Modal>

        <Loader loading={this.state.loading} />

        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <HeaderTxt
            title={"Saved Payment Methods"}
            marginTop={40}
            marginBottom={10}
          />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 8,
              width: "86%",
              alignSelf: "center",
            }}
          >
            <TextInput
              style={{
                height: 44,
                flex: 1,
                borderRadius: 5,
                borderColor: "rgba(116,122,147,0.5)",
                borderWidth: 1,
                paddingLeft: 10,
                fontSize: 14,
                color: "#000",
                alignSelf: "center",
              }}
              placeholder=""
              placeholderTextColor={"rgba(0,0,0,0.4)"}
              value={this.state.card_no}
              maxLength={16}
              keyboardType="numeric"
              onChangeText={(text) => {
                this.setState({ card_no: text }, () => {
                  this.validateData();
                });
              }}
              onBlur={() => {
                // this.validation()
              }}
              onPressSubmit={() => {}}
            />
            <TouchableOpacity
              style={{
                height: 44,
                width: 50,
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                right: 0,
              }}
              onPress={() => this.pickSingleWithCamera(false)}
            >
              <Image
                source={AssetsImages.icon_camera}
                style={{ height: 16, width: 16, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              width: "86%",
              alignSelf: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "48%" }}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <HeaderTxt
                  title={"Exp Date"}
                  marginTop={16}
                  marginBottom={10}
                  txtStyle={{ marginLeft: 0 }}
                />
                {/* <TouchableOpacity
                  style={{
                    height: 40,
                    width: 40,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    this.setState({ is_terms_modal_opened: true });
                    console.log("hi");
                  }}
                >
                  <Image
                    source={AssetsImages.icon_info}
                    style={{ height: 14, width: 14, resizeMode: "contain" }}
                  />
                </TouchableOpacity> */}
              </View>

              <TextInput
                style={{
                  height: 44,
                  flex: 1,
                  borderRadius: 5,
                  borderColor: "rgba(116,122,147,0.5)",
                  borderWidth: 1,
                  paddingLeft: 10,
                  fontSize: 14,
                  color: "#000",
                }}
                placeholder=""
                placeholderTextColor={"rgba(0,0,0,0.4)"}
                value={this.state.expDate}
                keyboardType="numeric"
                maxLength={5}
                onChangeText={(text) => {
                  this.setState(
                    {
                      expDatePrevLength: this.state.expDate.length,
                      expDate: text,
                    },
                    () => {
                      // this.setState({ expDate: text, }, () => {

                      if (
                        this.state.expDate.length == 2 &&
                        this.state.expDatePrevLength < this.state.expDate.length
                      ) {
                        this.setState({ expDate: this.state.expDate + "/" });
                      } else if (
                        this.state.expDate.length == 2 &&
                        this.state.expDatePrevLength > this.state.expDate.length
                      ) {
                        this.setState({
                          expDate: this.state.expDate.slice(0, -1),
                          expDatePrevLength: this.state.expDate.length,
                        });
                      }
                      this.validateData();
                      // })
                    }
                  );
                }}
                onBlur={() => {
                  // this.validation()
                }}
                onPressSubmit={() => {}}
              />
            </View>

            <View style={{ width: "48%" }}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <HeaderTxt
                  title={"CCV"}
                  marginTop={16}
                  marginBottom={10}
                  txtStyle={{ marginLeft: 0 }}
                />
                <TouchableOpacity
                  style={{
                    height: 40,
                    width: 40,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    this.setState({ is_terms_modal_opened: true });
                    console.log("hi");
                  }}
                >
                  <Image
                    source={AssetsImages.icon_info}
                    style={{ height: 14, width: 14, resizeMode: "contain" }}
                  />
                </TouchableOpacity>
              </View>

              <TextInput
                style={{
                  height: 44,
                  flex: 1,
                  borderRadius: 5,
                  borderColor: "rgba(116,122,147,0.5)",
                  borderWidth: 1,
                  paddingLeft: 10,
                  fontSize: 14,
                  color: "#000",
                }}
                placeholder=""
                placeholderTextColor={"rgba(0,0,0,0.4)"}
                keyboardType="numeric"
                value={this.state.ccv}
                maxLength={3}
                onChangeText={(text) => {
                  this.setState({ ccv: text }, () => {
                    this.validateData();
                  });
                }}
                onBlur={() => {
                  // this.validation()
                }}
                onPressSubmit={() => {}}
              />
            </View>
          </View>

          <HeaderTxt title={"Country"} marginTop={16} />
          <View
            style={{
              height: 44,
              width: "86%",
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              marginTop: 3,
              borderRadius: 5,
              borderColor: "rgba(116,122,147,0.5)",
              borderWidth: 1,
            }}
          >
            <Image
              source={AssetsImages.icon_dropdown_off}
              style={{
                height: 16,
                width: 16,
                resizeMode: "contain",
                position: "absolute",
                right: 15,
              }}
            />

            <SelectInput
              value={this.state.countryValue}
              options={this.state.country}
              buttonsViewStyle={{
                backgroundColor: "#FF5C22",
                height: 44,
                alignItems: "center",
              }}
              buttonsTextStyle={{
                fontSize: 15,
                color: "#fff",
                fontWeight: "900",
                fontFamily: "Avenir",
              }}
              style={{ height: 44, width: "100%", justifyContent: "center" }}
              labelStyle={{
                width: "89%",
                paddingLeft: 10,
                fontSize: 14,
                color: "#000",
                backgroundColor: "#fff",
              }}
              onSubmitEditing={this.onSubmitCountryValue.bind(this)}
            />
          </View>

          <HeaderTxt title={"Zip Code"} marginTop={16} marginBottom={10} />
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
            }}
            placeholder=""
            placeholderTextColor={"rgba(0,0,0,0.4)"}
            value={this.state.zipCode}
            maxLength={6}
            keyboardType="numeric"
            onChangeText={(text) => {
              this.setState({ zipCode: text }, () => {
                this.validateData();
              });
            }}
            onBlur={() => {
              // this.validation()
            }}
            onPressSubmit={() => {}}
          />
          {this.state.is_error ? null : (
            <View
              style={{
                flexDirection: "row",
                margin: 25,
                backgroundColor: "#FFA8A8",
                padding: 15,
                borderRadius: 10,
              }}
            >
              <Image
                source={AssetsImages.icon_alert}
                style={{ height: 20, width: 20, margin: 10 }}
              />
              <Text
                style={{
                  fontSize: 13,
                  color: "red",
                  fontWeight: "600",
                  width: "80%",
                }}
              >
                {" "}
                Looks like somethings wrong. Please check the information above
                and try again.
              </Text>
            </View>
          )}
        </ScrollView>
        <TxtFullScreenBtn
          title={"ADD PAYMENT METHOD"}
          onPress={() => {
            var fields = this.state.expDate.split("/");
            var exp_month = fields[0];
            var exp_year = fields[1];

            var request = {
              card_number: this.state.card_no,
              exp_month: exp_month,
              exp_year: exp_year,
              cvc: this.state.ccv,
            };
            this.props.create_card(request);
            console.log(JSON.stringify(request));
          }}
          disabled={this.state.is_btn_disabled ? true : false}
          containerStyle={{
            backgroundColor: this.state.is_btn_disabled ? "#D7D8D9" : "#FF6600",
            marginTop: 15,
            marginBottom: 20,
          }}
          fontColor={"#FFF"}
        />
      </SafeAreaContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  create_card: (request_data) => dispatch(create_card(request_data)),
  add_card: (request_data) => dispatch(add_card(request_data)),
  add_card_clear_data: () => dispatch(add_card_clear_data()),
  create_card_clear_data: () => dispatch(create_card_clear_data()),
});

const mapStateToProps = (state) => ({
  create_card_data: state.create_card.create_card_data,
  add_card_data: state.add_card.add_card_data,

  is_success_create: state.create_card.is_success,
  is_fetching_create: state.create_card.is_fetching,
  msg_create: state.create_card.msg,
  error_create: state.create_card.error,

  is_success_add: state.add_card.is_success,
  is_fetching_add: state.add_card.is_fetching,
  msg: state.add_card.msg,
  error: state.add_card.error,

  user_data: state.user_auth.user_data,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPayment);
