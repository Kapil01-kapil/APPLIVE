import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import AssetsImages from "../../res";
import Colors from "../../constants/Colors";
export default class ErrorContainer extends Component {
  render() {
    return (
      <View
        style={{
          width: "86%",
          backgroundColor: Colors.Violet,
          marginTop: 15,
          alignSelf: "center",
          alignItems: "center",
          flexDirection: "row",
          borderRadius: 6,
          borderColor: "3FFA6A6",
        }}
      >
        <Image
          source={AssetsImages.icon_alert}
          style={{
            height: 20,
            width: 20,
            resizeMode: "contain",
            marginLeft: 15,
          }}
        />
        <Text
          style={{
            width: "80%",
            fontSize: 10,
            color: Colors.pink,
            fontWeight: "bold",
            marginLeft: 12,
            marginVertical: 12,
          }}
        >
          {this.props.error_msg}
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 35,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  phone_icon: {
    borderColor: "#0C90E7",
    marginHorizontal: 10,
  },
  align_left: {
    alignSelf: "flex-start",
  },
  align_right: {
    alignSelf: "flex-end",
  },
  align_center: {
    alignSelf: "center",
  },
});
