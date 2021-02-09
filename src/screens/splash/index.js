//TODO:- imports
import React, { Component } from "react";
import { StatusBar, View, Text, Image } from "react-native";
import styles from "./styles";
import AssetsImages from "../../res";
import { connect } from "react-redux";
import helper from "../../utils/helper";

//TODO:- splash class
class Splash extends Component {
  //TODO:- constructor
  constructor(props) {
    super(props);
    this.state = {};
  }

  //TODO:- class life cycle
  componentDidMount() {
    console.disableYellowBox = true;
    var that = this;
    console.log(JSON.stringify(that.props.user_data));
    if (helper.isEmptyObject(that.props.user_data)) {
      setTimeout(function () {
        that.getInitialRoot("Onboarding");
      }, 3000);
    } else {
      setTimeout(function () {
        that.redirectToDashboard();
      }, 3000);
    }
  }

  //TODO:- Other Functions
  getInitialRoot = (screen_to_load) => {
    setTimeout(() => {
      this.props.navigation.navigate(screen_to_load);
    }, 200);
  };

  redirectToDashboard = () => {
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
  };

  //TODO:- render event
  render() {
    return (
      <View style={styles.main_container}>
        <StatusBar
          //backgroundColor="#fff"
          barStyle="dark-content"
        />
        <View style={styles.container}>
          {/* <Text style={styles.txt_style}> Adreelz </Text> */}
          <Image
            source={AssetsImages.app_logo}
            style={{ width: "30%", resizeMode: "contain" }}
          />
        </View>
      </View>
    );
  }
}

// const mapDispatchToProps = dispatch => ({

//     saved_vehicle: (request_data) => dispatch(saved_vehicle(request_data)),
//     saved_vehicle_clear_data: () => dispatch(saved_vehicle_clear_data()),

// });

const mapStateToProps = (state) => ({
  user_data: state.user_auth.user_data,
});

export default connect(mapStateToProps, null)(Splash);
