import React from 'react';
import { View, Text, Modal, TouchableOpacity, Dimensions, Image, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import color from '../utils/color';

class GameAnalysisModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        let { width, height } = Dimensions.get('window')

        let title = '-'
        if (this.props.title) {
            title = this.props.title
        }
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}
            >
                <View style={{ flex: 1, backgroundColor: color.blackOpacity, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: width - 40, backgroundColor: '#FFF', borderRadius: 10 }}>

                        {/* Modal Header */}
                        <View style={{
                            backgroundColor: '#F1F1F1', padding: 15, paddingVertical: 20,
                            flexDirection: 'row', alignItems: 'center',
                            borderTopRightRadius: 10, borderTopLeftRadius: 10
                        }}>
                            <TouchableOpacity onPress={this.props.onRequestClose}>
                                <Feather name='corner-up-left' size={25} color={color.black} style={{ marginRight: 10 }} />
                            </TouchableOpacity>

                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#2E2E30' }}>{title}</Text>
                        </View>

                        {/* Modal Content */}
                        <View style={{ maxHeight: height - 100, }}>
                            {this.props.children}
                        </View>

                    </View>
                </View>
            </Modal>
        )
    }
}

let styles = StyleSheet.create({

    arrowIcon: {
        marginRight: 15,
        // tintColor: color.white
    },

})


export default GameAnalysisModal