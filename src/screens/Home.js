import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import ComponentHome from '../components/ComponentHome';
import FloatingCounter from '../components/FloatingCounter';
import { setCounter } from '../store/actions';

export default function Home(props) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ComponentHome />

            <FloatingCounter />
        </SafeAreaView>
    );
}

const styles = {
    button: {
        backgroundColor: '#00FF00',
        padding: 10,
        marginTop: 10,
    }
};