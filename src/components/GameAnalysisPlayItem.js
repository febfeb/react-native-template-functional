import React, { Component } from "react";
import { TouchableOpacity, ActivityIndicator, View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import color from "../utils/color";

export default class GameAnalysisPlayItem extends Component {
    render() {
        let { onPress, children, label } = this.props;

        return (
            <TouchableOpacity activeOpacity={0.8} style={styles.row} onPress={() => {
                if (onPress) {
                    onPress();
                }
            }}>
                <Text style={styles.label}>{children}</Text>
                <Text style={styles.rightLabel}>{label}</Text>
                <MaterialIcons name="keyboard-arrow-right" size={30} color={'#D7D7D8'} />
            </TouchableOpacity>
        );
    }
}

const styles = {
    row: {
        flexDirection: 'row',
        height: 50,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    label: {
        flex: 1,
        fontSize: 16,
        color: color.text
    },
    rightLabel: {
        fontSize: 16,
        color: color.text
    }
};