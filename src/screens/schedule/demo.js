// import React, { Component } from "react";
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   Animated,
//   Keyboard,
//   ScrollView,
// } from "react-native";
// import BtnWithImage from "../../components/btn_with_image";
// import AssetsImages from "../../res";
// import SafeAreaContainer from "../../components/safearea_container";
// import styles from "./styles";
// import TxtFullScreenBtn from "../../components/txt_full_screen_btn";
// import HeaderTxt from "../../components/header_txt";
// import SelectInput from "react-native-select-input-ios";
// import moment from "moment";

// export default class Schedule extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: "",
//       bodyTxt: "",
//       isPopUpOpened: false,

//       is_selected_home: true,
//       is_btn_disabled: true,
//       is_boat_seleted: false,
//       parkedGarage: [
//         { value: "Select", label: "Select" },
//         { value: "No", label: "No" },
//         { value: "Yes", label: "Yes" },
//       ],
//       floorList: [
//         { value: "0", label: "0" },
//         { value: "1", label: "1" },
//         { value: "2", label: "2" },
//       ],
//       parkedGarageValue: "",
//       floorValue: "",

//       time_array: [
//         {
//           title: "8AM",
//           isSelected: false,
//         },
//         {
//           title: "11AM",
//           isSelected: false,
//         },
//         {
//           title: "2PM",
//           isSelected: false,
//         },
//         {
//           title: "6PM",
//           isSelected: false,
//         },
//       ],
//       date_array: [],
//       refreshTime: true,
//       timeValue: "",
//       dateValue: "",

//       recurringList: [
//         { value: "Select", label: "Select" },
//         { value: "No", label: "No" },
//         { value: "Yes Every Week", label: "Yes Every Week" },
//         { value: "Yes Every 2 Weeks", label: "Yes Every 2 Weeks" },
//         { value: "Yes Every 4 Weeks", label: "Yes Every 4 Weeks" },
//         { value: "Yes Every 6 Weeks", label: "Yes Every 6 Weeks" },
//       ],
//       recurringValue: "",
//       notes: "",

//       orderData: {},
//     };
//   }

//   //TODO:- class life cycle
//   componentDidMount() {
//     // console.log(this.props.route.params.orderData);

//     this.props.navigation.setOptions({
//       headerTitle: "Schedule",
//       headerStyle: {
//         elevation: 0,
//         shadowOpacity: 0,
//         borderBottomWidth: 0,
//       },
//       headerTitleStyle: {
//         fontWeight: "bold",
//         fontSize: 26,
//         fontFamily: "Avenir",
//       },
//       headerLeft: () => (
//         <BtnWithImage
//           img={AssetsImages.icon_back}
//           btnImgStyle={{ height: 22, width: 22 }}
//           onPress={() => {
//             this.props.navigation.goBack();
//           }}
//           btnStyle={{ marginLeft: 8 }}
//         />
//       ),
//       headerRight: () => (
//         <BtnWithImage
//           img={AssetsImages.icon_chat}
//           btnImgStyle={{ height: 18, width: 18 }}
//           onPress={() => {
//             // this.props.navigation.openDrawer();
//           }}
//           btnStyle={{ marginRight: 8 }}
//         />
//       ),
//     });

//     var dateData = [];

//     var i = 0;
//     while (i < 30) {
//       const dt = moment().add(i, "days");
//       const day = dt.format("ddd");
//       const date = dt.format("MMM DD");
//       if (day !== "Sun") {
//         const data = {
//           title: i === 0 ? "Today" : day,
//           subTitle: date,
//           isSelected: false,
//         };
//         dateData.push(data);
//       }
//       i++;
//       //   console.log(i);
//       //   if (i == 0) {
//       //     var day = {
//       //       title: "Today",
//       //       subTitle: moment().format("MMM DD"),
//       //       isSelected: false,
//       //     };
//       //     dateData.push(day);
//       //     i++;
//       //   } else {
//       //     var day = {
//       //       title: moment().add(i, "days").format("ddd"),
//       //       subTitle: moment().add(i, "days").format("MMM DD"),
//       //       isSelected: false,
//       //     };
//       //     dateData.push(day);
//       //     i++;
//       //   }
//     }
//     // console.log(JSON.stringify(dateData));
//     this.setState({
//       date_array: dateData,
//       orderData: this.props.route.params.orderData,
//     });

