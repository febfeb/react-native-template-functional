import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import color from '../utils/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class FacebookButton extends React.Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.main}
                activeOpacity={0.8}
                onPress={() => {
                    this.props.onPress != null && this.props.onPress();
                }}>
                <MaterialCommunityIcons name="facebook" color={color.black} size={40} />
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
});

export default FacebookButton