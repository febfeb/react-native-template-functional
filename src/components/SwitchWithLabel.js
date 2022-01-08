import React from 'react';
import { View, Text, Switch, StyleSheet, Image } from 'react-native';
import color from '../utils/color';
import TeamIcon from './TeamIcon';

class SwitchWithLabel extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TeamIcon uri={this.props.image} size={40} />
                <Text style={styles.label}>{this.props.label}</Text>
                <Switch {...this.props} />
            </View>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#F1F1F1'
    },
    label: {
        color: color.text,
        fontSize: 14,
        flex: 1,
        marginLeft: 10
    },
    icon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10
    },
})

export { SwitchWithLabel }