import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { setCounter } from '../store/actions';

export default function FloatingCounter(props) {
    const counter = useSelector(state => state.counter);

    console.log("Counter", counter);

    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>{counter}</Text>
        </View>
    );
}

const styles = {
    wrapper: {
        backgroundColor: 'blue',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    text: {
        fontSize: 20,
        color: "#fff",
    }
};