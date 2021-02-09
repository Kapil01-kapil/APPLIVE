import { AsyncStorage, Alert } from "react-native";

//helper Functions
const helper = {
  checkEmail: (text) => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(text)) {
      return true;
    } else {
      return false;
    }
  },

  validatePhoneNo: (text) => {
    var regex = /^[0-9]+$/;
    if (regex.test(text)) {
      return true;
    } else {
      return false;
    }
  },

  checkPassword: (text) => {
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
    if (regex.test(text)) {
      return true;
    } else {
      return false;
    }
  },

  showLog: (msg) => {
    console.log(msg);
  },

  showAlert: (msg) => {
    alert(msg);
  },

  showNetworkAlert: () => {
    let msg = "Please check your internet connection and try again!";
    Alert.alert(
      CONST.APP_NAME,
      "" + msg,
      [
        {
          text: "OK",
          onPress: () => {},
        },
      ],
      {
        cancelable: false,
      }
    );
  },

  savePref: (key, value) => {
    AsyncStorage.setItem(key, JSON.stringify(value), (err) => {});
  },

  getPref: (key) => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key, (err, result) => {
        if (result) {
          resolve(JSON.parse(result));
        } else {
          resolve(null);
        }
      });
    });
  },

  removePref: (key) => {
    AsyncStorage.removeItem(key, (err) => {});
  },

  CapitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  isEmptyObject(obj) {
    for (var name in obj) {
      return false;
    }
    return true;
  },

  isOdd: (num) => {
    var data = num % 2;
    return data;
  },
};

export default helper;
