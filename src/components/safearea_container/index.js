import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import ModalPopup from "../modal_popup";

export default class SafeAreaContainer extends Component {
  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "#fff",
          height: "100%",
        }}
      >
        <ModalPopup
          title={this.props.title}
          bodyTxt={this.props.bodyTxt}
          isModalOpened={this.props.isModalOpened}
          onDismiss={() => {
            this.props.onDismiss();
          }}
          isContainingTwoBtn={this.props.isContainingTwoBtn}
          isContainImg={this.props.isContainImg}
          firstBtnTitle={this.props.firstBtnTitle}
          onPressFirstBtn={() => {
            this.props.onPressFirstBtn();
          }}
          secondBtnTitle={this.props.secondBtnTitle}
          onPressSecondBtn={() => {
            this.props.onPressSecondBtn();
          }}
          img={this.props.img}
        />
        {this.props.children}
      </SafeAreaView>
    );
  }
}
