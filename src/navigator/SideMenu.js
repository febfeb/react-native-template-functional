import React, { useCallback, useMemo, useState } from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert
} from "react-native";
import color from "../utils/color";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/actions";
import ImageUtils from "../utils/ImageUtils";

const userMenus = [
    {
        icon: require('../assets/images/icon-bottom-home.png'),
        label: "Home",
        target: "Home",
    },
    {
        icon: require('../assets/images/icon-bottom-myteam.png'),
        label: "MyTeams",
        target: "My Teams",
    },
    {
        icon: require('../assets/images/icon-bottom-allteam.png'),
        label: "All Teams",
        target: "AllTeams",
    },
    {
        icon: require('../assets/images/icon-bottom-event.png'),
        label: "All Events",
        target: "AllEvents",
    },
];

export default function SideMenu(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    console.log("SideMenu:User", user);

    const logout = useCallback(() => {
        dispatch(setUser(null));
        // props.navigation.navigate("Auth");
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* <View style={styles.photoWrap}>
                <Image source={ImageUtils.getSafeImage(user.image)} style={styles.photo} />

                <TouchableOpacity style={styles.editProfileButton}
                    activeOpacity={0.8}
                    onPress={() => {
                        props.navigation.closeDrawer();
                        if (!isProvider) {
                            props.navigation.navigate("UserProfile");
                        } else {
                            props.navigation.navigate("ProviderProfile");
                        }
                    }}>
                    <Text style={styles.editProfileText}>Edit profile</Text>
                </TouchableOpacity>
            </View> 

            <Text style={styles.name}>{user.name ?? "(No Name)"}</Text>

            <View style={styles.line} />*/}

            <View style={styles.logoWrap}>
                <Image source={require('../assets/images/logo-white.png')}
                    style={styles.logo}
                    resizeMode="contain" />
            </View>

            {userMenus.map((item, index) => {
                if (item == null) {
                    return <View style={styles.line} key={index} />
                }
                return (
                    <TouchableOpacity
                        key={index}
                        style={styles.menu}
                        activeOpacity={0.9}
                        onPress={() => {
                            props.navigation.closeDrawer();
                            props.navigation.navigate(item.target);
                        }}>
                        <Image source={item.icon} style={styles.menuIcon} />
                        <Text style={styles.menuLabel}>{item.label}</Text>
                    </TouchableOpacity>
                );
            })}

            <View style={styles.line} />

            <TouchableOpacity
                style={styles.menu}
                activeOpacity={0.9}
                onPress={() => {
                    props.navigation.closeDrawer();
                    Alert.alert(
                        'Information',
                        'Are you sure want to logout?',
                        [
                            { text: 'No', onPress: () => { }, style: 'cancel' },
                            {
                                text: 'Yes', onPress: () => {
                                    logout();
                                }
                            },
                        ],
                        { cancelable: false }
                    );
                }}>
                <Text style={styles.logoutButton}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.header,
        paddingHorizontal: 20,
        paddingVertical: 20,
        flex: 1,
    },
    logoWrap: {
        alignItems: 'center',
        marginBottom: 50,
    },
    logo: {
        width: 90,
        height: 90,
    },


    menuIcon: {
        width: 24,
        height: 24,
        tintColor: color.white,
    },
    photoWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    photo: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    editProfileButton: {
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 7,
        backgroundColor: color.primary,
        marginLeft: 10,
    },
    editProfileText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: color.white,
    },
    name: {
        fontSize: 16,
        color: color.black,
        marginBottom: 3,
    },
    type: {
        fontSize: 14,
        color: "#4F4F4F",
        marginBottom: 20,
    },
    line: {
        height: 1,
        backgroundColor: "#444",
        marginBottom: 20,
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    menuLabel: {
        fontSize: 16,
        color: color.white,
        flex: 1,
        marginLeft: 10,
    },
    logoutButton: {
        fontSize: 16,
        color: color.primary,
        marginLeft: 10,
    }
});