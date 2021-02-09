//TODO:- imports
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Linking,
  TouchableOpacity,
  FlatList,
} from "react-native";
import styles from "./styles";
import AssetsImages from "../../res";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import { user_data_clear_data } from "../../redux/actions";

// import { StackActions, NavigationActions } from "@react-navigation/native";
//TODO:- Sidemenu class
class Sidemenu extends Component {
  //TODO:- constructor
  constructor(props) {
    super(props);
    this.state = {
      refresh: true,
      sideMenuBtnList: [
        {
          title: "Service",
          isSelected: true,
          index: 0,
        },
        {
          title: "Profile",
          isSelected: false,
          index: 1,
        },
        {
          title: "Order History",
          isSelected: false,
          index: 2,
        },
        {
          title: "Membership",
          isSelected: false,
          index: 3,
        },
        {
          title: "Help",
          isSelected: false,
          index: 4,
        },
      ],
      selected_sub_category: "",
    };
  }

  //TODO:- class life cycle
  componentDidMount() {}

  //TODO:- onPress events
  onPressMenuButtn = (item) => {
    switch (item.title) {
      case "Service":
        // this.props.navigation.navigate("Service");
        this.props.navigation.closeDrawer();
        this.state.sideMenuBtnList.map((item) => {
          if (item.title == "Service") {
            item.isSelected = true;
            this.props.navigation.navigate("Dashboard");
          } else {
            item.isSelected = false;
          }
        });
        break;
      case "Profile":
        // this.props.navigation.navigate("Service");
        this.props.navigation.closeDrawer();
        this.state.sideMenuBtnList.map((item) => {
          if (item.title == "Profile") {
            item.isSelected = true;
            this.props.navigation.navigate("Profile");
            this.setState({ selected_sub_category: "Profile" });
          } else {
            item.isSelected = false;
          }
        });
        break;
      case "Order History":
        // this.props.navigation.navigate("Order History");
        this.props.navigation.closeDrawer();
        this.state.sideMenuBtnList.map((item) => {
          if (item.title == "Order History") {
            item.isSelected = true;
            this.props.navigation.navigate("OrderHistory");
          } else {
            item.isSelected = false;
          }
        });
        break;
      case "Membership":
        // this.props.navigation.navigate("Membership");
        this.props.navigation.closeDrawer();
        this.state.sideMenuBtnList.map((item) => {
          if (item.title == "Membership") {
            item.isSelected = true;
            this.props.navigation.navigate("Membership",{getmembership:false});
          } else {
            item.isSelected = false;
          }
        });
        break;

      default:
        console.log("hello");
    }
  };
  emailcall = () => {
    Linking.openURL(
      "mailto:support@ezfillapp.com?subject=SendMail&body=Description"
    );
  };
  dialCall = () => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = "tel:${305-791-1169}";
    } else {
      phoneNumber = "telprompt:${305-791-1169}";
    }

    Linking.openURL(phoneNumber);
  };
  //TODO:- render event
  render() {
    return (
      <LinearGradient colors={["#FF881C", "#FB5E2D"]} style={{ flex: 1 }}>
        <SafeAreaView style={styles.main_container}>
          <View style={styles.container}>
            <TouchableOpacity
              style={{
                height: 25,
                width: 25,
                backgroundColor: "#00000000",
                marginTop: 16,
                flexDirection: "row",
                marginLeft: 20,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 6,
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowColor: "rgba(0,0,0,0.8)",
                shadowOpacity: 0.2,
                shadowRadius: 20,
              }}
              onPress={() => {
                this.props.navigation.closeDrawer();
              }}
            >
              <Image
                source={AssetsImages.icon_close}
                style={{ height: 25, width: 25, resizeMode: "contain" }}
              />
            </TouchableOpacity>

            <FlatList
              style={styles.flatlist}
              showsVerticalScrollIndicator={false}
              data={this.state.sideMenuBtnList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                return item.title == "Profile" || item.title == "Help" ? (
                  <View>
                    {item.title == "Profile" ? (
                      <View>
                        {/* <Text style={[styles.flatlist_txt, { color: item.isSelected == true ? "#fff" : "rgba(255,255,255,0.7)" }]}> {item.title} </Text> */}
                        <TouchableOpacity
                          style={styles.flatlist_btn}
                          onPress={this.onPressMenuButtn.bind(this, item)}
                        >
                          <Text
                            style={[
                              styles.flatlist_txt,
                              {
                                color:
                                  item.isSelected == true &&
                                  this.state.selected_sub_category == "Profile"
                                    ? "#fff"
                                    : "#fff",
                              },
                            ]}
                          >
                            {" "}
                            {item.title}{" "}
                          </Text>
                        </TouchableOpacity>
                        <View style={{ width: "85%", alignSelf: "flex-end" }}>
                          <TouchableOpacity
                            style={styles.flatlist_btn}
                            onPress={() => {
                              this.props.navigation.closeDrawer();
                              this.state.sideMenuBtnList.map((item) => {
                                if (item.title == "Profile") {
                                  item.isSelected = true;
                                  this.setState({
                                    selected_sub_category: "Addresses",
                                  });
                                  this.props.navigation.navigate("Locations");
                                } else {
                                  item.isSelected = false;
                                }
                              });
                            }}
                          >
                            <Text
                              style={[
                                styles.flatlist_sub_txt,
                                {
                                  color:
                                    item.isSelected == true &&
                                    this.state.selected_sub_category ==
                                      "Addresses"
                                      ? "#fff"
                                      : "rgba(255,255,255,0.7)",
                                },
                              ]}
                            >
                              Addresses
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.flatlist_btn}
                            onPress={() => {
                              this.props.navigation.closeDrawer();
                              this.state.sideMenuBtnList.map((item) => {
                                if (item.title == "Profile") {
                                  item.isSelected = true;
                                  this.setState({
                                    selected_sub_category: "Vehicles",
                                  });
                                  this.props.navigation.navigate("Vehicles");
                                } else {
                                  item.isSelected = false;
                                }
                              });
                            }}
                          >
                            <Text
                              style={[
                                styles.flatlist_sub_txt,
                                {
                                  color:
                                    item.isSelected == true &&
                                    this.state.selected_sub_category ==
                                      "Vehicles"
                                      ? "#fff"
                                      : "rgba(255,255,255,0.7)",
                                },
                              ]}
                            >
                              Vehicles
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.flatlist_btn}
                            onPress={() => {
                              this.props.navigation.closeDrawer();
                              this.state.sideMenuBtnList.map((item) => {
                                if (item.title == "Profile") {
                                  item.isSelected = true;
                                  this.setState({
                                    selected_sub_category: "Payment Method",
                                  });
                                  //this.props.navigation.navigate("Payments");
                                  this.props.navigation.navigate("Payment",{isFromMembership:false,isFromAddVehicle: false,orderData: "",is_selected_home: ""});
                                  // this.props.navigation.navigate("SelectPayment", {isFromAddVehicle: true});
                                } else {
                                  item.isSelected = false;
                                }
                              });
                            }}
                          >
                            <Text
                              style={[
                                styles.flatlist_sub_txt,
                                {
                                  color:
                                    item.isSelected == true &&
                                    this.state.selected_sub_category ==
                                      "Payment Method"
                                      ? "#fff"
                                      : "rgba(255,255,255,0.7)",
                                },
                              ]}
                            >
                              Payment Method
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <View>
                        <Text
                          style={[
                            styles.flatlist_txt,
                            {
                              color: item.isSelected == true ? "#fff" : "#fff",
                            },
                          ]}
                        >
                          {" "}
                          {item.title}{" "}
                        </Text>
                        <View style={{ width: "85%", alignSelf: "flex-end" }}>
                          <TouchableOpacity
                            style={styles.flatlist_btn}
                            onPress={() => {
                              this.props.navigation.closeDrawer();
                              this.state.sideMenuBtnList.map((item) => {
                                if (item.title == "Help") {
                                  item.isSelected = true;
                                  this.setState({
                                    selected_sub_category: "FAQ",
                                  });
                                  this.props.navigation.navigate("FAQ");
                                } else {
                                  item.isSelected = false;
                                }
                              });
                            }}
                          >
                            <Text
                              style={[
                                styles.flatlist_sub_txt,
                                {
                                  color:
                                    item.isSelected == true &&
                                    this.state.selected_sub_category == "FAQ"
                                      ? "#fff"
                                      : "rgba(255,255,255,0.7)",
                                },
                              ]}
                            >
                              FAQ
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.flatlist_btn}
                            onPress={() => {
                              this.props.navigation.closeDrawer();
                              this.state.sideMenuBtnList.map((item) => {
                                if (item.title == "Help") {
                                  item.isSelected = true;
                                  this.setState({
                                    selected_sub_category: "Terms of Service",
                                  });
                                  this.props.navigation.navigate("Terms");
                                } else {
                                  item.isSelected = false;
                                }
                              });
                            }}
                          >
                            <Text
                              style={[
                                styles.flatlist_sub_txt,
                                {
                                  color:
                                    item.isSelected == true &&
                                    this.state.selected_sub_category ==
                                      "Terms of Service"
                                      ? "#fff"
                                      : "rgba(255,255,255,0.7)",
                                },
                              ]}
                            >
                              Terms of Service
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.flatlist_btn}
                            onPress={() => {
                              this.props.navigation.closeDrawer();
                              this.state.sideMenuBtnList.map((item) => {
                                if (item.title == "Help") {
                                  item.isSelected = true;
                                  this.setState({
                                    selected_sub_category: "Privacy",
                                  });
                                  this.props.navigation.navigate("Privacy");
                                } else {
                                  item.isSelected = false;
                                }
                              });
                            }}
                          >
                            <Text
                              style={[
                                styles.flatlist_sub_txt,
                                {
                                  color:
                                    item.isSelected == true &&
                                    this.state.selected_sub_category ==
                                      "Privacy"
                                      ? "#fff"
                                      : "rgba(255,255,255,0.7)",
                                },
                              ]}
                            >
                              Privacy
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.flatlist_btn}
                            onPress={() => {
                              this.props.navigation.closeDrawer();
                              this.state.sideMenuBtnList.map((item) => {
                                if (item.title == "Help") {
                                  item.isSelected = true;
                                  this.setState({
                                    selected_sub_category: "305-791-1169",
                                  });
                                  this.dialCall();
                                } else {
                                  item.isSelected = false;
                                }
                              });
                            }}
                          >
                            <Text
                              style={[
                                styles.flatlist_sub_txt,
                                {
                                  color:
                                    item.isSelected == true &&
                                    this.state.selected_sub_category ==
                                      "305-791-1169"
                                      ? "#fff"
                                      : "rgba(255,255,255,0.7)",
                                },
                              ]}
                            >
                              305-791-1169
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.flatlist_btn}
                            onPress={() => {
                              this.props.navigation.closeDrawer();
                              this.state.sideMenuBtnList.map((item) => {
                                if (item.title == "Help") {
                                  item.isSelected = true;
                                  this.setState({
                                    selected_sub_category:
                                      "support@ezfillapp.com",
                                  });
                                  this.emailcall();
                                } else {
                                  item.isSelected = false;
                                }
                              });
                            }}
                          >
                            <Text
                              style={[
                                styles.flatlist_sub_txt,
                                {
                                  color:
                                    item.isSelected == true &&
                                    this.state.selected_sub_category ==
                                      "support@ezfillapp.com"
                                      ? "#fff"
                                      : "rgba(255,255,255,0.7)",
                                },
                              ]}
                            >
                              support@ezfillapp.com
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.flatlist_btn}
                    onPress={this.onPressMenuButtn.bind(this, item)}
                  >
                    <Text
                      style={[
                        styles.flatlist_txt,
                        { color: item.isSelected == true ? "#fff" : "#fff" },
                      ]}
                    >
                      {" "}
                      {item.title}{" "}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />

            <TouchableOpacity
              style={{
                height: 50,
                marginLeft: 25,
                width: "30%",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
              onPress={() => {
                this.props.user_data_clear_data();
                this.props.navigation.reset({
                  index: 1,
                  routes: [
                    {
                      name: "Login",
                      state: {
                        routes: [{ name: "Login" }],
                      },
                    },
                  ],
                });
              }}
            >
              <Text style={{ color: "#fff", fontSize: 15 }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  user_data_clear_data: () => dispatch(user_data_clear_data()),
});

export default connect(null, mapDispatchToProps)(Sidemenu);
