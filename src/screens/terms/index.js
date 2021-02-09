import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  TextInput,
  TouchableOpacity,
  Animated,
  Keyboard,
  ScrollView,
} from "react-native";
import BtnWithImage from "../../components/btn_with_image";
import AssetsImages from "../../res";
import SafeAreaContainer from "../../components/safearea_container";
import styles from "./styles";
import HeaderTxt from "../../components/header_txt";
import HTML from "react-native-render-html";
import { connect } from "react-redux";
import {
  FreshChat_APP_ID,
  FreshChat_APP_KEY,
  PROJECT_TOKEN,
  API_secret,
} from "../../api/api_config";
import Mixpanel from "react-native-mixpanel";
import {
  Freshchat,
  FreshchatConfig,
  FaqOptions,
  ConversationOptions,
  FreshchatUser,
  FreshchatMessage,
  FreshchatNotificationConfig,
} from "react-native-freshchat-sdk";
import { get_faq, get_faq_clear_data } from "../../redux/actions";
import Loader from "../../components/loader";
class Terms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,
      refresh: true,
      title: "Terms & Conditions",
      desc:
        "These Terms of Use (“Terms”) govern your access or use of applications, websites, content, products, and services (the “Services”) made available by EZFill LLC,its subsidiaries, affiliates, and related entities (collectively, “EZFill”). Please read the following Terms of Use carefully before accessing and/or using the Services.",
      // txt_two:
      //   "Your access and use of the Services constitutes your agreement to be bound by these Terms, which establishes a legally binding agreement between you and EZFill. If you do not agree to these Terms, you may not access or use the Services.EZFill reserves the right, in our sole and absolute discretion, at any time, for any reason whatsoever, with or without notice, to terminate, suspend, amend, or modify the Services and/or the Terms related to the Services, which will be effective upon the posting of such updated Terms by EZFilll on the EZFill website located at “www.ezfillapp.com” (the “Website”). Your continued access or use of the Services after such posting constitutes your consent to be bound by the Terms, as amended.  EZFillmay immediately terminate these Terms or any Services with respect to you, or generally cease offering or deny access to the Services or any portion thereof, at any time for any reason.EZFill’s collection and use of personal information in connection with the Services is as provided in the Privacy Policy located at www.ezfillapp.com/privacypolicy.In these Terms, the words “including” and “include” mean “including, but not limited to.”",
    };
  }

  //TODO:- class life cycle
  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: "Terms",
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
            // this.props.navigation.openDrawer();
          }}
          btnStyle={{ marginRight: 8 }}
        />
      ),
    });
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.onFocus();
    });
  }

  onFocus = () => {
    let request_get_faq = { page_name: "terms" };
    this.props.get_faq(request_get_faq);
  };

  componentWillUnmount() {
    this._unsubscribe();
  }
  onPressExpBtn = (itemData) => {
    // this.state.faq_data[itemData.index].is_expanded = !this.state.faq_data[itemData.index].is_expanded
    this.state.get_faq_data.map((item, index) => {
      if (index == itemData.index) {
        item.is_expanded = !item.is_expanded;
      } else {
        item.is_expanded = false;
      }
    });
    this.setState({ refresh: !this.state.refresh });
  };
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
        <ScrollView style={styles.container}>
          <View style={{ width: "80%", marginLeft: 25 }}>
            {/* <Text
              style={{
                marginTop: 10,
                fontSize: 15,
                color: "#000",
                width: "80%",

                fontWeight: "bold",
                fontFamily: "Avenir",
              }}
            >
              {this.props.get_faq_data.title}
            </Text> */}

            <HTML
              source={{ html: this.props.get_faq_data.desc }}
              imagesMaxWidth={Dimensions.get("window").width}
            />
          </View>
        </ScrollView>
      </SafeAreaContainer>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  get_faq: (request_data) => dispatch(get_faq(request_data)),
});

const mapStateToProps = (state) => ({
  is_success: state.get_faq.is_success,
  is_fetching: state.get_faq.is_fetching,
  msg: state.get_faq.msg,

  get_faq_data: state.get_faq.get_faq_data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Terms);
