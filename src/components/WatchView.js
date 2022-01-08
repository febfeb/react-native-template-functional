import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import TeamIcon from './TeamIcon';
import Entypo from 'react-native-vector-icons/Entypo';
import color from '../utils/color';

export default function WatchView(props) {

    let showStreaming = props.streamingCredential != null;

    if (showStreaming) {
        return (
            <TouchableOpacity activeOpacity={0.8} style={styles.watchList} onPress={() => {
                props.onPress();
            }}>
                <Image source={require('../assets/images/watch-stream.jpg')} style={styles.bgWatch} />
                <View style={{ padding: 8, flexDirection: 'row', position: 'absolute' }}>
                    <TeamIcon uri={props.homeImage} size={30} />
                    <View style={{ width: 5 }} />
                    <TeamIcon uri={props.awayImage} size={30} />
                </View>
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.playButton}>
                        <Entypo name='controller-play' size={15} color={color.white} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    } else {
        return (
            <View style={styles.watchList}>
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>

                    <Entypo name='warning' size={25} color={color.black} />
                    <Text style={{ textAlign: 'center', fontSize: 11 }}>No Livestream{'\n'}Available</Text>
                </View>
            </View>
        );
    }
}

const styles = {
    watchList: {
        width: 124,
        height: 209,
        marginRight: 8,
        marginVertical: 16,
        backgroundColor: "#CCC",
    },
    bgWatch: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    playButton: {
        width: 34,
        height: 34,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderWidth: 3,
        borderColor: color.white
    },
};