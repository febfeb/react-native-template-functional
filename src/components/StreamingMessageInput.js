import React from 'react';
import { View, Text, LayoutAnimation, Platform, Image, UIManager, Modal, ScrollView, TextInput, Dimensions, TouchableOpacity, StyleSheet, Animated, PanResponder } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class StreamingMessageInput extends React.Component {
    render() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#fff' }}>
                <TextInput
                    style={{ paddingVertical: 0, flex: 1, }}
                    placeholder="Send message..."
                    value={this.props.messageValue}
                    onChangeText={this.props.onChangeTextMessage}
                    onSubmitEditing={this.props.sendMessage}
                />
                <TouchableOpacity onPress={this.props.sendMessage}>
                    <MaterialCommunityIcons name="send" size={20} color='#158BBE' />
                </TouchableOpacity>
            </View>
        )
    }
}


let styles = StyleSheet.create({

});