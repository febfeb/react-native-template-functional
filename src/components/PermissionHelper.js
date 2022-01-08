import { PERMISSIONS, request } from "react-native-permissions";
import { Platform } from 'react-native';

export const CAMERA = 'camera';
export const WRITE_EXTERNAL_STORAGE = 'ext_storage';
export const READ_EXTERNAL_STORAGE = 'read_ext_storage';
export const RECORD_AUDIO = 'record_audio';

export const requestPermission = (type) => {
    return new Promise((resolve, reject) => {
        if (type === CAMERA) {
            let permission = Platform.OS == 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA;
            request(permission).then((result) => {
                if (result == 'granted') {
                    resolve();
                } else {
                    reject("Camera permission denied");
                }
            });
        } else if (type === WRITE_EXTERNAL_STORAGE) {
            let permission = Platform.OS == 'android' ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE : null;
            if (permission) {
                request(permission).then((result) => {
                    if (result == 'granted') {
                        resolve();
                    } else {
                        reject("External storage permission denied");
                    }
                });
            } else {
                resolve();
            }
        } else if (type === READ_EXTERNAL_STORAGE) {
            let permission = Platform.OS == 'android' ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE : null;
            if (permission) {
                request(permission).then((result) => {
                    if (result == 'granted') {
                        resolve();
                    } else {
                        reject("External storage permission denied");
                    }
                });
            } else {
                resolve();
            }
        } else if (type === RECORD_AUDIO) {
            let permission = Platform.OS == 'android' ? PERMISSIONS.ANDROID.RECORD_AUDIO : PERMISSIONS.IOS.MICROPHONE;
            request(permission).then((result) => {
                if (result == 'granted') {
                    resolve();
                } else {
                    reject("Audio permission denied");
                }
            });
        } else {
            reject("Please define permission type");
            return;
        }
    });
}