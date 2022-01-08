import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import color from '../utils/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker"

export default function UploadImageView(props) {
    const [image, setImage] = useState(null);

    let size = props.size ?? 100;

    useEffect(() => {
        setImage(props.value);
    }, [props.value]);

    const pickPhoto = useCallback(() => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true
        }).then(image => {
            console.log("Image", image);
            setImage(image.path);

            if (props.onSelectImage) {
                props.onSelectImage(image.path);
            }
        })
    }, []);

    return (
        <View style={[styles.container, props.containerStyle]}>
            <Text style={styles.label}>{props.label}</Text>
            {image != null && (
                <View style={[styles.imageContainer, { width: size, height: size, borderRadius: size / 2 }]}>
                    <View style={styles.loadingWrapper}>
                        <ActivityIndicator size="small" color={color.black} />
                    </View>

                    <Image source={{ uri: image }} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} resizeMode='cover' />

                    <TouchableOpacity style={[styles.buttonDelete, styles.whiteButton]}
                        activeOpacity={1}
                        onPress={() => {
                            setImage(null);

                            if (props.onSelectImage) {
                                props.onSelectImage(null);
                            }
                        }}>
                        <Ionicons name="trash-outline" size={14} color={color.black} />
                    </TouchableOpacity>
                </View>
            )}

            {image == null && (
                <TouchableOpacity style={[styles.inputContainer, { width: size, height: size, borderRadius: size / 2 }]} onPress={() => {
                    pickPhoto();
                }}>
                    <Ionicons name="cloud-upload-outline" size={20} color={color.black} />
                    <Text style={styles.textUpload}>Upload Photo</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    label: {
        fontSize: 14,
        color: color.black,
        marginBottom: 5,
    },
    imageContainer: {
        height: 175,
        width: 175,
    },
    loadingWrapper: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        position: "absolute",
        backgroundColor: "#E5E5E5",
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#A5A4A4",
        height: 175,
        width: 175,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        borderStyle: 'dashed',
        position: 'relative',
    },
    overlay: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.5)",

        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
    },
    textUpload: {
        fontSize: 14,
        color: color.black,
        textAlign: "center",
    },
    eyeButton: {
        paddingLeft: 15,
        paddingVertical: 10,
    },

    whiteButton: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: color.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: color.gray,
    },
    buttonDelete: {
        position: 'absolute',
        right: 10,
        bottom: 10,
    }
});