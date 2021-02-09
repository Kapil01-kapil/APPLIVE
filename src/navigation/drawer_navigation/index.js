import React from "react";
import { Image } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Sidemenu from "../../screens/sidemenu";
import Dashboard from "../../screens/dashboard";
import Locations from "../../screens/locations";
import Vehicles from "../../screens/vehicles";
import Payment from "../../screens/payment";
import OrderHistory from "../../screens/order_history";
import OrderDetails from "../../screens/order_details";
import Membership from "../../screens/membership";
import FAQ from "../../screens/faq";
import Terms from "../../screens/terms";
import Privacy from "../../screens/privacy";
import Profile from "../../screens/profile";
import AddVehicle from "../../screens/add_vehicle";
import SelectVehicle from "../../screens/select_vehicle";
import Schedule from "../../screens/schedule";
import AddPayment from "../../screens/add_payment";
import ProfileChangePassword from "../../screens/profile_change_password";
import SelectPayment from "../../screens/select_payment";
import GooglePay from "../../screens/google_pay";
import Paypal from "../../screens/Paypal";
import payments from "../../screens/payments";

const DashboardStack = createStackNavigator();
function DashboardStackFunc() {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="Dashboard" component={Dashboard} />
      <DashboardStack.Screen name="AddVehicle" component={AddVehicle} />
      <DashboardStack.Screen name="SelectVehicle" component={SelectVehicle} />
      <DashboardStack.Screen name="Schedule" component={Schedule} />
      <DashboardStack.Screen name="OrderDetails" component={OrderDetails} />
      <DashboardStack.Screen name="Payment" component={Payment} />
      <DashboardStack.Screen name="AddPayment" component={AddPayment} />
      <DashboardStack.Screen name="SelectPayment" component={SelectPayment} />
      <DashboardStack.Screen name="GooglePay" component={GooglePay} />
      <DashboardStack.Screen name="Paypal" component={Paypal} />
    </DashboardStack.Navigator>
  );
}

const LocationsStack = createStackNavigator();
function LocationsStackFunc() {
  return (
    <LocationsStack.Navigator>
      <LocationsStack.Screen name="Locations" component={Locations} />
    </LocationsStack.Navigator>
  );
}

const VehiclesStack = createStackNavigator();
function VehiclesStackFunc() {
  return (
    <VehiclesStack.Navigator>
      <VehiclesStack.Screen name="Vehicles" component={Vehicles} />
      <VehiclesStack.Screen name="AddVehicle" component={AddVehicle} />
    </VehiclesStack.Navigator>
  );
}

const PaymentStack = createStackNavigator();
function PaymentStackFunc() {
  return (
    <PaymentStack.Navigator>
      <PaymentStack.Screen name="Payment" component={Payment} />
      <PaymentStack.Screen name="AddPayment" component={AddPayment} />
      <PaymentStack.Screen name="SelectPayment" component={SelectPayment} />
      <PaymentStack.Screen name="GooglePay" component={GooglePay} />
      <PaymentStack.Screen name="Paypal" component={Paypal} />
    </PaymentStack.Navigator>
  );
}

const OrderHistoryStack = createStackNavigator();
function OrderHistoryStackFunc() {
  return (
    <OrderHistoryStack.Navigator>
      <OrderHistoryStack.Screen name="OrderHistory" component={OrderHistory} />
      <OrderHistoryStack.Screen name="OrderDetails" component={OrderDetails} />
    </OrderHistoryStack.Navigator>
  );
}

const MembershipStack = createStackNavigator();
function MembershipStackFunc() {
  return (
    <MembershipStack.Navigator>
      <MembershipStack.Screen name="Membership" component={Membership} />
      <MembershipStack.Screen name="Payment" component={Payment} />
      <MembershipStack.Screen name="AddPayment" component={AddPayment} />
      <MembershipStack.Screen name="Schedule" component={Schedule} />
      <MembershipStack.Screen name="SelectPayment" component={SelectPayment} />
      <MembershipStack.Screen name="GooglePay" component={GooglePay} />
      <MembershipStack.Screen name="Paypal" component={Paypal} />
    </MembershipStack.Navigator>
  );
}

const FAQStack = createStackNavigator();
function FAQStackFunc() {
  return (
    <FAQStack.Navigator>
      <FAQStack.Screen name="FAQ" component={FAQ} />
    </FAQStack.Navigator>
  );
}

const TermsStack = createStackNavigator();
function TermsStackFunc() {
  return (
    <TermsStack.Navigator>
      <TermsStack.Screen name="Terms" component={Terms} />
    </TermsStack.Navigator>
  );
}

const PrivacyStack = createStackNavigator();
function PrivacyStackFunc() {
  return (
    <PrivacyStack.Navigator>
      <PrivacyStack.Screen name="Privacy" component={Privacy} />
    </PrivacyStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileStackFunc() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen
        name="ProfileChangePassword"
        component={ProfileChangePassword}
      />
      <ProfileStack.Screen name="Payment" component={Payment} />
      <ProfileStack.Screen name="AddPayment" component={AddPayment} />
      <ProfileStack.Screen name="SelectPayment" component={SelectPayment} />
      <ProfileStack.Screen name="GooglePay" component={GooglePay} />
      <ProfileStack.Screen name="Paypal" component={Paypal} />
    </ProfileStack.Navigator>
  );
}

const PaymentsStack = createStackNavigator();
function PaymentsStackFunc() {
  return (
    <PaymentsStack.Navigator>
      <PaymentsStack.Screen name="Payments" component={payments} />
      <PaymentsStack.Screen name="AddPayment" component={AddPayment} />
      <PaymentsStack.Screen name="SelectPayment" component={SelectPayment} />
      <PaymentsStack.Screen name="GooglePay" component={GooglePay} />
      <PaymentsStack.Screen name="Paypal" component={Paypal} />
    </PaymentsStack.Navigator>
  );
}
//TODO:- Drawer
const Drawer = createDrawerNavigator();
function AppDrawer() {
  return (
    <Drawer.Navigator
      // drawerType="front"
      drawerContent={(props) => <Sidemenu {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={DashboardStackFunc} />
      <Drawer.Screen name="Vehicles" component={VehiclesStackFunc} />
      <Drawer.Screen name="Locations" component={LocationsStackFunc} />
      <Drawer.Screen name="Payment" component={PaymentStackFunc} />
      <Drawer.Screen name="OrderHistory" component={OrderHistoryStackFunc} />
      <Drawer.Screen name="Membership" component={MembershipStackFunc} />
      <Drawer.Screen name="FAQ" component={FAQStackFunc} />
      <Drawer.Screen name="Terms" component={TermsStackFunc} />
      <Drawer.Screen name="Privacy" component={PrivacyStackFunc} />
      <Drawer.Screen name="Profile" component={ProfileStackFunc} />
      <Drawer.Screen name="Payments" component={PaymentsStackFunc} />
    </Drawer.Navigator>
  );
}

export default AppDrawer;
