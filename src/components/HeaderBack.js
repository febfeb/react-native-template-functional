import React, { Component, useState } from "react";
import { StatusBar, Image, TouchableOpacity, ActivityIndicator, View, Text } from 'react-native';
import color from "../utils/color";
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { Platform } from "react-native";
import { TextInput } from "react-native";

export default function HeaderBack(props) {

    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor={color.header} />
            {Platform.OS == 'ios' && <View style={styles.iosHeader} />}
            <View style={styles.wrapper}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.ellipseButton} onPress={() => {
                        props.navigation?.goBack();
                    }}>
                        <Entypo name='arrow-left' color={color.white} size={25} />
                    </TouchableOpacity>
                    <View style={styles.center}>
                        {props.children}
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = {
    iosHeader: {
        backgroundColor: color.header,
        height: 100,
        width: '100%',
        position: 'absolute',
        top: -50
    },
    wrapper: {
        paddingHorizontal: 16,
        backgroundColor: color.header,
        paddingTop: Platform.OS == 'ios' ? 0 : 12,
        paddingBottom: 12
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10,
        // alignItems: 'center',
    },
    logo: {
        height: 40,
        width: 120,
    },
    ellipseButton: {
        backgroundColor: '#3D3D3D',
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userImage: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    textInputWrapper: {
        marginTop: 10,
        backgroundColor: color.white,
        flexDirection: 'row',
        borderRadius: 5,
        paddingHorizontal: 12,
        paddingVertical: Platform.OS == 'ios' ? 10 : 2,
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16
    }
};