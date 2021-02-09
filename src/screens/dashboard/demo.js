import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
  Keyboard,
} from "react-native";
import styles from "./styles";
import AssetsImages from "../../res";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { CONST } from "../../utils/constants";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import BtnWithImage from "../../components/btn_with_image";
import SafeAreaContainer from "../../components/safearea_container";
import TxtFullScreenBtn from "../../components/txt_full_screen_btn";
import { ScrollView } from "react-native-gesture-handler";
import PricingView from "../../components/pricing_view";
import HeaderTxt from "../../components/header_txt";
import Loader from "../../components/loader";
import { connect } from "react-redux";
import {
  FreshChat_APP_ID,
  FreshChat_APP_KEY,
  PROJECT_TOKEN,
  API_secret,
} from "../../api/api_config";
import Mixpanel from "react-native-mixpanel";
import {
  vehicle_dropdown,
  saved_vehicle,
  saved_vehicle_clear_data,
  create_stripe_account,
  user_profile,
  boat_dropdown,
  card_list,
  get_price,
  get_price_clear_data,
  delete_Address,
  ServiceLocationService,
  create_Address,
  create_Address_clear_data,
  delete_Address_clear_data,
  create_Address_data,
  user_login_clear_data,
  saveNotMatched,
  user_social_login,
  user_social_login_clear_data,
  saved_location,
  saved_location_locar_clear_data,
} from "../../redux/actions";
import LocationView from "../../components/location_view";
import {
  Freshchat,
  FreshchatConfig,
  FaqOptions,
  ConversationOptions,
  FreshchatUser,
  FreshchatMessage,
  FreshchatNotificationConfig,
} from "react-native-freshchat-sdk";
//import Geolocation from "@react-native-community/geolocation";
import moment from "moment";
import { GooglePlacesAutocomplete } from "../../components/googleSerch/GooglePlacesAutocomplete";
//TODO:- Dashboard class
class Dashboard extends Component {
  //TODO:- constructor

  constructor(props) {
    super(props);
    //this.configMixpanel();
    this.initFreshChat();
    this.state = {
      title: "Service Scheduled",
      bodyTxt:
        "Your service has been ordered.\nDon’t forget to leave your gas door open.",
      isPopUpOpened: false,

      secondBtnTitle: "NO THANKS",
      isContainImg: true,
      firstBtnTitle: "ADD MEMBERSHIP TO CHECKOUT",
      img: AssetsImages.bitmap,
      loading: false,
      location_txt: "",
      animated_value_top: new Animated.Value(1000),
      isAnimating: false,
      locationss: true,
      isContainingTwoBtn: true,
      initialPosition: "unknown",
      lastPosition: "unknown",
      longitudes: "",
      latitudes: "",
      altitudes: "",
      accuracys: "",
      description: [],
      postal_code: [],
      Citys: "",
      States: "",
      County: "",
      search_data: [
        {
          searchStr: "1531 Northwest 12th Avenue",
        },
      ],
      saved_location: [
        {
          locationType: "Home",
          searchStr: "1531 Northwest 39th Street",
        },
      ],
      is_show_request_view: false,
      is_requested_for_home: true,
      show_verify_parking_location: false,

      latitude: null,
      longitude: null,

      isScheduleViewShown: false,
      isSavedVahicleApiSuccess: false,

      orderData: {},
    };
  }

  watchID = null;
  initFreshChat = () => {
    const APP_ID = FreshChat_APP_ID;
    const APP_KEY = FreshChat_APP_KEY;
    const freshchatConfig = new FreshchatConfig(APP_ID, APP_KEY);
    Freshchat.init(freshchatConfig);
  };

  // setupUserFreshchat = () => {
  //   let freshchatUser = new FreshchatUser();
  //   freshchatUser.firstName = this.props.user_data.data.name;
  //   freshchatUser.lastName = this.props.user_data.data.name;
  //   freshchatUser.email = this.props.user_data.data.email;
  //   freshchatUser.phone = this.props.user_data.data.phone;
  //   Freshchat.setUser(freshchatUser);
  // };

  // resetUserFreshchat = () => {
  //   Freshchat.resetUser();
  // };
  // configMixpanel = async () => {
  //   this.mixpanel = await Mixpanel.init(PROJECT_TOKEN);
  // };
  componentDidMount() {
    Mixpanel.sharedInstanceWithToken(PROJECT_TOKEN);
    // Mixpanel.track(this.props.user_data.data.name);
    // Mixpanel.set({ $email: this.props.user_data.data.email });
    // // Mixpanel.track(this.props.user_data.data.name);
    // console.log("Mixpanel", Mixpanel);
    this.props.navigation.setOptions({
      headerTitle: "Service",
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
    console.log(
      "this.props.saved_location_data",
      this.props.saved_location_data
    );
    this.props.saved_location_data;
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.onFocus();
    });
    let requestVehicle = { vehicle_type: "vehicle" };
    this.props.vehicle_dropdown(requestVehicle);
    let requestBoat = { vehicle_type: "boat" };
    this.props.boat_dropdown(requestBoat);

    let request_get_price = { status: 1 };
    this.props.get_price(request_get_price);

    let request_saved_vehicle = { user_id: this.props.user_data.data._id };

    let SaveVehicle = this.props.saved_vehicle(request_saved_vehicle);
    this.props.saved_location(request_saved_vehicle);
    console.log("SaveVehicle,SaveVehicle", SaveVehicle);
    if (this.props.user_data.data.hasOwnProperty("stripe_id") == false) {
      let request_stripe_account = {
        name: this.props.user_data.data.name,
        email: this.props.user_data.data.email,
        phone: this.props.user_data.data.phone,
      };
      this.props.create_stripe_account(request_stripe_account);

      setTimeout(() => {
        let request_user_profile = { user_id: this.props.user_data.data._id };
        this.props.user_profile(request_user_profile);
      }, 500);
    }
  }
  componentWillUnmount() {
    this._unsubscribe();
    // this.watchID != null && Geolocation.clearWatch(this.watchID);
  }

