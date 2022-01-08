import React, { useCallback, useState } from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from "react-native";
import color from "../utils/color";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FacebookButton from "./FacebookButton";
import GoogleButton from "./GoogleButton";
import { AppleButton, appleAuth } from "@invertase/react-native-apple-authentication";
import SocialLogin from "../utils/SocialLogin";
import Toast from "./Toast";
import { useDispatch } from "react-redux";
import { setUser } from "../store/actions";
import { HttpRequest, HttpResponse } from "../utils/http";

export default function SocialLoginView(props) {
    const dispatch = useDispatch();
    let whiteApple = props.whiteApple ?? true;

    let navigation = props.navigation;

    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.label}>Sign in using</Text>

                <FacebookButton
                    onPress={() => {
                        SocialLogin.facebookLogin().then((res) => {
                            console.log("Res", res);
                            Toast.showSuccess("Facebook login Successful");
                            dispatch(setUser(res.data));
                        }).catch((err) => {
                            console.log("Err", err, err.response);
                            Toast.showError(HttpResponse.processMessage(err.response, "Facebook login failed"));
                        });
                    }} />

                <GoogleButton
                    onPress={() => {
                        SocialLogin.googleLogin().then((res) => {
                            console.log("Res", res);
                            Toast.showSuccess("Google login Successful");
                            dispatch(setUser(res.data));
                        }).catch((err) => {
                            console.log("Err", err, err.response);
                            Toast.showError(HttpResponse.processMessage(err.response, "Google login failed"));
                            SocialLogin.googleLogout();
                        });
                    }} />
            </View>

            <View style={{ height: 10 }} />

            {appleAuth.isSupported && (
                <>
                    <View style={{ height: 10 }} />

                    <AppleButton
                        buttonStyle={whiteApple ? AppleButton.Style.WHITE : AppleButton.Style.BLACK}
                        buttonType={AppleButton.Type.SIGN_IN}
                        style={{
                            height: 50, // You must specify a height
                        }}
                        onPress={() => {
                            SocialLogin.appleLogin().then((res) => {
                                console.log("Res", res);
                                Toast.showSuccess("Apple login Successful");
                                dispatch(setUser(res.data));

                                if (userType) {
                                    selectType();
                                }
                            }).catch((err) => {
                                console.log("Err", err, err.response);
                                Toast.showError(HttpResponse.processMessage(err.response, "Apple login failed"));
                            });
                        }}
                    />
                </>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    label: {
        flex: 1,
        fontSize: 18,
        color: color.black,
    }
});