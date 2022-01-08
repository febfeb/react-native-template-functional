import React, { Component } from "react";
import { TouchableOpacity, Image, View, Text } from 'react-native';

export default class TeamIcon extends Component {

    render() {
        let { uri, size } = this.props;

        //console.log("Team URL", { uri, size });

        if (size == null) {
            size = 30;
        }

        if (uri != null && uri.substr(0, 1) == '/') {
            uri = null;
        }

        return (
            <View style={[styles.box, { width: size, height: size, borderRadius: size / 2 }]}>
                <Image source={require('../assets/images/logo-white-mini.png')} style={[styles.icon, { width: size, height: size, borderRadius: size / 2 }]} />
                {uri != null && <Image source={{ uri }} style={[styles.icon, { width: size, height: size, borderRadius: size / 2 }]} />}
            </View>
        );
    }
}

const styles = {
    box: {
        backgroundColor: 'black',
    },
    icon: {
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: 15,
    },
};