import React from 'react';
import { View, Text, LayoutAnimation, Alert, ScrollView, TextInput, Dimensions, TouchableOpacity, StyleSheet, Animated, PanResponder } from 'react-native';
import { SwipeablePanel } from 'rn-swipeable-panel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../utils/color';
import Button from './Button';
import GameAnalysisModal from './GameAnalysisModal';
import DropShadow from "react-native-drop-shadow";
import GameAnalysisPlayItem from './GameAnalysisPlayItem';
import GameAnalysisTab from './GameAnalysisTab';

class SCircleBottom extends React.Component {
    render() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.fontDefault}>
                    <Text style={styles.fontBold}>B </Text>
                    <Text>0</Text>
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <MaterialCommunityIcons size={9} style={{ marginHorizontal: 2 }} name="circle" />
                    <MaterialCommunityIcons size={9} style={{ marginHorizontal: 2 }} name="circle-outline" />
                    <MaterialCommunityIcons size={9} style={{ marginHorizontal: 2 }} name="circle-outline" />
                </View>
            </View>
        )
    }
}

class TriangleSquare extends React.Component {
    render() {
        let rotate = { transform: [{ rotate: "45deg" }] }
        let icon = <Ionicons size={13} name="ios-square" />
        let iconOutline = <Ionicons size={13} style={{ marginHorizontal: 4 }} name="ios-square-outline" />
        return (
            <View style={{ alignItems: 'center' }}>
                <View style={rotate}>
                    {icon}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={[rotate]}>
                        {iconOutline}
                    </View>
                    <View style={[rotate]}>
                        {iconOutline}
                    </View>
                </View>
            </View>
        )
    }
}

const Team = ({ align = 'left' }) => {
    if (align == 'left') {
        return (
            <View>
                <View style={[styles.rowCenter]}>
                    <Text style={styles.fontBold}>OA</Text>
                    <Text style={{ fontSize: 12, marginHorizontal: 10 }}>Batting</Text>
                </View>
                <View style={[styles.rowCenter, { marginTop: 15 }]}>
                    <Text style={{ color: '#808080', marginRight: 10 }}>18 SS</Text>
                    <Text style={styles.fontBold}>T. Clippard</Text>
                </View>
                <Text style={[styles.fontDefault, { fontSize: 12 }]}>1st of 11, 0-0</Text>
            </View>
        )
    } else {
        return (
            <View style={{ alignItems: 'flex-end' }}>
                <View style={[styles.rowCenter]}>
                    <Text style={{ fontSize: 12, marginHorizontal: 10 }}>Batting</Text>
                    <Text style={styles.fontBold}>OA</Text>
                </View>
                <View style={[styles.rowCenter, { marginTop: 15 }]}>
                    <Text style={styles.fontBold}>T. Clippard</Text>
                    <Text style={{ color: '#808080', marginLeft: 10 }}>18 SS</Text>
                </View>
                <Text style={[styles.fontDefault, { fontSize: 12 }]}>1st of 11, 0-0</Text>
            </View>
        )
    }
}

class CurrentStep extends React.Component {
    render() {
        return (
            <View style={[
                { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F1F1F1', paddingVertical: 10, paddingHorizontal: 15, },
                this.props.mainStyle
            ]}>
                <View>
                    <Text style={styles.fontBold}>Bottom</Text>
                    <Text style={styles.fontBold}>1st</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', flex: 1 }}>
                    <SCircleBottom />
                    <SCircleBottom />
                    <SCircleBottom />
                </View>

                <TriangleSquare />
            </View>
        )
    }
}

const Step = () => {
    return (
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#EBEBEB', padding: 15 }}>
            <Text style={styles.fontDefault}>Single fielded by right fielder, Line drive to short right field. Runner on 2nd scored, runner on first advanced to third.</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.fontBold}>9:40 am</Text>
                <MaterialCommunityIcons name="dots-horizontal" size={20} color={color.text} />
            </View>
        </View>
    )
}

class ProViewScreen extends React.Component {
    render() {
        return (
            <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#EBEBEB', }}>
                <Team />
                <Text style={[styles.fontBold, { fontSize: 18 }]}>0 - 0</Text>
                <Team
                    align="right"
                />
            </View>
        )
    }
}

const PAGE_HOME = "Home";
const PAGE_PITCH = "Pitch";
const PAGE_BALL_IN_PLAY = "BallInPlay";
const PAGE_BIP_GROUND_BALL = "BIPGB";
const PAGE_BIP_HARD_GROUND_BALL = "BIPHGB";

