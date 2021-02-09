import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Animated,
  Keyboard,
} from "react-native";
import Accordian from "../../components/Accordian";
import BtnWithImage from "../../components/btn_with_image";
import AssetsImages from "../../res";
import SafeAreaContainer from "../../components/safearea_container";
import styles from "./styles";
import { connect } from "react-redux";
import { get_faq, get_faq_clear_data } from "../../redux/actions";
import {
  Freshchat,
  FreshchatConfig,
  FaqOptions,
  ConversationOptions,
  FreshchatUser,
  FreshchatMessage,
  FreshchatNotificationConfig,
} from "react-native-freshchat-sdk";
class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,
      get_faq_data: [
        {
          title: "What is EzFill?",
          body:
            "EzFill is an “on-demand” fuel delivery service that will come and fill up your vehicle with gas while at home, work or play. We make it simple, safe and convenient while saving you time and money. You will never have to stop for gas again!",
          is_expanded: false,
          index: 0,
        },
      ],
      refresh: true,
    };
  }

  //TODO:- class life cycle
  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: "FAQ",
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

    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.onFocus();
    });
  }

  onFocus = () => {
    let request_get_faq = { page_name: "faq" };
    this.props.get_faq(request_get_faq);
  };

  componentWillUnmount() {
    this._unsubscribe();
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
        console.log(
          "success => " + JSON.stringify(this.props.get_faq_data.data)
        );
        this.setState({ get_faq_data: this.props.get_faq_data.data });
      }
    }
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
    const { refresh } = this.state;
    return (
      <SafeAreaContainer
        title={this.state.title}
        bodyTxt={this.state.bodyTxt}
        isModalOpened={this.state.isPopUpOpened}
        onDismiss={() => {
          this.setState({ isPopUpOpened: false });
        }}
      >
        <FlatList
          style={{ width: "100%", height: "90%", marginTop: 15 }}
          data={this.state.get_faq_data}
          keyExtractor={(item, index) => index.toString()}
          extraData={refresh}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <Accordian title={item.title} data={item.body} />
              </View>
            );
          }}
        />
      </SafeAreaContainer>
    );
  }

  renderAccordians = () => {
    const items = [];
    for (item of this.state.get_faq_data) {
      items.push();
    }
    return items;
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(Faq);