//     if (this.props.route.params.is_selected_home) {
//       let time_array;
//       if (this.props.route.params.orderData.vehicle[0]?.type === "auto") {
//         time_array = [
//           { title: "06 PM - 09 PM", isSelected: false },
//           {
//             title: "09 PM - 12 AM",
//             isSelected: false,
//           },
//         ];
//       } else {
//         time_array = [
//           {
//             title: "09 AM - 12 PM",
//             isSelected: false,
//           },
//           {
//             title: "12 PM - 04PM",
//             isSelected: false,
//           },
//         ];
//       }
//       this.setState({ time_array });
//     } else {
//       const time_array = [
//         {
//           title: "08 AM - 05 PM",
//           isSelected: false,
//         },
//       ];
//       this.setState({ time_array });
//     }
//   }
//   validateData = () => {
//     if (
//       this.state.timeValue.length != 0 &&
//       this.state.dateValue.length != 0 &&
//       this.state.parkedGarageValue.length != 0 &&
//       this.state.notes.length != 0 &&
//       this.state.recurringValue.length != 0 &&
//       this.state.recurringValue != "Select" &&
//       this.state.parkedGarageValue != "Select"
//     ) {
//       this.setState({ is_btn_disabled: false });
//     } else {
//       this.setState({ is_btn_disabled: true });
//     }
//   };

//   onSubmitEditingFloor(value) {
//     this.setState(
//       {
//         floorValue: value,
//       },
//       () => {
//         this.validateData();
//       }
//     );
//   }
//   onSubmitEditingParkedGarage(value) {
//     this.setState(
//       {
//         parkedGarageValue: value,
//       },
//       () => {
//         this.validateData();
//       }
//     );
//   }
//   onSubmitEditingrecurring(value) {
//     this.setState(
//       {
//         recurringValue: value,
//       },
//       () => {
//         this.validateData();
//       }
//     );
//   }

//   render() {
//     return (
//       <SafeAreaContainer
//         title={this.state.title}
//         bodyTxt={this.state.bodyTxt}
//         isModalOpened={this.state.isPopUpOpened}
//         onDismiss={() => {
//           this.setState({ isPopUpOpened: false });
//         }}
//       >
//         <View style={styles.container}>
//           <ScrollView style={{ flex: 1 }}>
//             <HeaderTxt title={"Service Date"} marginTop={30} />
//             <View
//               style={{
//                 width: "100%",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 alignSelf: "center",
//                 marginTop: 8,
//               }}
//             >
//               <FlatList
//                 style={{ width: "86%" }}
//                 data={this.state.date_array}
//                 keyExtractor={(item, index) => index.toString()}
//                 horizontal={true}
//                 showsHorizontalScrollIndicator={false}
//                 ItemSeparatorComponent={() => (
//                   <View style={{ width: 16, backgroundColor: "#00000000" }} />
//                 )}
//                 extraData={this.state.refreshTime}
//                 renderItem={({ item, index }) => {
//                   return (
//                     <TouchableOpacity
//                       style={{
//                         height: 76,
//                         width: 96,
//                         alignItems: "center",
//                         justifyContent: "center",
//                         borderColor: item.isSelected ? "#FF5C22" : "#D1D2D4",
//                         borderWidth: 1,
//                         borderRadius: 5,
//                         backgroundColor: item.isSelected ? "#FFF5EC" : "#FFF",
//                       }}
//                       onPress={() => {
//                         this.state.date_array.map((itemData, itemIndex) => {
//                           if (itemIndex == index) {
//                             itemData.isSelected = !item.isSelected;
//                             this.setState({
//                               dateValue: moment(item.subTitle, "MMM Do").format(
//                                 "DD-MM-YYYY"
//                               ),
//                             });
//                             this.validateData();
//                           } else {
//                             itemData.isSelected = false;
//                           }
//                         });
//                         this.setState({ refreshTime: !this.state.refreshTime });
//                       }}
//                       activeOpacity={1}
//                     >
//                       <Text
//                         style={{
//                           fontSize: 12,
//                           fontWeight: "700",
//                           color: "#000",
//                           marginTop: 8,
//                         }}
//                       >
//                         {item.title}
//                       </Text>
//                       <Text
//                         style={{ fontSize: 12, color: "#80859F", marginTop: 8 }}
//                       >
//                         {item.subTitle}
//                       </Text>
//                     </TouchableOpacity>
//                   );
//                 }}
//               />
//             </View>

