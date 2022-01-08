import React, { Component } from "react";
import { Dimensions } from "react-native";
import { TouchableOpacity, ActivityIndicator, View, Text, Image } from 'react-native';
import color from "../utils/color";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default class BottomTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menus: [
                { type: 'reguler', label: "HOME", image: require('../assets/images/icon-bottom-home.png'), target: "Home" },
                { type: 'reguler', label: "MY TEAMS", image: require('../assets/images/icon-bottom-myteam.png'), target: "MyTeams" },
                { type: 'big', label: "REC", image: require('../assets/images/button-rec.png'), target: "Streaming" },
                { type: 'reguler', label: "ALL TEAMS", image: require('../assets/images/icon-bottom-allteam.png'), target: "AllTeams" },
                { type: 'reguler', label: "EVENTS", image: require('../assets/images/icon-bottom-event.png'), target: "AllEvents" },
            ],
        };
    }
    render() {
        return (
            <View style={styles.border}>
                <View style={styles.buttonBigBg} />

                <View style={styles.wrapper}>
                    {this.state.menus.map((menu, key) => {
                        if (menu.type == 'reguler') {
                            if (key == this.props.selected) {
                                return (
                                    <TouchableOpacity style={styles.button} key={key} onPress={() => {
                                        this.props.onClick(menu.target);
                                        this.setState({ selected: key });
                                    }}>
                                        <Image source={menu.image} style={styles.iconActive} />
                                        <Text style={styles.textActive}>{menu.label}</Text>
                                    </TouchableOpacity>
                                );
                            } else {
                                return (
                                    <TouchableOpacity style={styles.button} key={key} onPress={() => {
                                        this.props.onClick(menu.target);
                                        this.setState({ selected: key });
                                    }}>
                                        <Image source={menu.image} style={styles.icon} />
                                        <Text style={styles.text}>{menu.label}</Text>
                                    </TouchableOpacity>
                                );
                            }
                        } else {
                            return (
                                <View style={{
                                    width: 90,
                                    height: 40
                                }} key={key} />
                            );
                        }
                    })}

                    <TouchableOpacity style={styles.buttonBig} onPress={() => {
                        this.props.onClick("Streaming");
                        this.setState({ selected: 2 });
                    }}>
                        <Image source={require('../assets/images/button-rec.png')} style={styles.bigIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = {
    border: {
        borderTopWidth: 1,
        borderColor: color.gray,
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        elevation: 3
    },
    button: {
        width: 70,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    buttonBigBg: {
        position: 'absolute',
        left: (SCREEN_WIDTH / 2) - 53,
        bottom: -3,
        width: 106,
        height: 106,
        backgroundColor: '#fff',
        borderRadius: 57,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: color.gray,
    },
    buttonBig: {
        position: 'absolute',
        left: (SCREEN_WIDTH / 2) - 50,
        bottom: 0,
        width: 100,
        // padding: 10,
        backgroundColor: '#fff',
        borderRadius: 57,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    iconActive: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        tintColor: '#45C3FA',
        marginBottom: 5,
    },
    text: {
        fontSize: 10,
        textAlign: 'center'
    },
    textActive: {
        fontSize: 10,
        textAlign: 'center',
        color: '#45C3FA',
    },
    bigIcon: {
        width: 100,
        height: 100,
    }
};