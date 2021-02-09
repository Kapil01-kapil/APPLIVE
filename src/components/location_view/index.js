import React, { Component } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import AssetsImages from "../../res";

export default class LocationView extends Component {
  render() {
    return (
      <View
        style={[
          { width: "100%", justifyContent: "center", alignItems: "center" },
          this.props.containerStyle,
        ]}
      >
        <View
          style={[
            {
              flexDirection: "row",
              width: "86%",
              marginVertical: 5,
              borderWidth: 1,
              borderColor: "#D9DAE3",
              borderRadius: 4,
              alignItems: "center",
            },
            this.props.innerContainerStyle,
          ]}
        >
          <View style={{ flex: 1, marginVertical: 8 }}>
            <Text
              style={{
                color: "#FF7000",
                marginLeft: 10,
                fontFamily: "Avenir",
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              {this.props.header}
            </Text>
            <Text
              style={{
                color: "#000",
                marginLeft: 10,
                fontFamily: "Avenir",
                fontSize: 14,
                fontWeight: "700",
              }}
            >
              {this.props.body}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              height: 40,
              width: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={this.props.on_press_btn}
          >
            <Image
              source={this.props.btn_img}
              style={{ height: 16, width: 16, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
