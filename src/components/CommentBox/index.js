import React, { Component } from "react";
import { View, TextInput } from "react-native";

const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={100}
      style={{ width: "100%" }}
    />
  );
};
export default UselessTextInput;
