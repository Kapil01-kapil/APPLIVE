import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, Platform } from 'react-native'
import { GooglePay, RequestDataType, AllowedCardNetworkType, AllowedCardAuthMethodsType } from 'react-native-google-pay'

const allowedCardNetworks: AllowedCardNetworkType[] = ["AMEX", "DISCOVER",  "JCB", "MASTERCARD", "VISA"]
const allowedCardAuthMethods: AllowedCardAuthMethodsType[] = ['PAN_ONLY', 'CRYPTOGRAM_3DS']
const stripeRequestData: RequestDataType = {
  cardPaymentMethod: {
    tokenizationSpecification: {
      type: 'PAYMENT_GATEWAY',
      gateway: 'stripe',
      gatewayMerchantId: '13474330361229841865',
      stripe: {
        publishableKey: 'pk_test_AUrE92WoAMzjQEn4fThEEkzR',
        version: '2018-11-08',
      },
    },
    allowedCardNetworks,
    allowedCardAuthMethods,
  },
  transaction: {
    totalPrice: '1',
    totalPriceStatus: 'FINAL',
    currencyCode: 'INR',
  },
  merchantName: 'Ezfill holdings Inc',
}


export default class AndroidPayScreen extends Component {
  componentDidMount() {

    this.payWithGooglePay(stripeRequestData)
    // Set the environment before the payment request
    if (Platform.OS === 'android') {
      GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST)
    }
  }

  payWithGooglePay = (requestData: RequestDataType) => {
    // Check if Google Pay is available
    GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods).then((ready) => {
      if (ready) {
        // Request payment token
        GooglePay.requestPayment(requestData)
          .then(this.handleSuccess)
          .catch(this.handleError)
      }
    })
  }

  handleSuccess = (token: string) => {
    // Send a token to your payment gateway
    Alert.alert('Success', `token: ${token}`)
  }

  handleError = (error: any) => console.log('Error', `${error.code}\n${error.message}`)

  render() {
    return (
      <View style={styles.container}>
       
        {/* <TouchableOpacity
          style={[styles.button, styles.stripe]}
          onPress={() => this.payWithGooglePay(stripeRequestData)}
        >
          <Text style={styles.buttonText}>Stripe</Text>
        </TouchableOpacity> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 18,
    color: '#222',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#34a853',
    borderRadius: 8,
    height: 56,
    paddingHorizontal: 24,
    justifyContent: 'center',
    marginVertical: 8,
  },
  direct: {
    backgroundColor: '#db7d35',
  },
  stripe: {
    backgroundColor: '#556cd6',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
})