//             <HeaderTxt title={"Service Time"} marginTop={30} />
//             <View
//               style={{
//                 width: "100%",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 alignSelf: "center",
//                 marginTop: 8,
//               }}
//             >
//               <FlatList
//                 style={{ width: "86%" }}
//                 data={this.state.time_array}
//                 keyExtractor={(item, index) => index.toString()}
//                 horizontal={true}
//                 showsHorizontalScrollIndicator={false}
//                 ItemSeparatorComponent={() => (
//                   <View style={{ width: 16, backgroundColor: "#00000000" }} />
//                 )}
//                 extraData={this.state.refreshTime}
//                 renderItem={({ item, index }) => {
//                   return (
//                     <TouchableOpacity
//                       style={{
//                         height: 76,
//                         width: 96,
//                         alignItems: "center",
//                         justifyContent: "center",
//                         borderColor: item.isSelected ? "#FF5C22" : "#D1D2D4",
//                         borderWidth: 1,
//                         borderRadius: 5,
//                         backgroundColor: item.isSelected ? "#FFF5EC" : "#FFF",
//                       }}
//                       onPress={() => {
//                         this.state.time_array.map((itemData, itemIndex) => {
//                           if (itemIndex == index) {
//                             itemData.isSelected = !item.isSelected;
//                             this.setState({
//                               timeValue: moment(item.title, "hA").format(
//                                 "hh:mm"
//                               ),
//                             });
//                             this.validateData();
//                           } else {
//                             itemData.isSelected = false;
//                           }
//                         });
//                         this.setState({ refreshTime: !this.state.refreshTime });
//                       }}
//                       activeOpacity={1}
//                     >
//                       <Text
//                         style={{
//                           fontSize: 12,
//                           fontWeight: "700",
//                           color: "#000",
//                           marginTop: 8,
//                         }}
//                       >
//                         {item.title}
//                       </Text>
//                     </TouchableOpacity>
//                   );
//                 }}
//               />
//             </View>
//             <HeaderTxt title={"Parked in a garage?"} marginTop={16} />

//             <View
//               style={{
//                 height: 44,
//                 width: "86%",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 alignSelf: "center",
//                 marginTop: 3,
//                 borderRadius: 5,
//                 borderColor: "rgba(116,122,147,0.5)",
//                 borderWidth: 1,
//               }}
//             >
//               <Image
//                 source={AssetsImages.icon_dropdown_off}
//                 style={{
//                   height: 16,
//                   width: 16,
//                   resizeMode: "contain",
//                   position: "absolute",
//                   right: 15,
//                 }}
//               />

//               <SelectInput
//                 mode="dropdown"
//                 value={this.state.parkedGarageValue}
//                 options={this.state.parkedGarage}
//                 buttonsViewStyle={{
//                   backgroundColor: "#FF5C22",
//                   height: 44,
//                   alignItems: "center",
//                 }}
//                 buttonsTextStyle={{
//                   fontSize: 15,
//                   color: "#fff",
//                   fontWeight: "900",
//                   fontFamily: "Avenir",
//                 }}
//                 style={{ height: 44, width: "100%", justifyContent: "center" }}
//                 labelStyle={{
//                   width: "89%",
//                   paddingLeft: 10,
//                   fontSize: 16,
//                   color: "#000",
//                 }}
//                 onSubmitEditing={this.onSubmitEditingParkedGarage.bind(this)}
//               />
//             </View>
//             {this.state.parkedGarageValue == "Yes" ? (
//               <View>
//                 <HeaderTxt
//                   title={"What floor are you parked on?"}
//                   marginTop={16}
//                 />

//                 <View
//                   style={{
//                     height: 44,
//                     width: "86%",
//                     flexDirection: "row",
//                     alignItems: "center",
//                     alignSelf: "center",
//                     marginTop: 3,
//                     borderRadius: 5,
//                     borderColor: "rgba(116,122,147,0.5)",
//                     borderWidth: 1,
//                   }}
//                 >
//                   <Image
//                     source={AssetsImages.icon_dropdown_off}
//                     style={{
//                       height: 16,
//                       width: 16,
//                       resizeMode: "contain",
//                       position: "absolute",
//                       right: 15,
//                     }}
//                   />

//                   <SelectInput
//                     value={this.state.floorValue}
//                     options={this.state.floorList}
//                     buttonsViewStyle={{
//                       backgroundColor: "#FF5C22",
//                       height: 44,
//                       alignItems: "center",
//                     }}
//                     buttonsTextStyle={{
//                       fontSize: 15,
//                       color: "#fff",
//                       fontWeight: "900",
//                       fontFamily: "Avenir",
//                     }}
//                     style={{
//                       height: 44,
//                       width: "100%",
//                       justifyContent: "center",
//                     }}
//                     labelStyle={{
//                       width: "89%",
//                       paddingLeft: 10,
//                       fontSize: 16,
//                       color: "#000",
//                     }}
//                     onSubmitEditing={this.onSubmitEditingFloor.bind(this)}
//                   />
//                 </View>
//               </View>
//             ) : null}

