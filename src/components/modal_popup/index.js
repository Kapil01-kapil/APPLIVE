import React, { Component } from "react";
import { Modal, View, SafeAreaView, Image, Text } from "react-native";
import { CONST } from "../../utils/constants";
import TxtFullScreenBtn from "../txt_full_screen_btn";

export default class ModalPopup extends Component {
  render() {
    return (
      <Modal
        animated={false}
        animationType="none"
        transparent={true}
        visible={this.props.isModalOpened}
        onDismiss={() => {
          this.props.onDismiss();
        }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: CONST.DEVICE_WIDTH - 40,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: "#000",
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Avenir",
                width: "86%",
                marginTop: 20,
                alignSelf: "center",
                textAlign: "left",
              }}
              allowFontScaling={false}
            >
              {this.props.title}
            </Text>
            <Text
              style={{
                color: "#747A93",
                fontSize: 14,
                width: "86%",
                marginTop: 15,
                alignSelf: "center",
                textAlign: "left",
                lineHeight: 25,
                fontFamily: "Avenir",
              }}
              allowFontScaling={false}
            >
              {this.props.bodyTxt}
            </Text>
            {this.props.isContainImg ? (
              <Image
                style={{ width: "100%", height: 180, marginTop: 10 }}
                source={this.props.img}
              />
            ) : null}
            {this.props.isContainingTwoBtn ? (
              <View>
                <TxtFullScreenBtn
                  title={this.props.firstBtnTitle}
                  onPress={() => {
                    this.props.onPressFirstBtn();
                  }}
                  disabled={false}
                  containerStyle={{
                    backgroundColor: "#FF5C22",
                    marginTop: 20,
                  }}
                />
                <TxtFullScreenBtn
                  title={this.props.secondBtnTitle}
                  onPress={() => {
                    this.props.onPressSecondBtn();
                  }}
                  disabled={false}
                  containerStyle={{
                    backgroundColor: "#00000000",
                    marginTop: 10,
                    marginBottom: 20,
                    borderColor: "#747A93",
                    borderWidth: 1,
                  }}
                  fontColor={"#747A93"}
                />
              </View>
            ) : (
              <TxtFullScreenBtn
                title={"CLOSE"}
                onPress={() => {
                  this.props.onDismiss();
                }}
                disabled={false}
                containerStyle={{
                  backgroundColor: "#FF5C22",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              />
            )}
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}
