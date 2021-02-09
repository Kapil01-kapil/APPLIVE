import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import AssetsImages from "../../res";

export default class SocialMediaBtn extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          height: 50,
          width: "86%",
          backgroundColor: this.props.backgroundColor,
          marginTop: (this.props.topMargin && this.props.topMargin) || 25,
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: this.props.marginBottom,
          borderRadius: 6,
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowColor: "rgba(0,0,0,0.8)",
          shadowOpacity: 0.2,
          shadowRadius: 10,
        }}
        onPress={() => {
          this.props.onPress();
        }}
      >
        <Image
          source={this.props.img}
          style={{ height: 18, width: 18, resizeMode: "contain" }}
        />
        <Text
          style={{
            fontSize: 15,
            color: "#fff",
            fontWeight: "bold",
            marginLeft: 15,
          }}
        >
          {this.props.txt}
        </Text>
      </TouchableOpacity>
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