//             <HeaderTxt title={"Additional Notes"} marginTop={16} />

//             <View
//               style={{
//                 width: "86%",
//                 justifyContent: "flex-start",
//                 borderRadius: 5,
//                 alignItems: "center",
//                 alignSelf: "center",
//                 marginTop: 3,
//                 borderColor: "rgba(116,122,147,0.5)",
//                 borderWidth: 1,
//               }}
//             >
//               <TextInput
//                 style={{
//                   width: "100%",
//                   paddingHorizontal: 10,
//                   fontSize: 16,
//                   color: "#000",
//                   marginVertical: 9,
//                 }}
//                 placeholder=""
//                 placeholderTextColor={"rgba(0,0,0,0.4)"}
//                 value={this.state.notes}
//                 onChangeText={(text) => {
//                   this.setState({ notes: text }, () => {
//                     this.validateData();
//                   });
//                 }}
//                 onBlur={() => {}}
//                 onPressSubmit={() => {
//                   this.setState({ keyboardVerticalOffsetValue: 0 });
//                 }}
//                 numberOfLines={5}
//                 multiline={true}
//                 maxHeight={90}
//               />
//             </View>
//             <HeaderTxt title={"Add as recurring service?"} marginTop={16} />
//             <View
//               style={{
//                 height: 44,
//                 width: "86%",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 alignSelf: "center",
//                 marginTop: 3,
//                 borderRadius: 5,
//                 borderColor: "rgba(116,122,147,0.5)",
//                 borderWidth: 1,
//               }}
//             >
//               <Image
//                 source={AssetsImages.icon_dropdown_off}
//                 style={{
//                   height: 16,
//                   width: 16,
//                   resizeMode: "contain",
//                   position: "absolute",
//                   right: 15,
//                 }}
//               />

//               <SelectInput
//                 value={this.state.recurringValue}
//                 options={this.state.recurringList}
//                 buttonsViewStyle={{
//                   backgroundColor: "#FF5C22",
//                   height: 44,
//                   alignItems: "center",
//                 }}
//                 buttonsTextStyle={{
//                   fontSize: 15,
//                   color: "#fff",
//                   fontWeight: "900",
//                   fontFamily: "Avenir",
//                 }}
//                 style={{ height: 44, width: "100%", justifyContent: "center" }}
//                 labelStyle={{
//                   width: "89%",
//                   paddingLeft: 10,
//                   fontSize: 16,
//                   color: "#000",
//                 }}
//                 onSubmitEditing={this.onSubmitEditingrecurring.bind(this)}
//               />
//             </View>
//           </ScrollView>

//           <TxtFullScreenBtn
//             title={"ADD VEHICLE"}
//             onPress={() => {
//               var data = {
//                 deliveryFee: "10.5",
//                 membership: "yes",
//               };

//               this.state.orderData.schedule_date = this.state.dateValue;
//               this.state.orderData.schedule_time = this.state.timeValue;
//               this.state.orderData.recurringService = this.state.recurringValue;
//               this.state.orderData.additionalNotes = this.state.notes;
//               this.state.orderData.inGarage = this.state.parkedGarageValue;
//               if (this.state.parkedGarageValue == "Yes") {
//                 this.state.orderData.floor = this.state.floorValue;
//               }
//               this.state.orderData.deliveryFee = "10.5";
//               this.state.orderData.Payment = "200";

//               console.log(JSON.stringify(this.state.orderData));

//               this.props.navigation.navigate("OrderDetails", {
//                 orderData: this.state.orderData,
//                 isFromCheckout: true,
//               });
//             }}
//             disabled={this.state.is_btn_disabled}
//             containerStyle={{
//               backgroundColor: this.state.is_btn_disabled
//                 ? "#D1D2D4"
//                 : "#FF5C22",
//               marginTop: 10,
//               marginBottom: 16,
//             }}
//           />
//         </View>
//       </SafeAreaContainer>
//     );
//   }
// }

