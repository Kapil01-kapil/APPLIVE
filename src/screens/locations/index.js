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
import BtnWithImage from "../../components/btn_with_image";
import AssetsImages from "../../res";
import SafeAreaContainer from "../../components/safearea_container";
import styles from "./styles";
import HeaderTxt from "../../components/header_txt";
import LocationView from "../../components/location_view";
import { connect } from "react-redux";
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
import Mixpanel from "react-native-mixpanel";
import Loader from "../../components/loader";
import {
  delete_Address,
  user_login_clear_data,
  delete_Address_clear_data,
  saved_location,
  saved_location_locar_clear_data,
} from "../../redux/actions";
class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,

      isContainingTwoBtn: true,
      firstBtnTitle: "REMOVE",
      secondBtnTitle: "NO THANKS",

      loading: false,

      is_show_request_view: false,
      is_requested_for_home: true,
      show_verify_parking_location: false,

      latitude: null,
      longitude: null,

      isScheduleViewShown: false,
      isSavedVahicleApiSuccess: false,
      onPressFirstBtn: "",
      orderData: {},
      isApiCalled: false,
      location_list: [
        {
          title: "Home",
          location: "1531 Northeast 39th Street",
        },
        {
          title: "Work",
          location: "1531 Northeast 39th Street",
        },
        {
          title: "Home",
          location: "1531 Northeast 39th Street",
        },
      ],
    };
  }

  //TODO:- class life cycle
  componentDidMount() {
    Mixpanel.sharedInstanceWithToken(PROJECT_TOKEN, false, true, true, null);
    this.props.navigation.setOptions({
      headerTitle: "Locations",
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
    let request_saved_vehicle = {
      user_id:
        this.props && this.props.user_data && this.props.user_data.data._id,
    };
    this.props.saved_location(request_saved_vehicle);
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.onFocus();
    });
  }
  onFocus = () => {
    console.log("ON focus....");
    let request = {
      user_id:
        this.props && this.props.user_data && this.props.user_data.data._id,
    };
    this.props.saved_location(request);
  };
  componentWillUnmount() {
    this._unsubscribe();
  }
  componentDidUpdate(prevProps) {
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
    if (this.props.is_fet_delete !== prevProps.is_fet_delete) {
      if (this.props.is_fet_delete) {
        if (!this.state.isApiCalled) {
          this.setState({ loading: true });
        }
      } else if (!this.props.is_fet_delete) {
        this.setState({ loading: false, isApiCalled: true });
      }
    }
    if (this.props.is_fetchings !== prevProps.is_fetchings) {
      if (this.props.is_fetchings) {
        if (!this.state.isApiCalled) {
          this.setState({ loading: true });
        }
      } else if (!this.props.is_fetching) {
        this.setState({ loading: false, isApiCalled: true });
      }
    }
    if (this.props.is_succe_delete !== prevProps.is_succe_delete) {
      if (this.props.is_succe_delete) {
        this.setState({ isSavedVahicleApiSuccess: true });
        this.props.delete_Address_clear_data();
      }
    }
    if (this.props.is_fetchings !== prevProps.is_fetchings) {
      if (this.props.is_fetchings) {
        if (!this.state.isApiCalled) {
          this.setState({ loading: true });
        }
      } else if (!this.props._delete) {
        this.setState({ loading: false, isApiCalled: true });

        //  () => {
        // if (this.props.is_succes !== prevProps.is_succes) {
        //   if (this.props.is_succes) {
        //     this.props.saved_location_locar_clear_data();
        //   }
        // }
      }
    }
    if (this.props.is_succe_delete !== prevProps.is_succe_delete) {
      console.log("is_succe_delete", this.props.is_succe_delete);
      if (this.props.is_succe_delete == true) {
        console.log("DATA====>", this.props.delete_Address_clear_data);
        let request = {
          user_id:
            this.props && this.props.user_data && this.props.user_data.data._id,
        };
        this.props.saved_location(request);

        this.props.delete_Address_clear_data();
        this.props.saved_location_locar_clear_data();
      }
    }

    if (this.props.is_fet_delete !== prevProps.is_fet_delete) {
      if (this.props.is_fet_delete) {
        this.setState({ loading: true });
      } else if (!this.props.is_fet_delete) {
        this.setState({ loading: false }, () => {
          if (this.props.is_succe_delete !== prevProps.is_succe_delete) {
            if (this.props.is_succe_delete) {
              let request = {
                user_id:
                  this.props &&
                  this.props.user_data &&
                  this.props.user_data.data._id,
              };
              this.props.saved_location(request);
              console.log("DATAhtdjjgkhlkjk");
              this.props.delete_Address_clear_data();
              this.props.saved_location_locar_clear_data();
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
            fontSize: 14,
            color: "#80859F",
            width: "90%",
            fontWeight: "bold",
            fontFamily: "Avenir",
            textAlign: "center",
          }}
        >
          You do not have any saved locations
        </Text>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaContainer
        title={this.state.title}
        bodyTxt={this.state.bodyTxt}
        isModalOpened={this.state.isPopUpOpened}
        onDismiss={() => {
          // this.deleteHandler(this.props.user_data.data.user_token, item._id);
          this.setState({ isPopUpOpened: false });
        }}
        isContainingTwoBtn={this.state.isContainingTwoBtn}
        firstBtnTitle={this.state.firstBtnTitle}
        onPressFirstBtn={() => {
          this.setState({ isPopUpOpened: false });
          let request = {
            user_id:
              this.props &&
              this.props.user_data &&
              this.props.user_data.data._id,
          };
          this.props.saved_location(request);

          console.log(
            "id==>",
            this.state.onPressFirstBtn,
            this.props.user_data.data.user_token
          );
          this.props.delete_Address({
            user_id:
              this.props &&
              this.props.user_data &&
              this.props.user_data.data._id,
            user_token:
              this.props &&
              this.props.user_data &&
              this.props.user_data.data.user_token,
            address_id: this.state.onPressFirstBtn,
          });
          // address_components.push(key, item.types[0])
        }}
        secondBtnTitle={this.state.secondBtnTitle}
        onPressSecondBtn={() => {
          this.setState({ isPopUpOpened: false });
        }}
      >
        <Loader loading={this.state.loading} />
        <View style={styles.container}>
          <HeaderTxt title={"Saved Locations"} marginTop={30} />

          <FlatList
            style={{ width: "100%", marginTop: 5 }}
            ListEmptyComponent={this._listEmptyComponent()}
            // onRefresh={this.state.loading}
            //refreshing={this.state.loading}
            style={{ width: "89%", alignSelf: "center" }}
            data={this.props.saved_location_data.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <LocationView
                  header={item.type}
                  body={item.line2}
                  on_press_btn={() => {
                    this.setState({
                      isPopUpOpened: true,
                      title: "Remove Location",
                      onPressFirstBtn: item._id,
                      bodyTxt:
                        "You are about to remove this location from your service profile.",
                    });
                  }}
                  btn_img={AssetsImages.icon_remove}
                />
              );
            }}
          />
        </View>
      </SafeAreaContainer>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  saved_location: (request_data) => dispatch(saved_location(request_data)),
  saved_location_locar_clear_data: () =>
    dispatch(saved_location_locar_clear_data()),
  delete_Address: (request_data) => dispatch(delete_Address(request_data)),

  user_login_clear_data: () => dispatch(user_login_clear_data()),
  delete_Address_clear_data: () => dispatch(delete_Address_clear_data()),
});

const mapStateToProps = (state) => ({
  is_succes: state.saved_location.is_success,
  is_su: state.saved_location.is_successs,
  is_fetchings: state.saved_location.is_fetching,
  msgs: state.saved_location.msg,
  saved_location_data: state.saved_location.saved_location_data,
  saved_location_datas: state.saved_location.saved_location_data,
  user_data: state.user_auth.user_data,

  is_succe_delete: state.delete_Address.is_success,
  delete_Address_data: state.delete_Address.delete_Address_data,
  is_fet_delete: state.delete_Address.is_fetching,
  err_delete: state.delete_Address.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
