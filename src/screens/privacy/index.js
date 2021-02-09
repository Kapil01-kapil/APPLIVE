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
import Mixpanel from "react-native-mixpanel";
import { connect } from "react-redux";
import { get_faq, get_faq_clear_data } from "../../redux/actions";
import Loader from "../../components/loader";
import { PROJECT_TOKEN, API_secret } from "../../api/api_config";
import { WebView } from "react-native-webview";
import {
  Freshchat,
  FreshchatConfig,
  FaqOptions,
  ConversationOptions,
  FreshchatUser,
  FreshchatMessage,
  FreshchatNotificationConfig,
} from "react-native-freshchat-sdk";
import HTML from "react-native-render-html";
class Privacy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,
      refresh: true,
      txt_one:
        "EZFill LLC,its subsidiaries, affiliates, and related entities (collectively, “EZFill” or “we”) collects information about you when you use our mobile applications, websites, and other online products and services (collectively, the “Services”) and through other interactions and communications you have with us. EZFill is committed to protecting our visitors’ and members’ privacy. The following Privacy Policy (sometimes referred to herein as “Policy”) outlines the information EZFill may collect and how we may use that information to better serve visitors and members",
      txt_two:
        "We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email address, phone number, postal address, profile picture, payment method including credit card numbers along with expiration date and Security Code, Vehicle make, model, color, type of gasoline, license plate number, delivery notes, order requests and other information you provide.",
    };
  }

  //TODO:- class life cycle
  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: "Privacy",
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
  componentDidUpdate(prevProps) {
    if (this.props.is_fetching !== prevProps.is_fetching) {
      if (this.props.is_fetching) {
        if (!this.state.isApiCalled) {
          this.setState({ loading: true });
        }
      } else if (!this.props.is_fetching) {
        this.setState({ loading: false, isApiCalled: true });
      }
    }

    if (this.props.is_success !== prevProps.is_success) {
      if (this.props.is_success == true) {
        console.log("success => " + JSON.stringify(this.props.get_faq_data));
        this.setState({ get_faq_data: this.props.get_faq_data });
      }
    }
  }

  onFocus = () => {
    let request_get_faq = { page_name: "privacy" };
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
          {/* <Text
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
            {this.props.get_faq_data.desc}
          </Text> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Privacy);
