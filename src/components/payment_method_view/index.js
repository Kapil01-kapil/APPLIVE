import React, { Component } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import AssetsImages from "../../res";

export default class PaymentMethodView extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          width: "86%",
          height: 50,
          alignItems: "center",
          justifyContent: "space-between",
          alignSelf: "center",
          marginVertical: 5,
          borderRadius: 5,
          borderColor: "#D9DAE3",
          borderWidth: 1,
        }}
        onPress={this.props.onPressPayment}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 16 }}
        >
          <View style={{ alignItems: "center", width: 60 }}>
            {this.props.img ? (
              <Image
                source={this.props.img}
                style={{ resizeMode: "contain", height: 54, width: 54 }}
              />
            ) : (
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  fontFamily: "Avenir",
                }}
              >
                {this.props.card_no}
              </Text>
            )}
          </View>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 13,
              fontWeight: "500",
              fontFamily: "Avenir",
              color: "#8B90AA",
            }}
          >
            {this.props.card_data}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={this.props.onPressBtn}
        >
          <Image source={this.props.BtnImg} style={{ height: 18, width: 18 }} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}
