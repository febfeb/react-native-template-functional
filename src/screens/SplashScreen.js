import React, { Component, useCallback, useEffect } from "react";
import { ActivityIndicator, Image, View, Dimensions, Text, Linking } from "react-native";
import { getUniqueId } from 'react-native-device-info';
import { setPubnub, setSplash, setUser } from "../store/actions";
import { useDispatch } from "react-redux";
import color from "../utils/color";
import AppConfig from '../config/app';
import Pubnub from "pubnub";

export default function SplashScreen(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        Linking.addEventListener('url', (data) => {
            if (data.url) {
                props.navigation.navigate("ResetPasswordConfirm", { url: data.url });
            }
        });

        let initialUrl = Linking.getInitialURL();
        if (initialUrl) {
            console.log("InitialURL", initialUrl);
            if (initialUrl.url) {
                this.setState({ hasDeeplink: true });
                this.props.navigation.navigate("ResetPasswordConfirm", { url: initialUrl.url });
            }
        }

        const pubnub = new Pubnub({
            subscribeKey: AppConfig.PUBNUB_SUB_KEY,
            publishKey: AppConfig.PUBNUB_PUB_KEY,
        });
        let uuid = getUniqueId();
        pubnub.setUUID(uuid);
        dispatch(setPubnub(pubnub));

        setTimeout(() => {
            console.log("Change to false");
            dispatch(setSplash(false));
        }, 1000);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.topSide}>
                <Text style={{ color: color.black, marginBottom: 10, fontSize: 12, fontWeight: '600' }}>LOADING</Text>
                <ActivityIndicator color={color.white} size='large' />
            </View>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
    },
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: 0
    },
    topSide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
};