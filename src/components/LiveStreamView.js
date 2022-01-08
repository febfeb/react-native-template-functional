import React, { useCallback, useEffect, useRef, useState } from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ActivityIndicator,
    Dimensions
} from "react-native";
import { useSelector } from "react-redux";
import { NodeCameraView, NodePlayerView } from "react-native-nodemediaclient";
import StreamingMessage from "./StreamingMessage";
import GameAnalysis from "./GameAnalysis";
import StreamingToolbar from "./StreamingToolbar";
import StreamingMessageInput from "./StreamingMessageInput";
import Toast from "./Toast";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function LiveStreamView(props) {
    let playbackId = props.playbackId;

    const playerRef = useRef();
    const url = "https://stream.mux.com/" + playbackId + ".m3u8";

    const pubnub = useSelector(state => state.pubnub);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const [totalViewer, setTotalViewer] = useState(0);

    useEffect(() => {
        //Subscribe to pubnub
        let channelId = props.playbackId;

        const incomingListener = {
            message: (msg) => {
                console.log("Incoming Message", channelId, msg);

                let message = msg.message;
                if (message.type == "chat") {
                    let _messages = [...messages];

                    _messages.push({
                        icon: require('../assets/images/logo-default.png'),
                        message: message.data
                    })
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

                    setMessages(_messages);
                }

                this.refreshViewer();
            },
            presence: (pres) => {
                console.log("Presence", pres);

                refreshViewer();
            }
        };
        pubnub.subscribe({ channels: [channelId] });
        pubnub.addListener(incomingListener);
        pubnub.publish({
            message: {
                type: "system",
                data: "login"
            },
            channel: channelId,
        }, (status, response) => {
            // handle status, response
        });

        refreshViewer();

        return () => {
            pubnub.removeListener(incomingListener);
            pubnub.unsubscribeAll();
        };
    }, [pubnub]);

    const refreshViewer = useCallback(() => {
        let channelId = props.playbackId;
        pubnub.hereNow({
            channels: [channelId],
            includeUUIDs: false,
            includeState: true,
        }, (status, response) => {
            console.log("HereNow", { status, response });
            // handle status, response

            if (response) {
                setTotalViewer(response.totalOccupancy);
            } else {
                console.log("Response Is Empty");
            }
        });
    }, [pubnub, props.playbackId]);

    const sendMessage = useCallback(() => {
        let channelId = props.playbackId;
        pubnub.publish({
            message: {
                type: "chat",
                data: message
            },
            channel: channelId,
        }, (status, response) => {
            // handle status, response
        });

        setMessage("");
    }, [message]);

    return (
        <View style={{ flex: 1 }}>
            <NodePlayerView
                style={{ height: height }}
                ref={playerRef}
                inputUrl={url}
                scaleMode={"ScaleAspectFill"}
                bufferTime={300}
                maxBufferTime={1000}
                autoplay={true}
            />
            {isMessageVisible && <StreamingMessage message={messages} />}

            <GameAnalysis />

            <View style={{ position: 'absolute', bottom: 0, left: 0, width: width }}>
                <StreamingToolbar
                    type='Streaming'
                    isFocusMessage={isMessageVisible}
                    viewerCount={totalViewer}
                    onPlay={() => {
                        console.log("Play", playerRef.current);
                        playerRef.current.start();
                    }}
                    onPause={() => {
                        console.log("Pause", playerRef.current);
                        playerRef.current.stop();
                    }}
                    onPressShare={() => {
                        Toast.showSuccess("Share button triggered");
                    }}
                    onPressMessageIcon={() => {
                        setIsMessageVisible(!isMessageVisible);
                        //LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                    }} />

                {isMessageVisible && (
                    <StreamingMessageInput
                        messageValue={message}
                        onChangeTextMessage={setMessage}
                        sendMessage={() => {
                            if (message != '') {
                                sendMessage();
                            }
                        }} />
                )}
            </View>
        </View>
    );
}