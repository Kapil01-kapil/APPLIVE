import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text
} from 'react-native';

export default class PricingView extends Component {

    render() {
        return (
            <View style={{ flexDirection: 'row', width: "100%", height: 50, alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }}>
                    <View style={{ height: 36, width: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 8, borderWidth: 1, borderColor: "#FAC135", backgroundColor: "#FDE265" }}>
                        <Text style={{fontSize: 14, fontWeight: 'bold', fontFamily: "Avenir" }}>{this.props.priceTagValue}</Text>
                    </View>
                    <Text style={{ marginLeft: 16, fontSize: 13, fontWeight: '500', fontFamily: "Avenir" }}>{this.props.title}</Text>
                </View>
                <Text style={{ marginRight: 22, fontSize: 20, fontWeight: 'bold', fontFamily: "Avenir" }}>{this.props.pricing}</Text>
            </View>
        );
    }
}

