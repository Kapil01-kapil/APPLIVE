import React, { Component } from "react";
import { TouchableOpacity, Image } from "react-native";

export default class BtnWithImage extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[
          {
            height: 50,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
          },
          this.props.btnStyle,
        ]}
        onPress={() => {
          this.props.onPress();
        }}
      >
        <Image
          source={this.props.img}
          style={[
            { height: 20, width: 20, resizeMode: "contain" },
            this.props.btnImgStyle,
          ]}
        />
      </TouchableOpacity>
    );
  }
}
