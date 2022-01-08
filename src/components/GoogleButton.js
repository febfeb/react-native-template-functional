import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import color from '../utils/color';
import AntDesign from 'react-native-vector-icons/AntDesign';

class GoogleButton extends React.Component {
    render() {
        let label = this.props.label;

        if (label == null) {
            label = "Sign in with Google";
        }

        return (
            <TouchableOpacity
                style={styles.main}
                activeOpacity={0.8}
                onPress={() => {
                    this.props.onPress != null && this.props.onPress();
                }}>
                <AntDesign name="google" color={color.black} size={36} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 46,
        height: 46,
    },
    text: {
        color: color.white,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginRight: 50,
    }
});

export default GoogleButton