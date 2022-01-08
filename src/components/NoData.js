import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import color from "../utils/color";

class NoData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // show: false
        }
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <MaterialCommunityIcons name='information-outline' size={30} color={color.text} />
                <Text style={styles.text}>{this.props.children}</Text>
            </View>
        )
    }
}
const styles = {
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        flex: 1,
        minHeight: 200
    },
    text: {
        fontSize: 14,
        color: color.text
    }
}


export default NoData;