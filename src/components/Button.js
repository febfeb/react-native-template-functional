import React, { useState } from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ActivityIndicator
} from "react-native";
import color from "../utils/color";


export default function Button(props) {
    let theme = props.theme;
    let backgroundStyle = {};
    let textStyle = {};

    if (theme == "primary" || theme == null) {
        backgroundStyle = {
            backgroundColor: color.black,
        };
        textStyle = {
            color: color.white,
        };
    } else if (theme == "secondary" || theme == "secondary-light") {
        backgroundStyle = {
            backgroundColor: color.white,
            borderColor: color.black,
            borderWidth: 1,
        };
        textStyle = {
            color: color.black,
        };
    } else if (theme == "secondary-dark") {
        backgroundStyle = {
            backgroundColor: color.black,
            borderColor: color.primary,
            borderWidth: 1,
        };
        textStyle = {
            color: color.white,
        };
    } else if (theme == "light") {
        backgroundStyle = {
            backgroundColor: '#FFE5E3',
        };
        textStyle = {
            color: color.primary,
        };
    }

    let loading = props.loading ?? false;
    let isDisabled = props.disabled ?? false;

    if(isDisabled) {
        backgroundStyle = {
            backgroundColor: "#E0E0E0",
        };
        textStyle = {
            color: "#BDBDBD",
        };
    }

    return (
        <TouchableOpacity activeOpacity={1} style={[styles.backgroundStyle, backgroundStyle, props.style]}
            onPress={() => {
                if (!loading && !isDisabled) {
                    props.onPress != null && props.onPress();
                }
            }}>
            {!loading && <Text style={[styles.textStyle, textStyle]}>{props.children}</Text>}
            {loading && <ActivityIndicator color={textStyle.color ?? color.white} />}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: color.primary,
        // borderRadius: 10,
        height: 55,
        justifyContent: "center",
        alignItems: "center",
    },
    textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.white,
    }
});