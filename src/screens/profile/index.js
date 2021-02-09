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
import TxtFullScreenBtn from "../../components/txt_full_screen_btn";
import HeaderTxt from "../../components/header_txt";
import Loader from "../../components/loader";
import { connect } from "react-redux";
import Color from "../../constants/Colors";
import { user_profile, update_user_profile } from "../../redux/actions";
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
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,
      id: "",
      is_btn_disabled: false,
      name: "",
      call: "",
      email: "",
      loading: false,
    };
  }

  //TODO:- class life cycle
  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: "Profile",
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

    this.setState({
      name:
        this.props && this.props.user_data && this.props.user_data.data.name,
      email:
        this.props && this.props.user_data && this.props.user_data.data.email,
      call:
        this.props && this.props.user_data && this.props.user_data.data.phone,
      id: this.props && this.props.user_data && this.props.user_data.data._id,
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

    if (this.props.is_success !== prevProps.is_success) {
      console.log("prevProps => " + prevProps.is_success);
      console.log("this.props => " + this.props.is_success);

      if (this.props.is_success) {
        // this.props.navigation.navigate("SignupVerifyNo", {cell_no: this.state.cell_no});
      }
    }
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
                borderColor: "rgba(116,122,147,0.5)",
                borderWidth: 1,
                paddingLeft: 10,
                fontSize: 16,
                color: "#000",
              }}
              placeholder=""
              placeholderTextColor={"rgba(0,0,0,0.4)"}
              value={this.state.name}
              onChangeText={(text) => {
                this.setState({ name: text });
              }}
              // onBlur={() => {
              //     this.validation()
              // }}
              onPressSubmit={() => {}}
            />
          </View>

          <HeaderTxt title={"Cell"} marginTop={16} />
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
                borderColor: "rgba(116,122,147,0.5)",
                borderWidth: 1,
                paddingLeft: 10,
                fontSize: 16,
                // color: "#000",
              }}
              editable={false}
              keyboardType={Platform.OS === "ios" ? "numeric" : "number-pad"}
              returnKeyType={Platform.OS === "ios" ? "done" : "next"}
              placeholder=""
              placeholderTextColor={"rgba(0,0,0,0.4)"}
              value={this.state.call}
              onChangeText={(text) => {
                this.setState({ call: text });
              }}
              // onBlur={() => {
              //     this.validation()
              // }}
              onPressSubmit={() => {}}
            />
          </View>

          <HeaderTxt title={"Email"} marginTop={16} />
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
                borderColor: "rgba(116,122,147,0.5)",
                borderWidth: 1,
                paddingLeft: 10,
                fontSize: 16,
                // color: Color.InputText,
              }}
              editable={false}
              placeholder=""
              placeholderTextColor={"rgba(0,0,0,0.4)"}
              value={this.state.email}
              onChangeText={(text) => {
                this.setState({ email: text });
              }}
              // onBlur={() => {
              //     this.validation()
              // }}
              onPressSubmit={() => {}}
            />
          </View>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={{
              height: 35,
              width: "40%",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
            onPress={() => {
              this.props.navigation.navigate("ProfileChangePassword");
            }}
          >
            <Text
              style={{
                color: "#000",
                fontSize: 14,
                fontWeight: "bold",
                fontFamily: "Avenir",
              }}
            >
              Change Password
            </Text>
          </TouchableOpacity>

          <TxtFullScreenBtn
            title={"SAVE CHANGES"}
            onPress={() => {
              let request = {
                name: this.state.name,
                user_id: this.state.id,
                phone: this.state.call,
              };
              this.props.update_user_profile(request);
            }}
            // disabled={this.state.is_btn_disabled || !this.state.is_error_msg_shown ? true : false}
            containerStyle={{
              backgroundColor: "#FF5C22",
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
  update_user_profile: (request_data) =>
    dispatch(update_user_profile(request_data)),
});

const mapStateToProps = (state) => ({
  user_data: state.user_auth.user_data,

  //  is_success: state.update_user_profile.is_success,
  // user_data: state.update_user_profile.update_user_profile,
  // is_fetching: state.update_user_profile.is_fetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
