import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, PanResponder } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import color from '../utils/color';

export default class StreamingToolbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLive: false,
            status: 'play',
            type: "Broadcast" /** Broadcast, Streaming */,
            streamingTimeInSeconds: 0,
            streamingTimeText: '',
            isPauseTime: true,
            isLoading: false,
        }
    }

    componentDidMount() {
        if (this.props.type) {
            this.setState({
                type: this.props.type
            })
        }
    }

    componentDidUpdate(prev) {
        if (prev.type != this.state.type) {
            if (this.props.type) {
                this.setState({
                    type: this.props.type
                })
            }
        }
    }

    startStream() {
        let { timeStatus } = this.state
        this.setState({ isLive: true, isPauseTime: false }, this.timeUp);
    }

    timeUp() {
        this.interval = setInterval(() => {
            let totalSeconds = this.state.streamingTimeInSeconds

            let second = this.pad(totalSeconds % 60)
            let minutes = this.pad(parseInt(totalSeconds / 60 % 60))
            let hours = this.pad(parseInt(totalSeconds / 3600))

            let text = `${hours}:${minutes}:${second}`
            this.setState({
                streamingTimeInSeconds: this.state.streamingTimeInSeconds + 1,
                streamingTimeText: text
            })
        }, 1000);
    }

    pauseStream() {
        this.setState({ isLive: false, isPauseTime: true })
        clearInterval(this.interval)
    }

    pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }

    render() {
        console.log("PropsStreamingToolbar", this.props);
        let { isLive, type, status } = this.state

        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#EBEBEB' }}>

                {type == "Broadcast" && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        {!isLive && (
                            <TouchableOpacity onPress={() => {
                                this.startStream();
                                this.props.onPlay();
                            }}>
                                <MaterialCommunityIcons style={styles.icon} name="play" size={25} color={'#2E2E30'} />
                            </TouchableOpacity>
                        )}

                        {isLive && (
                            <TouchableOpacity onPress={() => {
                                this.pauseStream();
                                this.props.onPause();
                            }}>
                                <MaterialCommunityIcons style={styles.icon} name="pause-circle-outline" size={25} color={'#2E2E30'} />
                            </TouchableOpacity>
                        )}

                        {isLive && (
                            <TouchableOpacity onPress={() => {
                                this.props.onPause();
                                this.setState({ isLive: false, isPauseTime: true, streamingTimeInSeconds: 0 })
                                clearInterval(this.interval)
                            }}>
                                <MaterialCommunityIcons style={styles.icon} name="stop-circle-outline" size={25} color={'#2E2E30'} />
                            </TouchableOpacity>
                        )}

                        {isLive && (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Animated.Text style={[
                                    styles.streamingText,
                                ]}>LIVE</Animated.Text>
                                <Text style={styles.streamingTime}>{this.state.streamingTimeText}</Text>
                            </View>
                        )}

                        {!isLive && (
                            <Text style={styles.streamingText}>Start Broadcasting</Text>
                        )}
                    </View>
                )}

                {type == "Streaming" && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                        {status == "play" && (
                            <TouchableOpacity onPress={() => {
                                this.setState({ status: "paused" })
                                this.props.onPause()
                            }}>
                                <MaterialCommunityIcons style={styles.icon} name="pause-circle-outline" size={25} color={'#2E2E30'} />
                            </TouchableOpacity>
                        )}

                        {status == "paused" && (
                            <TouchableOpacity onPress={() => {
                                this.setState({ status: "play" })
                                this.props.onPlay()
                            }}>
                                <MaterialCommunityIcons style={styles.icon} name="play-speed" size={25} color={'#2E2E30'} />
                            </TouchableOpacity>
                        )}

                        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {status == "paused" && (
                                <Text style={[styles.streamingText]}>{status.toUpperCase()}</Text>
                            )}
                            <Text style={styles.streamingTime}>00:35</Text>
                        </View> */}

                    </View>
                )}

                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Text style={styles.streamingUserView}>{this.props.viewerCount}</Text>
                    <MaterialCommunityIcons style={styles.icon} name="account-circle-outline" size={25} color={color.text} />

                    <TouchableOpacity onPress={this.props.onPressMessageIcon}>
                        <MaterialCommunityIcons style={[styles.icon, { color: this.props.isFocusMessage ? '#45C3FA' : '#2E2E30' }]} name="message-outline" size={25} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.props.onPressShare}>
                        <Fontisto name="share" size={20} color='#2E2E30' />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


let styles = StyleSheet.create({

    streamingText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#DB0D0D'
    },
    streamingTime: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#DB0D0D'
    },
    icon: {
        marginRight: 10
    },
    iconCircle: {
        marginRight: 10,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 100,
        width: 20, height: 20,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    streamingUserView: {
        fontSize: 18,
        marginRight: 10
    },
})