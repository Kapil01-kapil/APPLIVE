import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  login_header_txt: {
    color: "#000",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Avenir",
    marginLeft: 25,
    marginTop: 70,
  },
  email_txtinput: {
    height: 44,
    width: "86%",
    borderRadius: 5,
    borderColor: "rgba(116,122,147,0.5)",
    borderWidth: 1,
    fontSize: 14,
    color: "#000",
    alignSelf: "center",
    marginTop: 8,
  },
  pwd_container: {
    height: 44,
    width: "86%",
    borderRadius: 5,
    borderColor: "rgba(116,122,147,0.5)",
    borderWidth: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 8,
  },
  pwd_txtinput: {
    height: 44,
    flex: 1,
    paddingLeft: 10,
    fontSize: 14,
    color: "#000",
  },
  show_pwd_btn: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: 40,
  },
  show_pwd_img: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
});
