import React, { Component } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

export default class SimpleModal extends Component {
    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {
                    this.props.onRequestClose();
                }} >
                <TouchableOpacity activeOpacity={0.9} onPress={() => {
                    this.props.onRequestClose();
                }} style={styles.modalRoot}>
                    <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
                        {this.props.children}
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        );
    }
}

const styles = {
    modalRoot: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    modalContent: {
        width: 300,
        padding: 16,
        borderRadius: 5,
        backgroundColor: '#fff'
    },
};