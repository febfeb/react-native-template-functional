
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, LayoutAnimation } from 'react-native';
import color from '../utils/color';

export default class GameAnalysisTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: null,
        }
    }

    componentDidMount() {
        if (this.props.content) {
            this.setState({ selectedTab: this.props.content[0] })

        }
        if (this.props.selectedTab) {
            this.setState({ selectedTab: this.props.selectedTab })
        }
    }
    
    render() {
        let { selectedTab } = this.state
        return (
            <View style={{ backgroundColor: '#fff' }}>
                <View style={styles.tabScreenFullContainer}>
                    {this.props.content && (
                        this.props.content.map((item, key) => {
                            if (item.name != selectedTab?.name) {
                                return (
                                    <TouchableOpacity key={key} style={styles.inActiveTab} onPress={() => {
                                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                                        this.setState({ selectedTab: item })
                                    }}>
                                        <Text style={[styles.tabScreenFullText, { color: color.text }]}>{item.name}</Text>
                                        {item.isPro && (
                                            <Text style={[styles.proFeatureText, { color: '#45C3FA' }]}>(PRO)</Text>
                                        )}
                                    </TouchableOpacity>
                                )
                            } else {
                                return (
                                    <TouchableOpacity key={key} style={styles.activeTab} onPress={() => {
                                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                                        this.setState({ selectedTab: item })
                                    }}>
                                        <Text style={[styles.tabScreenFullText,]}>{item.name}</Text>
                                        {item.isPro && (
                                            <Text style={[styles.proFeatureText, { color: color.text }]}>(PRO)</Text>
                                        )}
                                    </TouchableOpacity>
                                )
                            }
                        })
                    )}
                </View>
                <Animated.View >
                    {selectedTab && (
                        selectedTab.screen
                    )}

                    {this.props.children}
                </Animated.View>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    tabScreenFullContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F1F1'
    },
    tabScreenFullText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    activeTab: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flex: 1,
        borderRadius: 5,
        marginHorizontal: 5,
        marginVertical: 5,
        backgroundColor: '#FFB320',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inActiveTab: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flex: 1,
        borderRadius: 5,
        marginHorizontal: 5,
        marginVertical: 5,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    proFeatureText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5,
    }
})