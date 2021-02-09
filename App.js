//Imports
import React, { Component } from 'react';
import StackNavigation from './src/navigation/stack_navigation';
import { Provider } from 'react-redux';
import configureStore from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';
import { Platform } from 'react-native';
import firebase from 'react-native-firebase';

import stripe from 'tipsi-stripe'

stripe.setOptions({
  publishableKey: 'pk_test_AUrE92WoAMzjQEn4fThEEkzR',
  merchantId: 'merchant.com.ezfill',
  androidPayMode: 'test',
})

const store = configureStore()
let persistor = persistStore(store)

//Main Class
export default class App extends Component {

  componentDidMount() {
    const channel = new firebase.notifications.Android.Channel(
      'channelId',
      'Channel Name',
      firebase.notifications.Android.Importance.Max
    ).setDescription('A natural description of the channel');
    firebase.notifications().android.createChannel(channel);
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      if (Platform.OS === 'android') {
    
        const localNotification = new firebase.notifications.Notification({
            soundName: 'default',
            show_in_foreground: true,
          })
          .android.setVibrate([1000, 1000])
          .android.setDefaults([firebase.notifications.Android.Defaults.Vibrate])
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          .setData(notification.data)
          .android.setChannelId('channelId') // e.g. the id you chose above
          .android.setSmallIcon('ic_launcher') // create this icon in Android Studio
          .android.setColor('#ffffff') // you can set a color here
          .android.setPriority(firebase.notifications.Android.Priority.High);
     
        firebase.notifications()
          .displayNotification(localNotification)
          .catch(
            err => 
            console.error(err)
            );
    
      } else if (Platform.OS === 'ios') {
    
        const localNotification = new firebase.notifications.Notification()
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          .setData(notification.data)
          .ios.setBadge(notification.ios.badge);
    
        firebase.notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));
    
      }
    });
    }
    
    componentWillUnmount() {
    // this is where you unsubscribe notification listner
    this.notificationListener();
    }
    

  render() {

    return (
      // <Provider store={store}>
      //   <StackNavigation />
      // </Provider>

      <Provider store={store}>

        <PersistGate loading={null} persistor={persistor}>
          <StackNavigation />
        </PersistGate>
      </Provider>

    );
  }
}

