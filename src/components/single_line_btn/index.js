import React, { Component } from "react";
import { TouchableOpacity, View, Text } from "react-native";

export default class SingleLineBtn extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: this.props.marginTop,
          alignSelf: "center",
          marginBottom: this.props.marginBottom,
        }}
      >
        <Text style={{ fontSize: 13, color: "#747A93" }}>{this.props.txt}</Text>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => {
            this.props.onPress();
          }}
        >
          <Text style={{ fontSize: 13, color: "#000", fontWeight: "bold" }}>
            {this.props.btnTxt}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
