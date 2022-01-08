import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import color from '../utils/color';

class StreamingMessage extends React.Component {
    render() {
        return (
            <View style={styles.peopleMessageContainer}>
                <ScrollView ref={ref => { this.scrollView = ref }}
                    onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })} showsVerticalScrollIndicator={false}>
                    {this.props.message && (
                        this.props.message.map((item, key) => {
                            return (
                                <View key={key} style={styles.peopleMessageItem}>
                                    <Image style={styles.peopleMessageIcon} source={item.icon} />
                                    <View style={styles.messageWrapper}>
                                        <Text style={styles.peopleMessage}>{item.message}</Text>
                                    </View>
                                </View>
                            )
                        })
                    )}
                </ScrollView>
            </View>
        )
    }
}


let styles = StyleSheet.create({
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
    messageWrapper: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
        marginLeft: 10
    },
    peopleMessage: {
        color: color.white,
    },
})

export default StreamingMessage