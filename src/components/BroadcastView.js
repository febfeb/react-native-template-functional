import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, View, Text, LayoutAnimation } from "react-native";
import { NodeCameraView, NodePlayerView } from "react-native-nodemediaclient";
import { useSelector } from 'react-redux';
import GameAnalysis from './GameAnalysis';
import StreamingMessage from './StreamingMessage';
import StreamingMessageInput from './StreamingMessageInput';
import StreamingToolbar from './StreamingToolbar';
import Toast from './Toast';

const { width, height } = Dimensions.get("window");

/**
    public static final int VIDEO_PPRESET_16X9_270 = 0;
    public static final int VIDEO_PPRESET_16X9_360 = 1;
    public static final int VIDEO_PPRESET_16X9_480 = 2;
    public static final int VIDEO_PPRESET_16X9_540 = 3;
    public static final int VIDEO_PPRESET_16X9_720 = 4;

    public static final int VIDEO_PPRESET_4X3_270 = 10;
    public static final int VIDEO_PPRESET_4X3_360 = 11;
    public static final int VIDEO_PPRESET_4X3_480 = 12;
    public static final int VIDEO_PPRESET_4X3_540 = 13;
    public static final int VIDEO_PPRESET_4X3_720 = 14;

    public static final int VIDEO_PPRESET_1X1_270 = 20;
    public static final int VIDEO_PPRESET_1X1_360 = 21;
    public static final int VIDEO_PPRESET_1X1_480 = 22;
    public static final int VIDEO_PPRESET_1X1_540 = 23;
    public static final int VIDEO_PPRESET_1X1_720 = 24;
 */

const config = {
    cameraConfig: {
        cameraId: 0,
        cameraFrontMirror: false
    },
    videoConfig: {
        preset: 22, bitrate: 400000, profile: 1, fps: 15, videoFrontMirror: true
    },
    audioConfig: {
        bitrate: 32000, profile: 1, samplerate: 44100
    }
};

export default function BroadcastView(props) {
    let streamKey = props.streamKey ?? '';
    const url = `rtmps://global-live.mux.com:443/app/${streamKey}`;
    const cameraRef = useRef();
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
            <NodeCameraView
                style={{ width, height: height }}
                ref={cameraRef}
                outputUrl={url}
                camera={config.cameraConfig}
                audio={config.audioConfig}
                video={config.videoConfig}
                autopreview={true}
            />

            {isMessageVisible && <StreamingMessage message={messages} />}

            <GameAnalysis />

            <View style={{ position: 'absolute', bottom: 0, left: 0, width: width }}>
                <StreamingToolbar
                    type='Broadcast'
                    isFocusMessage={isMessageVisible}
                    viewerCount={totalViewer}
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