import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Animated,
  Modal,
  Keyboard,
  ScrollView,
} from "react-native";
import { FreshChat_APP_ID, FreshChat_APP_KEY } from "../../api/api_config";
import {
  Freshchat,
  FreshchatConfig,
  FaqOptions,
  ConversationOptions,
  FreshchatUser,
  FreshchatMessage,
  FreshchatNotificationConfig,
} from "react-native-freshchat-sdk";
import BtnWithImage from "../../components/btn_with_image";
import AssetsImages from "../../res";
import SafeAreaContainer from "../../components/safearea_container";
import styles from "./styles";
import TxtFullScreenBtn from "../../components/txt_full_screen_btn";
import HeaderTxt from "../../components/header_txt";
import SelectInput from "react-native-select-input-ios";
import moment from "moment";
import { CONST } from "../../utils/constants";
import Colors from "../../constants/Colors";
export default class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,
      parkedGarages: false,
      is_selected_home: true,
      is_btn_disabled: true,
      is_boat_seleted: false,
      parkedGarage: [
        { value: "Select", label: "Select" },
        { value: "No", label: "No" },
        { value: "Yes", label: "Yes" },
      ],
      company: [
        { value: "Select", label: "Select" },
        { value: "No", label: "No" },
        { value: "Yes", label: "Yes" },
      ],
      companyfloorList: [
        { value: "Select", label: "Select" },
        { value: "Google", label: "Google" },
        { value: "Facebook", label: "Facebook" },
        { value: "Microsoft", label: "Microsoft" },
      ],
      floorList: [
        { value: "0", label: "0" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
      ],
      parkedGarageValue: "",
      comapanyValue: "",
      floorValue: "0",
      CompanyfloorValue: "",

      time_array: [
        {
          title: "8AM",
          isSelected: false,
        },
        {
          title: "11AM",
          isSelected: false,
        },
        {
          title: "2PM",
          isSelected: false,
        },
        {
          title: "6PM",
          isSelected: false,
        },
      ],
      date_array: [],
      refreshTime: true,
      timeValue: "",
      dateValue: "",

      recurringList: [
        { value: "Select", label: "Select" },
        { value: "No", label: "No" },
        { value: "Yes Every Week", label: "Yes Every Week" },
        { value: "Yes Every 2 Weeks", label: "Yes Every 2 Weeks" },
        { value: "Yes Every 4 Weeks", label: "Yes Every 4 Weeks" },
        { value: "Yes Every 6 Weeks", label: "Yes Every 6 Weeks" },
      ],
      recurringValue: "",
      notes: "",
      Compantnotes: "",
      orderData: {},
    };
  }
  initFreshChat = () => {
    const APP_ID = FreshChat_APP_ID;
    const APP_KEY = FreshChat_APP_KEY;
    const freshchatConfig = new FreshchatConfig(APP_ID, APP_KEY);
    Freshchat.init(freshchatConfig);
  };
  onPress = (data) => this.setState({ data });
  setupUserFreshchat = () => {
    let freshchatUser = new FreshchatUser();
    freshchatUser.firstName = this.props.user_data.data.name;
    freshchatUser.lastName = this.props.user_data.data.name;
    freshchatUser.email = this.props.user_data.data.email;
    freshchatUser.phoneCountryCode = "+91";
    freshchatUser.phone = this.props.user_data.data.phone;
    Freshchat.setUser(freshchatUser);
  };

  resetUserFreshchat = () => {
    Freshchat.resetUser();
  };
  //TODO:- class life cycle
  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: "Schedule",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 26,
        fontFamily: "Avenir",
        alignSelf: "center",
      },
      headerLeft: () => (
        <BtnWithImage
          img={AssetsImages.icon_back}
          btnImgStyle={{ height: 22, width: 22 }}
          onPress={() => {
            this.props.navigation.goBack();
          }}
          btnStyle={{ marginLeft: 8 }}
        />
      ),
      headerRight: () => (
        <BtnWithImage
          img={AssetsImages.icon_chat}
          btnImgStyle={{ height: 18, width: 18 }}
          onPress={() => {
            Freshchat.showFAQs();
            //this.setupUserFreshchat;
            // this.resetUserFreshchat;
            Freshchat.showConversations();
            // this.props.navigation.navigate("Schedule");
          }}
          btnStyle={{ marginRight: 8 }}
        />
      ),
    });

    var dateData = [];

    var i = 0;
    while (i < 30) {
      const dt = moment().add(i, "days");
      const day = dt.format("ddd");
      const date = dt.format("MMM DD");
      if (day !== "Sun") {
        const data = {
          title: i === 0 ? "Today" : day,
          subTitle: date,
          isSelected: false,
        };
        dateData.push(data);
      }
      i++;
      //   console.log(i);
      //   if (i == 0) {
      //     var day = {
      //       title: "Today",
      //       subTitle: moment().format("MMM DD"),
      //       isSelected: false,
      //     };
      //     dateData.push(day);
      //     i++;
      //   } else {
      //     var day = {
      //       title: moment().add(i, "days").format("ddd"),
      //       subTitle: moment().add(i, "days").format("MMM DD"),
      //       isSelected: false,
      //     };
      //     dateData.push(day);
      //     i++;
      //   }
    }
    console.log(JSON.stringify(dateData));
    this.setState({
      date_array: dateData,
      orderData: this.props.route.params.orderData,
    });

    if (this.props.route.params.is_selected_home) {
      let time_array;
      if (this.props.route.params.orderData.vehicle[0]?.type === "auto") {
        time_array = [
          { title: "06 PM - 09 PM", isSelected: false },
          {
            title: "09 PM - 12 AM",
            isSelected: false,
          },
        ];
      } else {
        time_array = [
          {
            title: "09 AM - 12 PM",
            isSelected: false,
          },
          {
            title: "12 PM - 04PM",
            isSelected: false,
          },
        ];
      }
      this.setState({ time_array });
    } else {
      const time_array = [
        {
          title: "08 AM - 05 PM",
          isSelected: false,
        },
      ];
      this.setState({ time_array });
    }
  }
  validateData = () => {
    if (
      this.state.timeValue.length != 0 &&
      this.state.dateValue.length != 0 &&
      this.state.parkedGarageValue.length != 0 &&
      this.state.notes.length != 0 &&
      // this.state.Compantnotes.length != 0 &&
      this.state.recurringValue.length != 0 &&
      this.state.recurringValue != "Select" &&
      this.state.parkedGarageValue != "Select"
    ) {
      this.setState({ is_btn_disabled: false });
    } else {
      this.setState({ is_btn_disabled: true });
    }
  };

  onSubmitEditingFloor(value) {
    this.setState(
      {
        floorValue: value,
      },
      () => {
        this.validateData();
      }
    );
  }

  onSubmitCompanyEditingFloor(value) {
    this.setState(
      {
        CompanyfloorValue: value,
      },
      () => {
        this.validateData();
      }
    );
  }
  onSubmitEditingParkedGarage(value) {
    this.setState(
      {
        parkedGarageValue: value,
      },
      () => {
        this.validateData();
      }
    );
  }
  onSubmitEditingCompany(value) {
    this.setState(
      {
        comapanyValue: value,
      },
      () => {
        this.validateData();
      }
    );
  }
  onSubmitEditingrecurring(value) {
    this.setState(
      {
        recurringValue: value,
      },
      () => {
        this.validateData();
      }
    );
  }

  render() {
    return (
      <SafeAreaContainer
        title={this.state.title}
        bodyTxt={this.state.bodyTxt}
        isModalOpened={this.state.isPopUpOpened}
        onDismiss={() => {
          this.setState({ isPopUpOpened: false });
        }}
      >
        <View style={styles.container}>
          <ScrollView style={{ flex: 1 }}>
            <HeaderTxt title={"Service Date"} marginTop={30} />
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                marginTop: 8,
              }}
            >
              <Modal
                animated={false}
                animationType="none"
                transparent={true}
                visible={this.state.parkedGarages}
                onRequestClose={() => {
                  console.log("Modal has been closed.");
                }}
              >
                {/*All views of Modal*/}
                <View
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
                        color: Colors.InputText,
                        fontSize: 12,

                        fontFamily: "Avenir",
                        width: "86%",
                        marginTop: 12,
                        alignSelf: "center",
                        textAlign: "left",
                      }}
                      allowFontScaling={false}
                    >
                      How ofter would you like service at the time/day?
                    </Text>
                    <View
                      style={{
                        width: "100%",
                        marginTop: 15,
                        marginBottom: 10,
                        height: 1,
                        backgroundColor: Colors.InputText,
                      }}
                    />
                    <FlatList
                      style={{ width: "100%", marginTop: 15 }}
                      data={this.state.recurringList}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => {
                        return (
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                              width: "100%",
                            }}
                          >
                            <Text
                              style={{
                                color: Colors.origin,
                                marginLeft: 10,
                                fontFamily: "Avenir",
                                fontWeight: "bold",
                                fontSize: 20,
                              }}
                            >
                              {item.value}
                            </Text>
                            <View
                              style={{
                                width: "100%",
                                marginTop: 15,
                                marginBottom: 10,
                                height: 1,
                                backgroundColor: Colors.InputText,
                              }}
                            />
                          </View>
                        );
                      }}
                    />
                    <View>
                      <TxtFullScreenBtn
                        title={"REMOVE RECURRING SERVICE "}
                        onPress={() => {
                          this.setState({
                            isVisible: !this.state.parkedGarages,
                          });
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
                  </View>
                </View>
              </Modal>
              <FlatList
                style={{ width: "86%" }}
                data={this.state.date_array}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                  <View style={{ width: 16, backgroundColor: "#00000000" }} />
                )}
                extraData={this.state.refreshTime}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={{
                        height: 76,
                        width: 96,
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor: item.isSelected ? "#FF5C22" : "#D1D2D4",
                        borderWidth: 1,
                        borderRadius: 5,
                        backgroundColor: item.isSelected ? "#FFF5EC" : "#FFF",
                      }}
                      onPress={() => {
                        this.state.date_array.map((itemData, itemIndex) => {
                          if (itemIndex == index) {
                            itemData.isSelected = !item.isSelected;
                            this.setState({
                              dateValue: moment(item.subTitle, "MMM DD").format(
                                "DD-MM-YYYY"
                              ),
                            });
                            this.validateData();
                          } else {
                            itemData.isSelected = false;
                          }
                        });
                        this.setState({ refreshTime: !this.state.refreshTime });
                      }}
                      activeOpacity={1}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "700",
                          color: "#000",
                          marginTop: 8,
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{ fontSize: 12, color: "#80859F", marginTop: 8 }}
                      >
                        {item.subTitle}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            <HeaderTxt title={"Service Time"} marginTop={30} />
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                marginTop: 8,
              }}
            >
              <FlatList
                style={{ width: "86%" }}
                data={this.state.time_array}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                  <View style={{ width: 16, backgroundColor: "#00000000" }} />
                )}
                extraData={this.state.refreshTime}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={{
                        height: 76,
                        width: 96,
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor: item.isSelected ? "#FF5C22" : "#D1D2D4",
                        borderWidth: 1,
                        borderRadius: 5,
                        backgroundColor: item.isSelected ? "#FFF5EC" : "#FFF",
                      }}
                      onPress={() => {
                        this.state.time_array.map((itemData, itemIndex) => {
                          if (itemIndex == index) {
                            itemData.isSelected = !item.isSelected;
                            this.setState({
                              timeValue: moment(item.title, "hA").format(
                                "hh:mm"
                              ),
                            });
                            this.validateData();
                          } else {
                            itemData.isSelected = false;
                          }
                        });
                        this.setState({ refreshTime: !this.state.refreshTime });
                      }}
                      activeOpacity={1}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "700",
                          color: "#000",
                          marginTop: 8,
                        }}
                      >
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            <HeaderTxt title={"Parked in a garage?"} marginTop={16} />

            <View
              style={{
                height: 44,
                width: "86%",
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
                marginTop: 3,
                borderRadius: 5,
                borderColor: "rgba(116,122,147,0.5)",
                borderWidth: 1,
              }}
            >
              <Image
                source={AssetsImages.icon_dropdown_off}
                style={{
                  height: 16,
                  width: 16,
                  resizeMode: "contain",
                  position: "absolute",
                  right: 15,
                }}
              />

              <SelectInput
                value={this.state.parkedGarageValue}
                options={this.state.parkedGarage}
                buttonsViewStyle={{
                  backgroundColor: "#FF5C22",
                  height: 44,
                  alignItems: "center",
                }}
                buttonsTextStyle={{
                  fontSize: 15,
                  color: "#fff",
                  fontWeight: "900",
                  fontFamily: "Avenir",
                }}
                style={{ height: 44, width: "100%", justifyContent: "center" }}
                labelStyle={{
                  backgroundColor: "#FF5C22",
                  width: "89%",
                  paddingLeft: 10,
                  fontSize: 16,
                  color: "#000",
                }}
                onSubmitEditing={this.onSubmitEditingParkedGarage.bind(this)}
              />
            </View>
            {this.state.parkedGarageValue == "Yes" ? (
              <View>
                <HeaderTxt
                  title={"What floor are you parked on?"}
                  marginTop={16}
                />

                <View
                  style={{
                    height: 44,
                    width: "86%",
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                    marginTop: 3,
                    borderRadius: 5,
                    borderColor: "rgba(116,122,147,0.5)",
                    borderWidth: 1,
                  }}
                >
                  <Image
                    source={AssetsImages.icon_dropdown_off}
                    style={{
                      height: 16,
                      width: 16,
                      resizeMode: "contain",
                      position: "absolute",
                      right: 15,
                    }}
                  />

                  <SelectInput
                    value={this.state.floorValue}
                    options={this.state.floorList}
                    buttonsViewStyle={{
                      backgroundColor: "#FF5C22",
                      height: 44,
                      alignItems: "center",
                    }}
                    buttonsTextStyle={{
                      fontSize: 15,
                      color: "#fff",
                      fontWeight: "900",
                      fontFamily: "Avenir",
                    }}
                    style={{
                      height: 44,
                      width: "100%",
                      justifyContent: "center",
                    }}
                    labelStyle={{
                      backgroundColor: "#FF5C22",
                      width: "89%",
                      paddingLeft: 10,
                      fontSize: 16,
                      color: "#000",
                    }}
                    onSubmitEditing={this.onSubmitEditingFloor.bind(this)}
                  />
                </View>
              </View>
            ) : null}

            <HeaderTxt title={"Additional Notes"} marginTop={16} />

            <View
              style={{
                width: "86%",
                justifyContent: "flex-start",
                borderRadius: 5,
                alignItems: "center",
                alignSelf: "center",
                marginTop: 3,
                borderColor: "rgba(116,122,147,0.5)",
                borderWidth: 1,
              }}
            >
              <TextInput
                style={{
                  width: "100%",
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: "#000",
                  marginVertical: 9,
                }}
                placeholder=""
                placeholderTextColor={"rgba(0,0,0,0.4)"}
                value={this.state.notes}
                onChangeText={(text) => {
                  this.setState({ notes: text }, () => {
                    this.validateData();
                  });
                }}
                onBlur={() => {}}
                onPressSubmit={() => {
                  this.setState({ keyboardVerticalOffsetValue: 0 });
                }}
                numberOfLines={5}
                multiline={true}
                maxHeight={90}
              />
            </View>
            <HeaderTxt title={"Add as recurring service?"} marginTop={16} />
            <TouchableOpacity
              onPress={() => {
                this.setState({ parkedGarages: true });
              }}
              style={{
                height: 44,
                width: "86%",
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
                marginTop: 3,
                borderRadius: 5,
                borderColor: "rgba(116,122,147,0.5)",
                borderWidth: 1,
              }}
            >
              <Image
                source={AssetsImages.icon_dropdown_off}
                style={{
                  height: 16,
                  width: 16,
                  resizeMode: "contain",
                  position: "absolute",
                  right: 15,
                }}
              />

              {/* <SelectInput
                value={this.state.recurringValue}
                options={this.state.recurringList}
                buttonsViewStyle={{
                  backgroundColor: "#FF5C22",
                  height: 44,
                  alignItems: "center",
                }}
                buttonsTextStyle={{
                  fontSize: 15,
                  color: "#fff",
                  fontWeight: "900",
                  fontFamily: "Avenir",
                }}
                style={{ height: 44, width: "100%", justifyContent: "center" }}
                labelStyle={{
                  backgroundColor: "#FF5C22",
                  width: "89%",
                  paddingLeft: 10,
                  fontSize: 16,
                  color: "#000",
                }}
                onSubmitEditing={this.onSubmitEditingrecurring.bind(this)}
              /> */}
              <Text>jhlkjj</Text>
            </TouchableOpacity>
          </ScrollView>

          <TxtFullScreenBtn
            title={"ADD VEHICLE"}
            onPress={() => {
              var data = {
                deliveryFee: "10.5",
                membership: "yes",
              };
              // this.state.orderData.schedule_date = this.state.dateValue;
              this.state.orderData.schedule_date = this.state.dateValue;

              this.state.orderData.schedule_time = this.state.timeValue;
              this.state.orderData.recurringService = this.state.recurringValue;
              this.state.orderData.additionalNotes = this.state.notes;

              this.state.orderData.inGarage = this.state.parkedGarageValue;

              this.state.orderData.floor = this.state.floorValue;

              this.state.orderData.deliveryFee = "10.5";
              this.state.orderData.Payment = "200";

              console.log(JSON.stringify(this.state.orderData));

              this.props.navigation.navigate("OrderDetails", {
                orderData: this.state.orderData,
                isFromCheckout: true,
                paymentmethod: this.props.route.params.paymentmethod,
                carddata: this.props.route.params.carddata,
                paydat: "",
              });
            }}
            disabled={this.state.is_btn_disabled}
            containerStyle={{
              backgroundColor: this.state.is_btn_disabled
                ? "#D1D2D4"
                : "#FF5C22",
              marginTop: 10,
              marginBottom: 16,
            }}
          />
        </View>
      </SafeAreaContainer>
    );
  }
}