  onFocus = () => {
    console.log("ON focus....");
    // this.fetchData();
    let request = { user_id: this.props.user_data.data._id };
    this.props.saved_location(request);
    this.props.create_Address_clear_data();
    this.props.saved_location_data;
    this.props.saved_location_locar_clear_data();
    console.log(
      "this.props.saved_location_data",
      this.props.saved_location_data
    );
    console.log("DATA ", JSON.stringify(this.props.login_da));
    this.setState({ is_btn_disabled: true });
  };

  //TODO:- Other Functions
  handleScroll = (event) => {};

  componentDidUpdate(prevProps) {
    this.props.saved_location_data;
    console.log(
      "this.props.saved_location_data",
      this.props.saved_location_data
    );

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
    if (this.props.is_fetching_delete !== prevProps.is_fetching_delete) {
      if (this.props.is_fetching_delete) {
        if (!this.state.isApiCalled) {
          this.setState({ loading: true });
        }
      } else if (!this.props.is_fetching_delete) {
        this.setState({ loading: false, isApiCalled: true });
      }
    }

    if (this.props.is_success_delete !== prevProps.is_success_delete) {
      if (this.props.is_success_delete) {
        this.setState({ isSavedVahicleApiSuccess: true });
        this.props.delete_Address_clear_data();
      }
    }

    if (this.props !== prevProps) {
      if (this.props.route.params) {
        this.setState(
          {
            isScheduleViewShown: this.props.route.params.isFromCheckout,
            location_txt: "",
            //is_show_request_view: false,
            is_requested_for_home: true,
            isScheduleViewShown: true,
            show_verify_parking_location: false,
            orderData: this.props.route.params.orderData,
          },
          () => {
            this.setState({ isPopUpOpened: false, title: "Service Scheduled" });
          }
        );
      }
    }

    if (this.props.is_fetching !== prevProps.is_fetching) {
      if (this.props.is_fetching) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching) {
        this.setState({ loading: false });
      }
    }
    if (this.props.is_fetching_delete !== prevProps.is_fetching_delete) {
      if (this.props.is_fetching_delete) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching_delete) {
        this.setState({ loading: false });
      }
    }
    if (
      this.props.is_fetching_create_address !==
      prevProps.is_fetching_create_address
    ) {
      if (this.props.is_fetching_create_address) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching_create_address) {
        this.setState({ loading: false });
      }
    }

    if (this.props.is_fetchings !== prevProps.is_fetchings) {
      if (this.props.is_fetchings) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching) {
        this.setState({ loading: false });
      }
    }
    if (this.props.is_fetchinggg !== prevProps.is_fetchinggg) {
      if (this.props.is_fetchinggg) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetchinggg) {
        this.setState({ loading: false });
      }
    }

    if (this.props.is_fet !== prevProps.is_fet) {
      if (this.props.is_fet) {
        this.setState({ loading: true });
      } else if (!this.props.is_fet) {
        this.setState({ loading: false });
      }
    }

    if (this.props.is_success !== prevProps.is_success) {
      if (this.props.is_success) {
        this.setState({ isSavedVahicleApiSuccess: true });
      }
    }
    if (
      this.props.is_success_create_address !==
      prevProps.is_success_create_address
    ) {
      if (this.props.is_success_create_address) {
        this.setState({ isSavedVahicleApiSuccess: true });
      }
    }

    if (this.props.is_success !== prevProps.is_success) {
      if (this.props.is_success) {
        this.setState({ isSavedVahicleApiSuccess: true });
      }
    }
    if (this.props.is_succes !== prevProps.is_succes) {
      if (this.props.is_succes) {
        this.setState({ isSavedVahicleApiSuccess: true });
      }
    }

    if (this.props.is_successss !== prevProps.is_successss) {
      if (this.props.is_successss) {
        this.setState({ isSavedVahicleApiSuccess: true });
      }
    }
    if (
      this.props.is_success_saveNotMatched !==
      prevProps.is_success_saveNotMatched
    ) {
      if (this.props.is_success_saveNotMatched) {
        this.setState({ isSavedVahicleApiSuccess: true });
      }
    }
    if (this.props.is_successs !== prevProps.is_successs) {
      if (this.props.is_succe) {
        this.setState({ isSavedVahicleApiSuccess: true });
      }
    }

    if (this.props.is_fetchinggg !== prevProps.is_fetchinggg) {
      if (this.props.is_fetchinggg) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetchinggg) {
        this.setState({ loading: false }, () => {
          if (this.props.is_successss !== prevProps.is_successss) {
            if (this.props.is_successss) {
              console.log("DATA " + JSON.stringify(this.props.login_dataaa));
              console.log(
                "DATA " + JSON.stringify(this.props.login_dataaa.data.data)
              );

              if (this.props.login_dataaa.data.data.length <= 0) {
                console.log("jhdfgkj");
                this.setState({
                  firstBtnTitle: "OK",
                  secondBtnTitle: "NO THANKS",
                  isPopUpOpened: true,
                  title: "Current location",
                  bodyTxt:
                    "We are not currently in to your location. Please choose another location.",
                });
              } else {
                this.setState({
                  show_verify_parking_location: true,
                  is_show_request_view: false,
                });
              }

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

          if (this.props.errorrr !== prevProps.errorrr) {
            if (this.props.errorrr == true) {
              setTimeout(() => {
                Alert.alert(
                  "Alert",
                  //this.props.msg,
                  "Invalid value",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        this.props.user_login_clear_data();
                        this.setState({
                          is_show_request_view: false,
                          show_verify_parking_location: false,
                          is_requested_for_home: false,
                          isPopUpOpened: false,
                        });
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

    if (this.props.is_success_delete !== prevProps.is_success_delete) {
      console.log("is_succe_delete", this.props.is_succe_delete);
      if (this.props.is_success_delete == true) {
        console.log("DATA====>", this.props.delete_Address_clear_data);
        let request = { user_id: this.props.user_data.data._id };
        this.props.saved_location(request);

        this.props.delete_Address_clear_data();
        this.props.saved_location_locar_clear_data();
      }
    }

    if (this.props.is_fetching_delete !== prevProps.is_fetching_delete) {
      if (this.props.is_fetching_delete) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching_delete) {
        this.setState({ loading: false }, () => {
          if (this.props.is_success_delete !== prevProps.is_success_delete) {
            if (this.props.is_success_delete) {
              console.log(
                "DATAhtdjjgkhlkjk" +
                  JSON.stringify(this.props.delete_Address_data)
              );
              console.log(
                "DATA==========> ram",
                JSON.stringify(this.props.saved_location_data)
              );

              this.props.saved_location_locar_clear_data();
              this.props.delete_Address_clear_data();
            }
          }

          if (this.props.errorrr !== prevProps.errorrr) {
            if (this.props.errorrr == true) {
              setTimeout(() => {
                Alert.alert(
                  "Alert",
                  //this.props.msg,
                  "Invalid value",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        this.props.saved_location_locar_clear_data();
                        this.setState({
                          is_show_request_view: false,
                          show_verify_parking_location: false,
                          is_requested_for_home: false,
                          isPopUpOpened: false,
                        });
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

    if (
      this.props.is_fetching_create_address !==
      prevProps.is_fetching_create_address
    ) {
      if (this.props.is_fetching_create_address) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching_create_address) {
        this.setState({ loading: false }, () => {
          if (
            this.props.is_success_create_address !==
            prevProps.is_success_create_address
          ) {
            if (this.props.is_success_create_address) {
              console.log(
                "DATAhtdjjgkhlkjk" +
                  JSON.stringify(this.props.login_data_create_address)
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
              this.props.saved_location_locar_clear_data();
              this.props.create_Address_clear_data();
            }
          }

          if (
            this.props.error_create_address !== prevProps.error_create_address
          ) {
            if (this.props.error_create_address == true) {
              setTimeout(() => {
                Alert.alert(
                  "Alert",
                  //this.props.msg,
                  "Invalid value",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        this.props.saved_location_locar_clear_data();
                        this.props.create_Address_clear_data();
                        this.setState({
                          is_show_request_view: false,
                          show_verify_parking_location: false,
                          is_requested_for_home: false,
                          isPopUpOpened: false,
                        });
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

    if (this.props.is_fetchings !== prevProps.is_fetchings) {
      if (this.props.is_fetchings) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetchings) {
        this.setState({ loading: false }, () => {
          if (this.props.is_succes !== prevProps.is_succes) {
            if (this.props.is_succes) {
              console.log(
                "DATA==========> ram",
                JSON.stringify(this.props.saved_location_data)
              );
              console.log(
                "D=jbsjbjfdg",
                JSON.stringify(this.props.saved_location_data)
              );

              this.props.saved_location_locar_clear_data();
            }
          }

          if (this.props.error !== prevProps.error) {
            if (this.props.error == true) {
              setTimeout(() => {
                Alert.alert(
                  "Alert",
                  "Invalid value",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        this.props.saved_location_locar_clear_data();
                        this.setState({
                          is_show_request_view: false,
                          show_verify_parking_location: false,
                          is_requested_for_home: false,
                          isPopUpOpened: false,
                        });
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

    if (this.props.is_fetching !== prevProps.is_fetching) {
      if (this.props.is_fetching) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching) {
        this.setState({ loading: false }, () => {
          if (this.props.is_success !== prevProps.is_success) {
            if (this.props.is_success) {
              console.log(
                "DATA==========>",
                JSON.stringify(this.props.saved_vehicle_data)
              );
              console.log(
                "DATA==========>",
                JSON.stringify(this.props.saved_vehicle_datas)
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
              this.props.user_login_clear_data();
            }
          }

          if (this.props.error !== prevProps.error) {
            if (this.props.error == true) {
              setTimeout(() => {
                Alert.alert(
                  "Alert",
                  "Invalid value",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        this.props.user_login_clear_data();
                        this.setState({
                          is_show_request_view: false,
                          show_verify_parking_location: false,
                          is_requested_for_home: false,
                          isPopUpOpened: false,
                        });
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

    if (this.props.is_fet !== prevProps.is_fet) {
      if (this.props.is_fet) {
        this.setState({ loading: true });
      } else if (!this.props.is_fet) {
        this.setState({ loading: false }, () => {
          if (
            this.props.is_success_saveNotMatched !==
            prevProps.is_success_saveNotMatched
          ) {
            if (this.props.is_success_saveNotMatched) {
              console.log("DATA ", JSON.stringify(this.props.login_da));
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

          if (this.props.err !== prevProps.err) {
            if (this.props.err == true) {
              setTimeout(() => {
                Alert.alert(
                  "Alert",
                  "Invalid value",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        this.props.user_login_clear_data();
                        this.setState({
                          is_show_request_view: false,
                          show_verify_parking_location: false,
                          is_requested_for_home: false,
                          isPopUpOpened: false,
                        });
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

  onRegionChange = (region) => {
    console.log(JSON.stringify(region));
    this.setState({
      region,
      marker: {
        latitude: region.latitude,
        longitude: region.longitude,
      },
    });
  };
  _listEmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#000",
            marginVertical: 15,
            textAlign: "center",
            fontSize: 20,
          }}
        >
          ..
        </Text>
      </View>
    );
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
        isContainImg={this.state.isContainImg}
        firstBtnTitle={this.state.firstBtnTitle}
        isContainingTwoBtn={this.state.isContainingTwoBtn}
        img={this.state.img}
        onPressFirstBtn={() => {
          this.props.saveNotMatched({
            user_id: this.props.user_data.data._id,
            line1: this.state.description,
            line2: this.state.description,
            city: this.state.Citys,
            zipcode: this.state.postal_code,
            state: this.state.States,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            type: "Home",
          }),
            this.props.user_login_clear_data();
          this.setState({
            is_show_request_view: false,
            show_verify_parking_location: false,
            is_requested_for_home: false,
            isPopUpOpened: false,
          });
          // [
          //   this.props.user_login_clear_data(),
          //   this.setState({
          //     is_show_request_view: false,
          //     show_verify_parking_location: false,
          //     is_requested_for_home: false,
          //   }),
          // ];
        }}
        secondBtnTitle={this.state.secondBtnTitle}
        onPressSecondBtn={() => {
          this.setState({ isPopUpOpened: false });
        }}
      >
        <Loader loading={this.state.loading} />

        <View style={styles.container}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                width: "90%",

                marginBottom: 12,
                flexDirection: "row",
              }}
            >
              <GooglePlacesAutocomplete
                placeholder="Where would you like service?"
                autoFocus={false}
                returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed="auto" // true/false/undefined
                fetchDetails={true}
                kapil={this.state.location_txt}
                textInputProps={{
                  onChangeText: (text) => {
                    this.setState({ location_txt: text }, () => {
                      if (this.state.location_txt == "") {
                        Animated.timing(this.state.animated_value_top, {
                          toValue: 1000,
                          duration: 800,
                        }).start();
                      } else if (
                        this.state.isAnimating == false &&
                        this.state.location_txt != "" &&
                        this.state.animated_value_top != 0
                      ) {
                        this.setState(
                          {
                            locationss: true,
                            isAnimating: false,
                            is_show_request_view: false,
                            show_verify_parking_location: false,
                            is_requested_for_home: false,
                          },
                          () => {
                            Animated.timing(this.state.animated_value_top, {
                              toValue: 0,
                              duration: 500,
                            }).start(() => {
                              this.setState({
                                isAnimating: false,
                                locationss: true,
                              });
                            });
                          }
                        );
                      }
                    });
                  },
                }}
                valuse={this.state.locationss}
                stateText={this.state.location_txt}
                renderDescription={(row) => row.description || row.vicinity}
                onPress={(data, details = null) => {
                  let Sub = details.address_components;
                  let address_components = [];
                  let zipcode = [];
                  let country = [];
                  let State = [];
                  let City = [];
                  let compe = address_components.type;
                  this.setState(
                    {
                      location_txt: this.state.searchStr,
                      is_show_request_view: true,
                    },
                    () => {
                      Keyboard.dismiss();
                      Animated.timing(this.state.animated_value_top, {
                        toValue: 1000,
                        duration: 500,
                      }).start();
                    }
                  );

                  let request = {
                    user_id: this.props.user_data.data._id,
                  };

                  let Code = Sub.map(
                    (item, key) => {
                      if (item.types[0] == "postal_code") {
                        zipcode.push(item.long_name);
                      } else if (item.types[0] == "country") {
                        country.push(item.long_name);
                      } else if (
                        item.types[0] == "administrative_area_level_1"
                      ) {
                        State.push(item.long_name);
                      } else if (item.types[0] == "locality") {
                        City.push(item.long_name);
                      }
                    }

                    // address_components.push(key, item.types[0])
                  );

                  console.log(
                    "uteetgvhmb",
                    this.props.user_data.data._id,
                    this.props.user_data.data.user_token,
                    data.description,
                    data.description,
                    City[0],
                    State[0],
                    country[0],
                    zipcode[0],
                    details.geometry.location.lat,
                    details.geometry.location.lng
                  );
                  this.props.saved_location(request);
                  this.props.saved_location_locar_clear_data();
                  this.props.create_Address_clear_data();
                  this.props.create_Address({
                    user_token: this.props.user_data.data.user_token,
                    user_id: this.props.user_data.data._id,
                    line1: data.description,
                    line2: data.description,
                    city: City[0],
                    zipcode: zipcode[0],
                    state: State[0],
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    type: "Home",
                  });
                  this.setState({
                    is_show_request_view: true,
                    show_verify_parking_location: false,
                    is_requested_for_home: true,
                  });
                  this.setState({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    description: data.description,
                  });
                  // 'details' is provided when fetchDetails = true
                  this.setState({
                    Citys: City[0],
                    States: State[0],
                    County: country[0],
                    postal_code: zipcode[0],
                  });

                  console.log(
                    details.geometry.location.lng,
                    details.geometry.location.lat
                    // details.address_components[8].long_name
                  );
                }}
                query={{
                  key: "AIzaSyCOedpgO47qreixnt4dDq-APpFHDbrWC3U",
                  language: "pt_BR",
                  types: ["geocode"],
                }}
                currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI={"GoogleReverseGeocoding"} // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                  key: "",
                  language: "en",
                }}
              />

              {this.state.location_txt != "" ? <Text>.</Text> : null}
            </View>

            {this.state.isScheduleViewShown ? (
              <LocationView
                header={
                  "Service Scheduled - " +
                  moment(
                    this.state.orderData.schedule_date,
                    "DD-MM-YYYY"
                  ).format("MMM Do") +
                  " at " +
                  moment(this.state.orderData.schedule_time, "hh:mm").format(
                    "hA"
                  )
                }
                body={this.state.orderData.addressName}
                containerStyle={{ backgroundColor: "#FFE0CC", height: 66 }}
                innerContainerStyle={{ borderWidth: 0, width: "94%" }}
                on_press_btn={() => {
                  this.props.navigation.navigate("OrderDetails", {
                    isFromCheckout: false,
                    orderData: this.state.orderData,
                  });
                }}
                btn_img={AssetsImages.icon_forward_arrow}
              />
            ) : null}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                width: "100%",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "130%",
                  overflow: "hidden",
                }}
              >
                <MapView
                  // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  mapType={"satellite"}
                  showsUserLocation={true}
                  zoomEnabled={true}
                  zoomControlEnabled={true}
                  initialRegion={{
                    latitude: 28.57966,
                    longitude: 77.32111,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  // onRegionChangeComplete={this.onRegionChange}
                >
                  {/* <Marker coordinate={this.state.marker} /> */}

                  {this.state.latitude === null ? (
                    <Marker
                      coordinate={{ latitude: 28.57966, longitude: 77.32111 }}
                      image={AssetsImages.icon_map_pin}
                    />
                  ) : (
                    <Marker
                      coordinate={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                      }}
                      title={this.state.description}
                      image={AssetsImages.icon_map_pin}
                      description={this.state.description}
                    />
                  )}

                  {/* <Marker
                  coordinate={{ latitude: 28.57966, longitude: 77.32111 }}
                  title={"JavaTpoint"}
                  description={"Java Training Institute"}
                /> */}
                </MapView>

                {
                  // show marker icon
                }
              </View>
              {this.state.is_show_request_view ? (
                <View
                  style={{
                    width: "90%",
                    backgroundColor: "#F3F4F6",
                    position: "absolute",
                    bottom: 1,
                    marginTop: 200,
                    alignSelf: "center",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      height: 50,
                      width: "100%",
                      alignItems: "center",
                      flexDirection: "row",
                      backgroundColor: "#fff",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        width: "50%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        this.setState({ is_requested_for_home: true });
                        this.scroll.scrollTo({ x: 0 });
                      }}
                      activeOpacity={1}
                    >
                      <View
                        style={{
                          height: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#0000",
                          borderBottomWidth: 5,
                          borderBottomColor: this.state.is_requested_for_home
                            ? "#FF6600"
                            : "#0000",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            color: this.state.is_requested_for_home
                              ? "#000"
                              : "#80859F",
                            paddingHorizontal: 8,
                          }}
                        >
                          Home
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View
                      style={{
                        height: "50%",
                        width: 1,
                        backgroundColor: "#bbb",
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        width: "50%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        this.setState({ is_requested_for_home: false });
                        this.scroll.scrollTo({
                          x: (90 / 100) * CONST.DEVICE_WIDTH,
                        });
                      }}
                      activeOpacity={1}
                    >
                      <View
                        style={{
                          height: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#0000",
                          borderBottomWidth: 5,
                          borderBottomColor: this.state.is_requested_for_home
                            ? "#0000"
                            : "#FF6600",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            color: this.state.is_requested_for_home
                              ? "#80859F"
                              : "#000",
                            paddingHorizontal: 8,
                          }}
                        >
                          Work
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <ScrollView
                    pagingEnabled={true}
                    onScroll={this.handleScroll}
                    ref={(node) => (this.scroll = node)}
                    horizontal={true}
                    style={{ flex: 1, marginVertical: 5 }}
                    scrollEnabled={false}
                  >
                    <View style={{ width: (90 / 100) * CONST.DEVICE_WIDTH }}>
                      <PricingView
                        priceTagValue={85}
                        title={"Regular Price"}
                        pricing={"$1.99"}
                      />
                      <PricingView
                        priceTagValue={87}
                        title={"Unleaded Price"}
                        pricing={"$2.19"}
                      />
                      <PricingView
                        priceTagValue={90}
                        title={"REC90 Price"}
                        pricing={"$2.49"}
                      />
                    </View>
                    <View style={{ width: (90 / 100) * CONST.DEVICE_WIDTH }}>
                      <PricingView
                        priceTagValue={85}
                        title={"Regular Price"}
                        pricing={"$1.99"}
                      />
                      <PricingView
                        priceTagValue={85}
                        title={"Unleaded Price"}
                        pricing={"$2.19"}
                      />
                      <PricingView
                        priceTagValue={85}
                        title={"REC90 Price"}
                        pricing={"$2.49"}
                      />
                    </View>
                  </ScrollView>
                  <TxtFullScreenBtn
                    title={
                      this.state.is_requested_for_home
                        ? "REQUEST SERVICE AT HOME"
                        : "REQUEST SERVICE AT WORK"
                    }
                    onPress={() => {
                      this.props.ServiceLocationService({
                        address: this.state.description,
                        zip_code: this.state.postal_code,
                        longitude: this.state.longitude,
                        latitude: this.state.latitude,
                      });

                      // this.setState({
                      //   show_verify_parking_location: true,
                      //   is_show_request_view: false,
                      // });
                      // if(this.state.isSavedVahicleApiSuccess) {
                      // var orderData = {
                      //   user_id: this.props.user_data.data._id,
                      //   latitude: this.state.marker.latitude,
                      //   longitude: this.state.marker.longitude,
                      //   addressName: this.state.location_txt,
                      // };
                      // if (this.props.saved_vehicle_data.data.length == 0) {
                      //   if (this.state.is_requested_for_home) {
                      //     this.props.navigation.navigate("AddVehicle", {
                      //       is_selected_home: true,
                      //       isFrom: "Dashboard",
                      //       orderData: orderData,
                      //     });
                      //   } else {
                      //     this.props.navigation.navigate("AddVehicle", {
                      //       is_selected_home: false,
                      //       isFrom: "Dashboard",
                      //       orderData: orderData,
                      //     });
                      //   }
                      // } else {
                      //   if (this.state.is_requested_for_home) {
                      //     this.props.navigation.navigate("SelectVehicle", {
                      //       is_selected_home: true,
                      //       orderData: orderData,
                      //     });
                      //   } else {
                      //     this.props.navigation.navigate("SelectVehicle", {
                      //       is_selected_home: false,
                      //       orderData: orderData,
                      //     });
                      //   }
                      // }
                      // }
                    }}
                    containerStyle={{
                      backgroundColor: "#FF5C22",
                      width: "100%",
                      borderRadius: 0,
                    }}
                  />
                </View>
              ) : null}
              {this.state.show_verify_parking_location ? (
                <View
                  style={{
                    width: "90%",
                    backgroundColor: "#F3F4F6",
                    position: "absolute",
                    bottom: 15,
                    alignSelf: "center",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      paddingVertical: 20,
                      paddingHorizontal: 30,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Avenir",
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "#000",
                        paddingBottom: 10,
                      }}
                    >
                      Verify parking location
                    </Text>
                    <Text
                      style={{
                        //   fontFamily: "Lato",
                        fontSize: 14,
                        color: "#A8AFC8",
                        width: "80%",
                        lineHeight: 22,
                      }}
                    >
                      Please zoom into your vehicle's parking spot using the map
                      pin {this.props.login_dataaa.data.data[0].zipcode}
                    </Text>
                  </View>

                  <TxtFullScreenBtn
                    title="PARKING LOCATION SET"
                    onPress={() => {
                      // if(this.state.isSavedVahicleApiSuccess) {

                      var orderData = {
                        user_id: this.props.user_data.data._id,
                        latitude: this.state.latitude,

                        longitude: this.state.longitude,
                        addressName: this.state.description,
                      };
                      // console.log(
                      //   "Saved vehicle data",
                      //   JSON.stringify(this.props.saved_vehicle_data)
                      // );
                      // if (this.props.saved_vehicle_data.data?.length == 0) {
                      //   if (this.state.is_requested_for_home) {
                      //     this.props.navigation.navigate("AddVehicle", {
                      //       is_selected_home: true,
                      //       isFrom: "Dashboard",
                      //       orderData: orderData,
                      //     });
                      //   } else {
                      //     this.props.navigation.navigate("AddVehicle", {
                      //       is_selected_home: false,
                      //       isFrom: "Dashboard",
                      //       orderData: orderData,
                      //     });
                      //   }
                      // }
                      // else {
                      if (this.state.is_requested_for_home) {
                        this.props.navigation.navigate("SelectVehicle", {
                          is_selected_home: true,
                          orderData: orderData,
                        });
                      } else {
                        this.props.navigation.navigate("SelectVehicle", {
                          is_selected_home: false,
                          orderData: orderData,
                        });
                      }
                      //}
                      // }
                    }}
                    containerStyle={{
                      backgroundColor: "#FF5C22",
                      width: "100%",
                      borderRadius: 0,
                    }}
                  />
                </View>
              ) : null}
              <Animated.View
                style={{
                  height: "110%",
                  width: "100%",
                  backgroundColor: "#fff",
                  position: "absolute",
                  top: this.state.animated_value_top,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                    borderBottomColor: "rgba(116,122,147,0.1)",
                    borderTopColor: "rgba(116,122,147,0.1)",
                  }}
                >
                  <HeaderTxt
                    title={"Saved Location"}
                    marginTop={12}
                    marginBottom={8}
                  />
                  <FlatList
                    ListEmptyComponent={this._listEmptyComponent()}
                    // onRefresh={this.state.loading}
                    // refreshing={this.state.loading}
                    style={{ width: "89%", alignSelf: "center" }}
                    data={this.props.saved_location_data.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            this.setState(
                              {
                                location_txt: this.state.searchStr,
                                is_show_request_view: true,
                              },
                              () => {
                                Keyboard.dismiss();
                                Animated.timing(this.state.animated_value_top, {
                                  toValue: 1000,
                                  duration: 500,
                                }).start();
                              }
                            );
                            this.setState({
                              location_txt: item.line2,
                              locationss: false,

                              isAnimating: false,

                              latitude: item.latitude,
                              longitude: item.longitude,
                              is_show_request_view: true,
                              show_verify_parking_location: false,
                              is_requested_for_home: true,
                              Citys: item.city,
                              States: item.state,
                              postal_code: item.zip_code,
                            });
                          }}
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 10,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              this.setState(
                                {
                                  location_txt: this.state.searchStr,
                                  is_show_request_view: true,
                                },
                                () => {
                                  Keyboard.dismiss();
                                  Animated.timing(
                                    this.state.animated_value_top,
                                    {
                                      toValue: 1000,
                                      duration: 500,
                                    }
                                  ).start();
                                }
                              );
                              this.setState({
                                location_txt: item.line2,
                                locationss: false,
                                description: item.line1,
                                latitude: item.latitude,
                                longitude: item.longitude,
                                is_show_request_view: true,
                                show_verify_parking_location: false,
                                is_requested_for_home: true,
                                Citys: item.city,
                                States: item.state,
                                postal_code: item.zip_code,
                                isAnimating: false,
                              });
                            }}
                            style={{
                              borderColor: "rgba(116,122,147,0.2)",
                              borderWidth: 1,
                              borderRadius: 5,
                              padding: 5,
                              flexDirection: "row",
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                this.setState(
                                  {
                                    location_txt: this.state.searchStr,
                                    is_show_request_view: true,
                                  },
                                  () => {
                                    Keyboard.dismiss();
                                    Animated.timing(
                                      this.state.animated_value_top,
                                      {
                                        toValue: 1000,
                                        duration: 500,
                                      }
                                    ).start();
                                  }
                                );
                                this.setState({
                                  location_txt: item.line2,
                                  locationss: false,
                                  description: item.line1,
                                  latitude: item.latitude,
                                  longitude: item.longitude,
                                  is_show_request_view: true,
                                  show_verify_parking_location: false,
                                  is_requested_for_home: true,
                                  Citys: item.city,
                                  States: item.state,
                                  postal_code: item.zip_code,
                                  isAnimating: false,
                                });
                              }}
                              style={{
                                flex: 1,

                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={{
                                  marginLeft: 15,
                                  color: "#FF5C22",
                                  fontSize: 12,
                                  fontWeight: "700",
                                }}
                              >
                                {item.type}
                              </Text>
                              <Text
                                style={{
                                  marginLeft: 15,
                                  marginTop: 5,
                                  fontWeight: "500",
                                }}
                              >
                                {item.line2}

                                <Text
                                  style={{
                                    fontWeight: "500",
                                  }}
                                >
                                  {" "}
                                  {item.zipcode}
                                </Text>
                              </Text>
                            </TouchableOpacity>
                            <BtnWithImage
                              img={AssetsImages.icon_cancel}
                              onPress={(index) => {
                                // this.props.delete_Address({
                                //   user_token: this.props.user_data
                                //     .user_auth_token,
                                //   address_id: item._id,
                                // });
                                // let newimagesAddFile = this.props
                                //   .saved_location_data.data;
                                // newimagesAddFile.splice(index, 1); //to remove a single item starting at index
                                // this.setState({
                                //   location_list: newimagesAddFile,
                                // });
                                let request = {
                                  user_id: this.props.user_data.data._id,
                                };
                                this.props.saved_location(request);
                                this.props.saved_location_locar_clear_data();
                                this.props.delete_Address({
                                  user_id: this.props.user_data.data._id,
                                  user_token: this.props.user_data.data
                                    .user_token,
                                  address_id: item._id,
                                });
                                // this.props.delete_Address({
                                //   user_token:
                                //     "b0ad2035046aacb5df5866aa2ba236ee",
                                //   address_id: item._id,
                                // });
                              }}
                              btnImgStyle={{ height: 18, width: 18 }}
                            />
                          </TouchableOpacity>
                        </TouchableOpacity>
                      );
                    }}
                  />
                  {/* {this.state.boat_list.length == 0 &&
       
          !this.state.loading ? (
            <View
              style={{
                flex: 1,
                height: CONST.DEVICE_HEIGHT - 80,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#80859F",
                  width: "90%",
                  fontWeight: "bold",
                  fontFamily: "Avenir",
                  textAlign: "center",
                }}
              >
                You do not have any vehicle added
              </Text>
            </View>
          ) : null} */}
                </View>
              </Animated.View>
            </View>
          </View>
        </View>
      </SafeAreaContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  vehicle_dropdown: (request_data) => dispatch(vehicle_dropdown(request_data)),
  ServiceLocationService: (request_data) =>
    dispatch(ServiceLocationService(request_data)),
  saved_vehicle: (request_data) => dispatch(saved_vehicle(request_data)),
  saved_location: (request_data) => dispatch(saved_location(request_data)),

  saveNotMatched: (request_data) => dispatch(saveNotMatched(request_data)),

  delete_Address: (request_data) => dispatch(delete_Address(request_data)),
  create_Address: (request_data) => dispatch(create_Address(request_data)),

  create_Address_clear_data: (request_data) =>
    dispatch(create_Address_clear_data(request_data)),
  saved_location_locar_clear_data: () =>
    dispatch(saved_location_locar_clear_data()),
  saved_vehicle_clear_data: () => dispatch(saved_vehicle_clear_data()),
  delete_Address_clear_data: () => dispatch(delete_Address_clear_data()),

  create_stripe_account: (request_data) =>
    dispatch(create_stripe_account(request_data)),
  user_profile: (request_data) => dispatch(user_profile(request_data)),
  boat_dropdown: (request_data) => dispatch(boat_dropdown(request_data)),
  card_list: (request_data) => dispatch(card_list(request_data)),
  get_price: (request_data) => dispatch(get_price(request_data)),
  user_login_clear_data: () => dispatch(user_login_clear_data()),

  user_social_login: (request_data) =>
    dispatch(user_social_login(request_data)),
  user_social_login_clear_data: () => dispatch(user_social_login_clear_data()),
});

const mapStateToProps = (state) => ({
  is_success: state.saved_vehicle.is_success,
  is_successs: state.saved_vehicle.is_successs,
  is_fetching: state.saved_vehicle.is_fetching,
  msg: state.saved_vehicle.msg,
  saved_vehicle_data: state.saved_vehicle.saved_vehicle_data,
  saved_vehicle_datas: state.saved_vehicle.saved_vehicle_datas,
  user_data: state.user_auth.user_data,

  is_succes: state.saved_location.is_success,
  is_su: state.saved_location.is_successs,
  is_fetchings: state.saved_location.is_fetching,
  msgs: state.saved_location.msg,
  saved_location_data: state.saved_location.saved_location_data,
  saved_location_datas: state.saved_location.saved_location_data,

  is_successss: state.ServiceLocationService.is_success,
  login_dataaa: state.ServiceLocationService.serviceLocationService_data,
  is_fetchinggg: state.ServiceLocationService.is_fetching,
  errorrr: state.ServiceLocationService.error,

  is_success_saveNotMatched: state.saveNotMatched.is_success,
  login_data_saveNotMatched: state.saveNotMatched.saveNotMatched_data,
  is_fet: state.saveNotMatched.is_fetching,
  err: state.saveNotMatched.error,

  is_success_delete: state.delete_Address.is_success,
  delete_Address_data: state.delete_Address.delete_Address_data,
  is_fetching_delete: state.delete_Address.is_fetching,
  error_delete: state.delete_Address.error,

  is_success_create_address: state.create_Address.is_success,
  login_data_create_address: state.create_Address.create_Address_data,
  is_fetching_create_address: state.create_Address.is_fetching,
  error_create_address: state.create_Address.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
