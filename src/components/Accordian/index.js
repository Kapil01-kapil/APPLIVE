import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  ScrollView,
  Image,
  Platform,
  UIManager,
} from "react-native";
import { Icon } from "native-base";

import AssetsImages from "../../res";
export default class Accordian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
    };

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <View
        style={{
          width: "90%",
          flexGrow: 0,
          borderBottomColor: "#D9DAE3",
          borderBottomWidth: 1,
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          ref={this.accordian}
          style={styles.row}
          onPress={() => this.toggleExpand()}
        >
          <Text
            style={{
              color: "#000",
              marginLeft: 10,
              fontFamily: "Avenir",
              fontSize: 14,
              flex: 1,
              fontWeight: "bold",
            }}
          >
            {this.props.title}
          </Text>
          {this.state.expanded ? (
            <Icon style={{  marginHorizontal: 8,fontSize: 25 , color: "#FF5C22",}} name="chevron-up"  type='FontAwesome5' />
          ) : (
            <Icon style={{  marginHorizontal: 8,fontSize: 25 , color: "#FF5C22", }} name="chevron-down"  type='FontAwesome5' />
          )}
         
        </TouchableOpacity>

        {this.state.expanded && (
          <View style={styles.child}>
            <Text style={{ color: "#999999" }}>{this.props.data}</Text>
          </View>
        )}
        <View style={styles.parentHr} />
      </View>
    );
  }

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  };
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    width: "90%",

    color: "black",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 15,
    flexGrow: 0,
  },
  parentHr: {
    height: 1,
    color: "white",
    backgroundColor: "#999999",
    width: "100%",
    marginTop: 10,
  },
  child: {
    color: "#80859F",
    flexGrow: 0,
    marginLeft: 10,
    fontFamily: "Avenir",
    fontSize: 16,
  },
});
