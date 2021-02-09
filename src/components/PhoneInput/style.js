import { StyleSheet, Dimensions } from "react-native";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
function hp(percentage) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}
const styles = StyleSheet.create({
  container: {
    width: "100%",

    flexDirection: "row",
    borderRadius: 5,
    borderColor: "rgba(116,122,147,0.5)",
    borderWidth: 1,
  },
  flagButtonView: {
    width: wp(20),
    marginTop: 10,
    marginLeft: 25,
    paddingRight: 15,
    height: "100%",
    minWidth: 22,
    justifyContent: "center",
    borderRightWidth: 2,
    margin: 5,
    borderColor: "rgba(116,122,147,0.5)",
    flexDirection: "row",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "rgba(116,122,147,0.5)",
  },
  dropDownImage: {
    height: 14,
    width: 12,
  },
  textContainer: {
    flex: 1,

    textAlign: "left",
    flexDirection: "row",
    alignItems: "center",
  },
  codeText: {
    fontSize: 16,
    marginRight: 10,

    color: "#999",
  },
  numberText: {
    fontSize: 16,
    color: "#999",
    flex: 1,
  },
});

export default styles;
