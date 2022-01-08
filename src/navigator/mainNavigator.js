import React, { useEffect } from "react"
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SideMenu from "./SideMenu";
import SplashScreen from "../screens/SplashScreen";
import Home from "../screens/Home";
import { useDispatch, useSelector } from "react-redux";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => {
            return <SideMenu {...props} />
        }}>
            <Drawer.Screen name="Home" component={Home} options={() => ({ headerShown: false })} />
        </Drawer.Navigator>
    );
}

const cardInterpolatorOptions = {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const DashboardStack = () => {
    return (
        <Stack.Navigator initialRouteName="HomeStack" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeStack" component={HomeNavigator} />
        </Stack.Navigator>
    );
}

export default function AppContainer() {
    const user = useSelector((state) => state.user);
    const splash = useSelector((state) => state.splash);

    //console.log("SplashScreen", splash);

    // useEffect(() => {
    //     console.log("User changed", user);
    // }, [user]);

    // useEffect(() => {
    //     console.log("splash changed", splash);
    // }, [splash]);

    if (splash === true) {
        return <SplashScreen />
    } else {
        return (
            <NavigationContainer>
                <Tab.Navigator tabBar={() => null}>
                    <Tab.Screen name="Dashboard" component={DashboardStack} options={() => ({ headerShown: false })} />
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}