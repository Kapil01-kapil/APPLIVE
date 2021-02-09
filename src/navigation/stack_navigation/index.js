//Imports
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../../screens/splash'
import Onboarding from '../../screens/onboarding'
import Login from '../../screens/login';
import Signup from '../../screens/signup';
import SignupOption from '../../screens/signup_option'
import SignupCellNo from '../../screens/signup_cell_no'
import SignupVerifyNo from '../../screens/signup_verify_no';
import AppDrawer from "../drawer_navigation";
import ForgotPassword from "../../screens/forgot_password";
import reset_password from "../../screens/reset_password";

// Sidemenu Dashboard
const StackNavigator = createStackNavigator();

function StackNavigation() {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator screenOptions={{gestureEnabled: false}}>
        <StackNavigator.Screen name="Splash" component={Splash} options={{ headerShown: false, gesturesEnabled: false }} />
        <StackNavigator.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false, gesturesEnabled: false }} />
        <StackNavigator.Screen name="Login" component={Login} options={{ headerShown: false, gesturesEnabled: false }} />
        <StackNavigator.Screen name="Signup" component={Signup} options={{ headerShown: false, gesturesEnabled: false }} />
        <StackNavigator.Screen name="SignupOption" component={SignupOption} options={{ headerShown: false, gesturesEnabled: false }} />
        <StackNavigator.Screen name="SignupCellNo" component={SignupCellNo} options={{ headerShown: false, gesturesEnabled: false }} />
        <StackNavigator.Screen name="SignupVerifyNo" component={SignupVerifyNo} options={{ headerShown: false, gesturesEnabled: false }} />
        <StackNavigator.Screen name="AppDrawer" component={AppDrawer} options={{ headerShown: false, gesturesEnabled: false }} />
        <StackNavigator.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false, gesturesEnabled: false }} />
        <StackNavigator.Screen name="reset_password" component={reset_password} options={{ headerShown: false, gesturesEnabled: false }} />

      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation;