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
  ScrollView,
} from "react-native";
import BtnWithImage from "../../components/btn_with_image";
import AssetsImages from "../../res";
import SafeAreaContainer from "../../components/safearea_container";
import styles from "./styles";
import TxtFullScreenBtn from "../../components/txt_full_screen_btn";
import HeaderTxt from "../../components/header_txt";
import SelectInput from "react-native-select-input-ios";
import BtnWithTxtAndImage from "../../components/btn_with_txt_and_image";
import { connect } from "react-redux";
import { saved_vehicle, saved_vehicle_clear_data } from "../../redux/actions";
import Loader from "../../components/loader";
import helper from "../../utils/helper";

class SelectVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,

      is_selected_home: true,
      is_btn_disabled: true,
      is_boat_seleted: false,
      options: [
        { value: 0, label: "0" },
        { value: 1, label: "1" },
      ],

      automobiles_list: [],
      boat_list: [],

      refresh_boat_list: true,
      refresh_automobiles_list: true,

      loading: false,
      selectedVehicle: [],
      orderData: {},
    };
  }

  //TODO:- class life cycle
  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: "Vehicle",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 26,
        fontFamily: "Avenir",
        alignSelf: 'center' 

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
            // this.props.navigation.openDrawer();
          }}
          btnStyle={{ marginRight: 8 }}
        />
      ),
    });

    // console.log("prevProps => " + JSON.stringify(this.props.route.params))
    this.setState({
      is_selected_home: this.props.route.params.is_selected_home,
      orderData: this.props.route.params.orderData,
    });
    let request = { user_id: this.props.user_data.data._id };
    this.props.saved_vehicle(request);

    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.onFocus();
    });
  }

  onFocus = () => {
    this.fetchData();
    this.setState({ is_btn_disabled: true });
  };

  handleSelectVehicle = (vehicle) => {
    // console.log(vehicle);
    // User can select either Auto or boat
    if (vehicle.isSelected === false) {
      let selectedVehicles = [];
      const selectedCount = this.state.selectedVehicle.length;
      // non selected..
      if (selectedCount < 1) {
        this.setState({
          selectedVehicle: [vehicle],
        });
      } else {
        const lastSelected = this.state.selectedVehicle[selectedCount - 1];
        if (vehicle.type !== lastSelected?.type) {
          //Selecting diff type, clear last selections
          if (vehicle.type === "auto") {
            const boat_list = this.state.boat_list.map((item) => ({
              ...item,
              isSelected: false,
            }));
            this.setState({ boat_list });
          } else {
            const automobiles_list = this.state.automobiles_list.map(
              (item) => ({ ...item, isSelected: false })
            );
            this.setState({ automobiles_list });
          }

          this.setState({
            selectedVehicle: [vehicle],
          });
        } else {
          this.setState((prevState) => ({
            ...prevState,
            selectedVehicle: [...prevState.selectedVehicle, vehicle],
          }));
        }
      }
    } else {
      this.setState((prevState) => ({
        ...prevState,
        selectedVehicle: prevState.selectedVehicle.filter(
          (v) => v._id != vehicle._id
        ),
      }));
    }
  };

  componentDidUpdate(prevProps) {
    // console.log("prevProps => " + JSON.stringify(prevProps) + "   ======  " + this.props.msg)

    if (this.props.is_fetching !== prevProps.is_fetching) {
      if (this.props.is_fetching) {
        if (this.props.saved_vehicle_data?.data?.length == 0) {
          this.setState({ loading: true });
        }
      } else if (!this.props.is_fetching) {
        this.setState({ loading: false });
      }
    }

    if (this.props.is_success !== prevProps.is_success) {
      // console.log("prevProps => " + prevProps.is_success);
      // console.log("this.props => " + this.props.is_success);

      if (this.props.is_success) {
        // console.log("DATA => " + JSON.stringify(this.props.saved_vehicle_data));

        this.fetchData();
        this.props.saved_vehicle_clear_data();
      }
    }
  }

  fetchData = () => {
    if (!helper.isEmptyObject(this.props.saved_vehicle_data)) {
      if (this.props.saved_vehicle_data?.data?.length != 0) {
        var automobiles_list_data = [];
        var boat_list = [];
        this.props.saved_vehicle_data?.data?.map((item, index) => {
          if (item.type == "auto") {
            item.isSelected = false;
            automobiles_list_data.push(item);
          } else {
            item.isSelected = false;
            boat_list.push(item);
          }
        });
        this.setState({
          automobiles_list: automobiles_list_data,
          boat_list: boat_list,
        });
      }
      this.setState(
        {
          refresh_automobiles_list: !this.state.refresh_automobiles_list,
          refresh_boat_list: !this.state.refresh_boat_list,
        },
        () => {}
      );
    }
  };

  headerView = () => {
    return (
      <View style={{ width: "100%" }}>
        <HeaderTxt title={"Select Vehicles"} marginTop={16} />
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
          this.setState({ isPopUpOpened: false });
        }}
      >
        <View style={styles.container}>
          <Loader loading={this.state.loading} />
          <ScrollView style={{ flex: 1 }}>
            {this.state.is_selected_home ? (
              <View>
                <HeaderTxt title={"Vehicle Type"} marginTop={30} />
                <View
                  style={{
                    flexDirection: "row",
                    width: "86%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    alignSelf: "center",
                    marginTop: 8,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: 100,
                      width: "48%",
                      alignItems: "center",
                      justifyContent: "center",
                      borderColor: !this.state.is_boat_seleted
                        ? "#FF5C22"
                        : "#D1D2D4",
                      borderWidth: 1,
                      borderRadius: 5,
                      backgroundColor: !this.state.is_boat_seleted
                        ? "#FFF5EC"
                        : "#FFF",
                    }}
                    onPress={() => {
                      this.setState({ is_boat_seleted: false });
                    }}
                    activeOpacity={1}
                  >
                    <Image
                      style={{
                        height: "52%",
                        width: "52%",
                        resizeMode: "contain",
                      }}
                      source={
                        !this.state.is_boat_seleted
                          ? AssetsImages.icon_auto_active
                          : AssetsImages.icon_auto_inactive
                      }
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "700",
                        color: !this.state.is_boat_seleted
                          ? "#FF5C22"
                          : "#D1D2D4",
                        marginTop: 8,
                      }}
                    >
                      AUTO
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      height: 100,
                      width: "48%",
                      alignItems: "center",
                      justifyContent: "center",
                      borderColor: this.state.is_boat_seleted
                        ? "#FF5C22"
                        : "#D1D2D4",
                      borderWidth: 1,
                      borderRadius: 5,
                      backgroundColor: this.state.is_boat_seleted
                        ? "#FFF5EC"
                        : "#FFF",
                    }}
                    onPress={() => {
                      this.setState({ is_boat_seleted: true });
                    }}
                    activeOpacity={1}
                  >
                    <Image
                      style={{
                        height: "52%",
                        width: "50%",
                        resizeMode: "contain",
                      }}
                      source={
                        this.state.is_boat_seleted
                          ? AssetsImages.icon_boat_active
                          : AssetsImages.icon_boat_inactive
                      }
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "700",
                        color: this.state.is_boat_seleted
                          ? "#FF5C22"
                          : "#D1D2D4",
                        marginTop: 8,
                      }}
                    >
                      BOAT
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={{ marginTop: 30, height: 0 }} />
            )}

            {this.state.is_boat_seleted && this.state.boat_list.length != 0 ? (
              <FlatList
                style={{ width: "100%", marginTop: 5 }}
                data={this.state.boat_list}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.state.refresh_boat_list}
                ListHeaderComponent={this.headerView()}
                renderItem={({ item, index }) => {
                  // console.log("DATA ====== >>>>> >>>>>" + JSON.stringify(item))
                  return (
                    <BtnWithTxtAndImage
                      onPressMainBtn={() => {
                        this.state.boat_list.map((itemData, itemIndex) => {
                          if (itemIndex == index) {
                            this.handleSelectVehicle(item);
                            itemData.isSelected = !item.isSelected;
                          }
                        });
                        this.setState({
                          refresh_boat_list: !this.state.refresh_boat_list,
                        });
                      }}
                      onPressSubBtn={() => {}}
                      img={
                        item.isSelected
                          ? AssetsImages.icon_check
                          : AssetsImages.icon_add_inactive
                      }
                      title={item.make}
                      btnStyle={{
                        borderColor: item.isSelected ? "#FF6600" : "#D1D2D4",
                      }}
                      txtStyle={{ color: "#000" }}
                    />
                  );
                }}
              />
            ) : null}

            {!this.state.is_boat_seleted &&
            this.state.automobiles_list.length != 0 ? (
              <FlatList
                style={{ width: "100%", marginTop: 5 }}
                data={this.state.automobiles_list}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.state.refresh_automobiles_list}
                ListHeaderComponent={this.headerView()}
                renderItem={({ item, index }) => {
                  // console.log("DATA ====== >>>>> >>>>>" + JSON.stringify(item));

                  return (
                    <BtnWithTxtAndImage
                      onPressMainBtn={() => {
                        this.state.automobiles_list.map(
                          (itemData, itemIndex) => {
                            if (itemIndex == index) {
                              this.handleSelectVehicle(item);
                              // if (item.isSelected == false) {
                              //   this.setState(
                              //     {
                              //       selectedVehicle: item,
                              //       is_btn_disabled: false,
                              //     },
                              //     () => {
                              //       // console.log(
                              //       //   JSON.stringify(this.state.selectedVehicle)
                              //       // );
                              //     }
                              //   );
                              // } else {
                              //   this.setState(
                              //     {
                              //       selectedVehicle: {},
                              //       is_btn_disabled: true,
                              //     },
                              //     () => {
                              //       // console.log(
                              //       //   JSON.stringify(this.state.selectedVehicle)
                              //       // );
                              //     }
                              //   );
                              // }
                              itemData.isSelected = !item.isSelected;
                            }
                            // else {
                            //   itemData.isSelected = false;
                            // }
                          }
                        );
                        this.setState({
                          refresh_automobiles_list: !this.state
                            .refresh_automobiles_list,
                        });
                      }}
                      onPressSubBtn={() => {}}
                      img={
                        item.isSelected
                          ? AssetsImages.icon_check
                          : AssetsImages.icon_add_inactive
                      }
                      title={item.make}
                      btnStyle={{
                        borderColor: item.isSelected ? "#FF6600" : "#D1D2D4",
                      }}
                      txtStyle={{ color: "#000" }}
                    />
                  );
                }}
              />
            ) : null}
            <View style={{ width: "100%" }}>
              <TxtFullScreenBtn
                title={
                  this.state.is_boat_seleted
                    ? "Add a Boat"
                    : "Add a Automobiles"
                }
                onPress={() => {
                  if (this.state.is_requested_for_home) {
                    this.props.navigation.navigate("AddVehicle", {
                      is_selected_home: this.state.is_selected_home,
                      isFrom: "SelectVehicle",
                      is_boat_seleted: this.state.is_boat_seleted,
                    });
                  } else {
                    this.props.navigation.navigate("AddVehicle", {
                      is_selected_home: this.state.is_selected_home,
                      isFrom: "SelectVehicle",
                      is_boat_seleted: this.state.is_boat_seleted,
                    });
                  }
                }}
                // disabled={this.state.is_btn_disabled || !this.state.is_error_msg_shown ? true : false}
                containerStyle={{
                  backgroundColor: "#FFE0CC",
                  marginTop: 15,
                  shadowOpacity: 0,
                }}
                fontColor={"#FF6600"}
              />
            </View>
          </ScrollView>

          <TxtFullScreenBtn
            title={"ADD THESE VEHICLE"}
            onPress={() => {
              this.state.orderData.vehicle = this.state.selectedVehicle;
              // this.props.navigation.navigate("Payment", {
              this.props.navigation.navigate("Schedule", {
                isFromAddVehicle: true,
                orderData: this.state.orderData,
                is_selected_home: this.state.is_selected_home,
              });
            }}
            disabled={this.state.selectedVehicle.length <= 0}
            containerStyle={{
              backgroundColor:
                this.state.selectedVehicle.length <= 0 ? "#D1D2D4" : "#FF5C22",
              marginTop: 10,
              marginBottom: 16,
            }}
          />
        </View>
      </SafeAreaContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saved_vehicle: (request_data) => dispatch(saved_vehicle(request_data)),
  saved_vehicle_clear_data: () => dispatch(saved_vehicle_clear_data()),
});

const mapStateToProps = (state) => ({
  saved_vehicle_data: state.saved_vehicle.saved_vehicle_data,

  is_success: state.saved_vehicle.is_success,
  is_fetching: state.saved_vehicle.is_fetching,
  msg: state.saved_vehicle.msg,

  user_data: state.user_auth.user_data,
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectVehicle);
