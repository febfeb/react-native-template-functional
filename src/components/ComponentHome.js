import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { setCounter } from '../store/actions';

export default function ComponentHome(props) {
    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter);

    return (
        <>
            <Text>Counter: {counter}</Text>

            <TouchableOpacity style={styles.button} onPress={() => {
                let _counter = counter + 1;
                dispatch(setCounter(_counter));
            }}>
                <Text>Tambah Counter</Text>
            </TouchableOpacity>
        </>
    );
}

const styles = {
    button: {
        backgroundColor: '#00FF00',
        padding: 10,
        marginTop: 10,
    }
};