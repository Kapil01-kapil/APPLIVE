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
import { connect } from "react-redux";
import {
  add_vehicle,
  add_vehicle_clear_data,
  saved_vehicle,
  saved_vehicle_clear_data,
} from "../../redux/actions";
import Loader from "../../components/loader";

const initalBoatData = {
  make: [{ title: "Make1" }, { title: "make2" }],
  color: [{ title: "Color1" }, { title: "Color2" }, { title: "Color3" }],
  model: [{ title: "model1" }, { title: "model2" }, { title: "model3" }],
  fuel_type: [
    { title: "fueltype1" },
    { title: "fueltype2" },
    { title: "fueltype3" },
  ],
};

class AddVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,

      loading: false,

      is_btn_disabled: true,
      is_boat_seleted: false,
      options: [
        { value: 0, label: "0" },
        { value: 1, label: "1" },
      ],
      make: [],
      color: [],
      model: [],
      fuel_type: [],

      makeValue: "",
      colorValue: "",
      modelValue: "",
      fuel_typeValue: "",
      tagValue: "",
      fuelQuantity: "",

      isFrom: "",
      isVehicleSelectionViewShown: true,
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
          onPress={() => {}}
          btnStyle={{ marginRight: 8 }}
        />
      ),
    });

    // console.log("prevProps => " + JSON.stringify(this.props.route.params))

    this.setState({ isFrom: this.props.route.params.isFrom }, () => {
      this.initialSetup();
    });
  }

  initialSetup = () => {
    if (this.state.isFrom == "Dashboard") {
      this.setState(
        {
          isVehicleSelectionViewShown: this.props.route.params.is_selected_home,
          orderData: this.props.route.params.orderData,
        },
        () => {
          if (this.state.isVehicleSelectionViewShown == false) {
            this.setState({ is_boat_seleted: false });
          }
        }
      );
      if (this.props.vehicle_dropdown_data.length != 0) {
        this.setFlatlistData(this.props.vehicle_dropdown_data.data);
      }
    } else if (
      this.state.isFrom == "SelectVehicle" ||
      this.state.isFrom == "SavedVehile"
    ) {
      this.setState(
        {
          isVehicleSelectionViewShown: false,
          is_boat_seleted: this.props.route.params.is_boat_seleted,
        },
        () => {
          if (this.state.is_boat_seleted == true) {
            if (this.props.boat_dropdown_data.length != 0) {
              //   this.setFlatlistData(this.props.boat_dropdown_data.data);
              this.setFlatlistData(initalBoatData);
            }
          } else if (this.state.is_boat_seleted == false) {
            if (this.props.vehicle_dropdown_data.length != 0) {
              this.setFlatlistData(this.props.vehicle_dropdown_data.data);
            }
          }
        }
      );
    }
  };

  setFlatlistData = (dropdownData) => {
    var makeData = [
      {
        value: "Select",
        label: "Select",
      },
    ];
    dropdownData.make.map((item) => {
      var data = {
        value: item.title,
        label: item.title,
      };
      makeData.push(data);
    });
    var colorData = [
      {
        value: "Select",
        label: "Select",
      },
    ];
    dropdownData.color.map((item) => {
      var data = {
        value: item.title,
        label: item.title,
      };
      colorData.push(data);
    });
    var modelData = [
      {
        value: "Select",
        label: "Select",
      },
    ];
    dropdownData.model.map((item) => {
      var data = {
        value: item.title,
        label: item.title,
      };
      modelData.push(data);
    });
    var fuel_typeData = [
      {
        value: "Select",
        label: "Select",
      },
    ];
    dropdownData.fuel_type.map((item) => {
      var data = {
        value: item.title,
        label: item.title,
      };
      fuel_typeData.push(data);
    });
    this.setState({
      make: makeData,
      color: colorData,
      model: modelData,
      fuel_type: fuel_typeData,
    });
  };

  componentDidUpdate(prevProps) {
    // console.log("prevProps => " + JSON.stringify(prevProps) + "   ======  "+ this.props.msg)

    if (this.props.is_fetching !== prevProps.is_fetching) {
      if (this.props.is_fetching) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching) {
        this.setState({ loading: false });
      }
    }

    if (this.props.is_success !== prevProps.is_success) {
      //   console.log("prevProps => " + prevProps.is_success)
      //   console.log("this.props => " + this.props.is_success)

      if (this.props.is_success) {
        if (this.state.isFrom == "Dashboard") {
          let request = { user_id: this.props.user_data.data._id };
          this.props.saved_vehicle(request);
        } else {
          this.navigateToScreen();
        }
      }
      this.props.add_vehicle_clear_data();
    }

    if (this.props.is_fetching_vehicle !== prevProps.is_fetching_vehicle) {
      if (this.props.is_fetching_vehicle) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching_vehicle) {
        this.setState({ loading: false });
      }
    }

    if (this.props.is_success_vehicle !== prevProps.is_success_vehicle) {
      if (this.props.is_success_vehicle) {
        if (this.state.isFrom == "Dashboard") {
          this.state.orderData.vehicle = this.props.saved_vehicle_data.data[0];
          this.props.navigation.navigate("Payment", { isFromAddVehicle: true });
        }
      }
      this.props.add_vehicle_clear_data();
    }
  }

  navigateToScreen = () => {
    if (this.state.isFrom == "SelectVehicle") {
      this.props.navigation.goBack();
    } else if (this.state.isFrom == "SavedVehile") {
      this.props.navigation.goBack();
    }
  };

  validateData = () => {
    if (
      this.state.makeValue.length != 0 &&
      this.state.colorValue.length != 0 &&
      this.state.modelValue.length != 0 &&
      this.state.fuel_typeValue.length != 0 &&
      this.state.makeValue != "Select" &&
      this.state.colorValue != "Select" &&
      this.state.modelValue != "Select" &&
      this.state.fuel_typeValue != "Select" &&
      this.state.fuelQuantity > 0
    ) {
      this.setState({ is_btn_disabled: false });
    } else {
      this.setState({ is_btn_disabled: true });
    }
  };

  onSubmitEditingMake(value) {
    this.setState(
      {
        makeValue: value,
      },
      () => {
        this.validateData();
      }
    );
  }

  onSubmitEditingModel(value) {
    this.setState(
      {
        modelValue: value,
      },
      () => {
        this.validateData();
      }
    );
  }

  onSubmitEditingColor(value) {
    this.setState(
      {
        colorValue: value,
      },
      () => {
        this.validateData();
      }
    );
  }

  onSubmitEditingFuel(value) {
    this.setState(
      {
        fuel_typeValue: value,
      },
      () => {
        this.validateData();
      }
    );
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
          <ScrollView style={{ flex: 1 }}>
            {this.state.isVehicleSelectionViewShown ? (
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
                      this.setState({ is_boat_seleted: false }, () => {
                        if (this.props.vehicle_dropdown_data.length != 0) {
                          this.setFlatlistData(
                            this.props.vehicle_dropdown_data.data
                          );
                        }
                      });
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
                      this.setState({ is_boat_seleted: true }, () => {
                        if (this.props.boat_dropdown_data.length != 0) {
                          this.setFlatlistData(
                            this.props.boat_dropdown_data.data
                          );
                        }
                      });
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
            <HeaderTxt title={"Make"} marginTop={16} />
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
                value={this.state.makeValue}
                options={this.state.make}
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
                }}
                onSubmitEditing={this.onSubmitEditingMake.bind(this)}
              />
            </View>

            <HeaderTxt title={"Model"} marginTop={16} />
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
                value={this.state.modelValue}
                options={this.state.model}
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
                }}
                onSubmitEditing={this.onSubmitEditingModel.bind(this)}
              />
            </View>

            <HeaderTxt title={"Color"} marginTop={16} />
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
                value={this.state.colorValue}
                options={this.state.color}
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
                }}
                onSubmitEditing={this.onSubmitEditingColor.bind(this)}
              />
            </View>

            <HeaderTxt title={"Tag (If available)"} marginTop={16} />

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
                  fontSize: 14,
                  color: "#000",
                }}
                placeholder=""
                placeholderTextColor={"rgba(0,0,0,0.4)"}
                value={this.state.tagValue}
                onChangeText={(text) => {
                  this.setState({ tagValue: text });
                }}
                onBlur={() => {}}
                onPressSubmit={() => {
                  this.setState({ keyboardVerticalOffsetValue: 0 });
                }}
              />
            </View>
            <HeaderTxt title={"Fuel Type"} marginTop={16} />

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
                value={this.state.fuel_typeValue}
                options={this.state.fuel_type}
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
                }}
                onSubmitEditing={this.onSubmitEditingFuel.bind(this)}
              />
            </View>
            <HeaderTxt title={"Fuel Quantity"} marginTop={16} />

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
              <TextInput
                style={{
                  height: 44,
                  width: "100%",
                  borderRadius: 5,
                  borderColor: "rgba(116,122,147,0.5)",
                  borderWidth: 1,
                  paddingLeft: 10,
                  fontSize: 14,
                  color: "#000",
                }}
                keyboardType="decimal-pad"
                placeholder="0.00"
                placeholderTextColor={"rgba(0,0,0,0.4)"}
                value={`${this.state.fuelQuantity}`}
                onChangeText={(text) => {
                  // const value = parseFloat(text);
                  this.setState({ fuelQuantity: text }, () =>
                    this.validateData()
                  );
                  //   this.validateData();
                }}
                onBlur={() => {}}
                onPressSubmit={() => {
                  this.setState({ keyboardVerticalOffsetValue: 0 });
                }}
              />
            </View>
          </ScrollView>

          <TxtFullScreenBtn
            title={"ADD VEHICLE"}
            onPress={() => {
              const request = {
                user_id: this.props.user_data.data._id,
                make: this.state.makeValue,
                model: this.state.modelValue,
                color: this.state.colorValue,
                fuel_type: this.state.fuel_typeValue,
                type: this.state.is_boat_seleted ? "boat" : "auto",
                tags: this.state.tagValue,
                user_token: this.props.user_token,
                quantity: this.state.fuelQuantity,
              };
              // console.log("adding vehicle updated...", JSON.stringify(request));
              this.props.add_vehicle(request);
            }}
            disabled={this.state.is_btn_disabled}
            containerStyle={{
              backgroundColor: this.state.is_btn_disabled
                ? "#D1D2D4"
                : "#FF5C22",
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
  add_vehicle: (request_data) => dispatch(add_vehicle(request_data)),
  add_vehicle_clear_data: () => dispatch(add_vehicle_clear_data()),
  saved_vehicle: (request_data) => dispatch(saved_vehicle(request_data)),
  saved_vehicle_clear_data: () => dispatch(saved_vehicle_clear_data()),
});

const mapStateToProps = (state) => ({
  vehicle_dropdown_data: state.vehicle_dropdown.vehicle_dropdown_data,
  boat_dropdown_data: state.boat_dropdown.boat_dropdown_data,

  is_success: state.add_vehicle.is_success,
  is_fetching: state.add_vehicle.is_fetching,
  msg: state.add_vehicle.msg,
  user_data: state.user_auth.user_data,
  user_token: state.user_auth.user_auth_token,

  saved_vehicle_data: state.saved_vehicle.saved_vehicle_data,

  is_success_vehicle: state.saved_vehicle.is_success,
  is_fetching_vehicle: state.saved_vehicle.is_fetching,
  msg_vehicle: state.saved_vehicle.msg,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddVehicle);
