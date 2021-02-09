import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";

export default class TxtFullScreenBtn extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[
          {
            height: 50,
            width: "86%",
            alignSelf: "center",
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
          },
          this.props.containerStyle,
        ]}
        disabled={this.props.disabled}
        onPress={() => {
          this.props.onPress();
        }}
      >
        {this.props.title ? (
          <Text
            style={{
              fontSize: 15,
              color: (this.props.fontColor && this.props.fontColor) || "#fff",
              fontWeight: "bold",
              fontFamily: "Avenir",
            }}
          >
            {this.props.title}
          </Text>
        ) : (
          <Image
            source={this.props.btnImg}
            style={[
              { height: 40, resizeMode: "contain" },
              this.props.btnImgStyle,
            ]}
          />
        )}
      </TouchableOpacity>
    );
  }
}
