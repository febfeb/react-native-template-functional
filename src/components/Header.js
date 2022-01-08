import React, { Component, useState } from "react";
import { StatusBar, Image, TouchableOpacity, ActivityIndicator, View, Text } from 'react-native';
import color from "../utils/color";
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { Platform } from "react-native";
import { TextInput } from "react-native";

export default function Header(props) {
    const [search, setSearch] = useState('');

    //let withSearch = props.withSearch ?? false;

    console.log("Header props", props);

    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor={color.header} />
            {Platform.OS == 'ios' && <View style={styles.iosHeader} />}
            <View style={styles.wrapper}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.ellipseButton} onPress={() => {
                        props.navigation?.openDrawer();
                    }}>
                        <Entypo name='menu' color={color.white} size={25} />
                    </TouchableOpacity>
                    <View style={styles.center}>
                        <Image source={require('../assets/images/logo-header.png')} style={styles.logo} />
                    </View>
                    <TouchableOpacity style={styles.userButton} onPress={() => {
                        props.navigation?.navigate("MyProfile");
                    }}>
                        <Image source={require('../assets/images/logo-default.png')} style={styles.userImage} />
                    </TouchableOpacity>
                </View>

                {props.withSearch && (
                    <View style={styles.textInputWrapper}>
                        <Feather name='search' size={25} color={color.header} />
                        <TextInput
                            style={styles.textInput}
                            placeholder='Search for a team ...'
                            placeholderTextColor='#5A5A5A'
                            value={search}
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={(search) => {
                                setSearch(search);
                            }}
                        />
                    </View>
                )}
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
        alignItems: 'center',
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