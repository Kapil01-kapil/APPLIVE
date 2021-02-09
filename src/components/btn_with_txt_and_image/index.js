import React, { Component } from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";

export default class BtnWithTxtAndImage extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[
          {
            flexDirection: "row",
            width: "86%",
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "center",
            marginVertical: 5,
            borderRadius: 5,
            borderColor: "#D9DAE3",
            borderWidth: 1,
          },
          this.props.btnStyle,
        ]}
        onPress={() => {
          this.props.onPressMainBtn();
        }}
        activeOpacity={1}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 10,
            marginVertical: 8,
          }}
        >
          <Text
            style={[
              {
                marginLeft: 6,
                fontSize: 13,
                fontWeight: "500",
                fontFamily: "Avenir",
                color: "#8B90AA",
              },
              this.props.txtStyle,
            ]}
          >
            {this.props.title}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            this.props.onPressSubBtn();
          }}
          activeOpacity={1}
        >
          <Image source={this.props.img} style={{ height: 16, width: 16 }} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}