let labelArray = {};
labelArray[PAGE_HOME] = "Add Play";
labelArray[PAGE_PITCH] = "Pitch";
labelArray[PAGE_BALL_IN_PLAY] = "Ball In Play";
labelArray[PAGE_BIP_GROUND_BALL] = "Ground Ball";
labelArray[PAGE_BIP_HARD_GROUND_BALL] = "Hard Ground Ball";

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
class GameAnalysis extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showCurrentStep: !false,
            showTeamTab: !false,
            showDetail: !false,
            isShowPlayModal: false,
            showGameAnalysis: false,

            stepIndex: 0,

            page: PAGE_HOME
        }
    }

    render() {
        let { stepIndex, page } = this.state;
        let fullHeight = SCREEN_HEIGHT - 150;
        return (

            <Animated.View style={{ position: 'absolute', zIndex: 1, width: '100%' }}>
                <GameAnalysisModal
                    title={labelArray[page]}
                    visible={this.state.isShowPlayModal}
                    onRequestClose={() => {
                        if (page == PAGE_HOME) {
                            this.setState({ isShowPlayModal: false });
                        } else if (page == PAGE_PITCH) {
                            this.setState({ page: PAGE_HOME });
                        } else if (page == PAGE_BALL_IN_PLAY) {
                            this.setState({ page: PAGE_PITCH });
                        } else if (page == PAGE_BIP_GROUND_BALL || page == PAGE_BIP_HARD_GROUND_BALL) {
                            this.setState({ page: PAGE_BALL_IN_PLAY });
                        }
                    }}
                >
                    {page == PAGE_HOME && (
                        <>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <GameAnalysisPlayItem label='' onPress={() => {
                                    this.setState({ page: PAGE_PITCH });
                                }}>Pitch</GameAnalysisPlayItem>

                                <View style={{ marginHorizontal: 15, marginTop: 10, paddingBottom: 10 }}>
                                    <Button>SAVE</Button>
                                    <Button onPress={() => {
                                        this.setState({ isShowPlayModal: false });
                                    }} style={{ marginTop: 10 }}>CANCEL</Button>
                                </View>
                            </ScrollView>
                        </>
                    )}
                    {page == PAGE_PITCH && (
                        <>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <GameAnalysisPlayItem onPress={() => {
                                    Alert.alert('Information', 'You clicked Ball');
                                }}>Ball</GameAnalysisPlayItem>
                                <GameAnalysisPlayItem onPress={() => {
                                    Alert.alert('Information', 'You clicked Called Strike');
                                }}>Called Strike</GameAnalysisPlayItem>
                                <GameAnalysisPlayItem onPress={() => {
                                    Alert.alert('Information', 'You clicked Swing & Miss');
                                }}>Swing & Miss</GameAnalysisPlayItem>

                                <View style={{ height: 10, backgroundColor: '#ddd' }} />

                                <GameAnalysisPlayItem onPress={() => {
                                    Alert.alert('Information', 'You clicked Foul Ball');
                                }}>Foul Ball</GameAnalysisPlayItem>
                                <GameAnalysisPlayItem onPress={() => {
                                    this.setState({ page: PAGE_BALL_IN_PLAY });
                                }}>Ball In Play</GameAnalysisPlayItem>

                                <View style={{ height: 10, backgroundColor: '#ddd' }} />

                                <GameAnalysisPlayItem onPress={() => {
                                    Alert.alert('Information', 'You clicked Hit By Pitch');
                                }}>Hit By Pitch</GameAnalysisPlayItem>
                                <GameAnalysisPlayItem onPress={() => {
                                    Alert.alert('Information', 'You clicked Intentional Ball');
                                }}>Intentional Ball</GameAnalysisPlayItem>
                                <GameAnalysisPlayItem onPress={() => {
                                    Alert.alert('Information', 'You clicked Intentional Walk');
                                }}>Intentional Walk</GameAnalysisPlayItem>
                                <GameAnalysisPlayItem onPress={() => {
                                    Alert.alert('Information', 'You clicked C. Interference');
                                }}>C. Interference</GameAnalysisPlayItem>
                                <GameAnalysisPlayItem onPress={() => {
                                    Alert.alert('Information', 'You clicked Illegal Pitch');
                                }}>Illegal Pitch</GameAnalysisPlayItem>

                                <View style={{ height: 10 }} />
                            </ScrollView>
                        </>
                    )}

                    {page == PAGE_BALL_IN_PLAY && (
                        <>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <GameAnalysisPlayItem onPress={() => {
                                    this.setState({ page: PAGE_BIP_GROUND_BALL });
                                }}>Ground Ball</GameAnalysisPlayItem>
                                <GameAnalysisPlayItem onPress={() => {
                                    this.setState({ page: PAGE_BIP_HARD_GROUND_BALL });
                                }}>Hard Ground Ball</GameAnalysisPlayItem>
                                <GameAnalysisPlayItem onPress={() => {
                                    Alert.alert('Information', 'You clicked Fly Ball');
                                }}>Fly Ball</GameAnalysisPlayItem>
                                <GameAnalysisPlayItem onPress={() => {
                                    Alert.alert('Information', 'You clicked Line Drive');
                                }}>Line Drive</GameAnalysisPlayItem>
                                <GameAnalysisPlayItem onPress={() => {
                                    Alert.alert('Information', 'You clicked Bunt');
                                }}>Bunt</GameAnalysisPlayItem>
                                <GameAnalysisPlayItem onPress={() => {
                                    Alert.alert('Information', 'You clicked Pop Fly');
                                }}>Pop Fly</GameAnalysisPlayItem>

                                <View style={{ height: 10 }} />
                            </ScrollView>
                        </>
                    )}



                    {(page == PAGE_BIP_GROUND_BALL || page == PAGE_BIP_HARD_GROUND_BALL) && (
                        <>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <GameAnalysisPlayItem onPress={() => {
                                    Alert.alert('Information', 'You clicked Out at First');
                                }}>Out at First</GameAnalysisPlayItem>
                                <GameAnalysisPlayItem onPress={() => {
                                    Alert.alert('Information', 'You clicked Single');
                                }}>Single</GameAnalysisPlayItem>
                                <GameAnalysisPlayItem onPress={() => {
                                    Alert.alert('Information', 'You clicked Double');
                                }}>Double</GameAnalysisPlayItem>
                                <GameAnalysisPlayItem onPress={() => {
                                    Alert.alert('Information', 'You clicked Triple');
                                }}>Triple</GameAnalysisPlayItem>
                                <GameAnalysisPlayItem onPress={() => {
                                    Alert.alert('Information', 'You clicked Error');
                                }}>Error</GameAnalysisPlayItem>
                                <GameAnalysisPlayItem onPress={() => {
                                    Alert.alert('Information', 'You clicked Foul Ball');
                                }}>Foul Ball</GameAnalysisPlayItem>
                                <GameAnalysisPlayItem onPress={() => {
                                    Alert.alert('Information', 'You clicked In-The-Park Home Run');
                                }}>In-The-Park Home Run</GameAnalysisPlayItem>

                                <View style={{ height: 10 }} />
                            </ScrollView>
                        </>
                    )}
                </GameAnalysisModal>

                <DropShadow
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 0,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 5,
                        height: stepIndex == 3 ? fullHeight : 'auto',
                    }}
                >
                    <View style={{ backgroundColor: color.white }}>
                        {stepIndex > 0 && (
                            <>
                                {stepIndex >= 1 && (
                                    <>
                                        <CurrentStep />
                                    </>
                                )}

                                {stepIndex >= 2 && (
                                    <>
                                        <GameAnalysisTab
                                            content={[
                                                { name: 'PLAY BY PLAY', screen: <ProViewScreen /> },
                                                {
                                                    name: 'PRO VIEW', isPro: true, screen: <ProViewScreen />
                                                },
                                            ]}
                                        >


                                        </GameAnalysisTab>
                                    </>
                                )}

                                {stepIndex >= 3 && (
                                    <>
                                        <TouchableOpacity onPress={() => this.setState({ isShowPlayModal: true })} style={{ backgroundColor: '#158BBE', paddingVertical: 12, }}>
                                            <Text style={{ color: '#FFF', textAlign: 'center', }}>ADD PLAY</Text>
                                        </TouchableOpacity>

                                        <ScrollView style={{ backgroundColor: '#fff' }}>
                                            <Step />
                                            <Step />
                                            <Step />
                                        </ScrollView>
                                    </>
                                )}
                            </>
                        )}
                    </View>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                            if (stepIndex == 3) {
                                this.setState({ stepIndex: 0 });
                            } else {
                                this.setState({ stepIndex: stepIndex + 1 });
                            }
                        }}>
                        <View style={[
                            { backgroundColor: '#158BBE', paddingVertical: 10, },
                            { translateY: this.state.panelHeight }
                        ]}>
                            <Text style={{ color: '#FFF', textAlign: 'center', }}>GAME ANALYSIS</Text>
                        </View>
                        <View style={{
                            alignItems: 'center', position: 'absolute',
                            top: 30,
                            left: SCREEN_WIDTH / 2 - 20
                        }}>
                            <View style={{
                                backgroundColor: '#158BBE', width: 40, height: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomLeftRadius: 5,
                                borderBottomRightRadius: 5,
                            }}>
                                {stepIndex >= 3 && <MaterialCommunityIcons name='chevron-up' size={20} color='#fff' />}
                                {stepIndex < 3 && <MaterialCommunityIcons name='chevron-down' size={20} color='#fff' />}
                            </View>
                        </View>
                    </TouchableOpacity>
                </DropShadow>
            </Animated.View>
        )
    }
}


let styles = StyleSheet.create({
    itemHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#EBEBEB',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    fontBold: {
        fontWeight: 'bold',
    },
    fontDefault: {
        
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
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
    arrowIcon: {
        marginRight: 15,
    },
    peopleMessageContainer: {
        position: 'absolute', bottom: 120, left: 15,
        maxHeight: 200
    },
    peopleMessageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    peopleMessageIcon: {
        width: 25, height: 25, borderRadius: 25
    },
    peopleMessage: {
        color: color.white,
        marginLeft: 10
    },
})

export default GameAnalysis