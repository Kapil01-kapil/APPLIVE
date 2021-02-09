import React, { Component } from 'react';
import { StyleSheet, Text} from 'react-native';

export default class HeaderTxt extends Component {
    render() {
        return (
            <Text style={[styles.txt_style, {marginTop: this.props.marginTop, marginBottom: this.props.marginBottom }, this.props.txtStyle]}>{this.props.title}</Text>
        );
    }
}


var styles = StyleSheet.create({
    txt_style: { 
        fontSize: 10, 
        color: '#80859F', 
        width: "80%", 
        marginLeft: 25, 
        fontWeight: 'bold', 
        fontFamily: "Avenir",

    },

});