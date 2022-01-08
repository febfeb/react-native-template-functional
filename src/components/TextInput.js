import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput as Input, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import color from '../utils/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TextInput(props) {
    const [showPassword, setShowPassword] = useState(false);

    let isSecureTextEntry = props.secureTextEntry ?? false;

    const togglePassword = useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword]);

    return (
        <View style={[styles.container, props.containerStyle]}>
            <Text style={styles.label}>{props.label}</Text>
            <View style={[styles.inputContainer, props.wrapperStyle]}>
                {isSecureTextEntry == false && (
                    <>
                        <Input {...props} style={styles.input} secureTextEntry={false} autoCapitalize='none' autoCorrect={false} />
                    </>
                )}

                {isSecureTextEntry == true && (
                    <>
                        <Input {...props} style={[styles.input, props.inputStyle]} secureTextEntry={!showPassword} autoCapitalize='none' autoCorrect={false} />
                        <TouchableOpacity style={styles.eyeButton} onPress={togglePassword}>
                            {showPassword && <MaterialCommunityIcons name='eye-off-outline' size={20} color={color.black} />}
                            {!showPassword && <MaterialCommunityIcons name='eye-outline' size={20} color={color.black} />}
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    label: {
        fontSize: 14,
        color: color.black,
        marginBottom: 5,
    },
    inputContainer: {
        borderBottomWidth: 1,
        borderColor: "#A5A4A4",
        height: 55,
        flexDirection: 'row',
        alignItems: "center",
        // paddingHorizontal: 15,
    },
    input: {
        flex: 1,
    },
    eyeButton: {
        paddingLeft: 15,
        paddingVertical: 10,
    },
});