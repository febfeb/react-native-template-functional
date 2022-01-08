import appleAuth from "@invertase/react-native-apple-authentication";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AccessToken, LoginManager } from "react-native-fbsdk"
import app from "../config/app";
import { HttpRequest } from "./http"

export default {
    facebookLogin() {
        return new Promise(async (resolve, reject) => {
            try {
                const fb_result = await LoginManager.logInWithPermissions([
                    "public_profile",
                    "email"
                ])
                if (!fb_result.isCancelled) {
                    const data = await AccessToken.getCurrentAccessToken()
                    let res = HttpRequest.facebookLogin({ access_token: data.accessToken });
                    resolve(res);
                }
            } catch (err) {
                reject(err);
            }
        });
    },
    googleLogin() {
        return new Promise(async (resolve, reject) => {
            // GoogleSignin.configure({
            //     webClientId: app.GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server
            //     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            //     forceCodeForRefreshToken: false,
            //     iosClientId: app.GOOGLE_IOS_CLIENT_ID
            // });

            try {
                await GoogleSignin.hasPlayServices()
                const { idToken, user } = await GoogleSignin.signIn();
                let { accessToken } = await GoogleSignin.getTokens();

                let res = HttpRequest.googleLogin({ access_token: accessToken, code: user.id });
                resolve(res);
            } catch (err) {
                // if (err.code === statusCodes.SIGN_IN_CANCELLED) {
                //     Alert.alert("Error", "The user canceled the signin request.")
                // }
                reject(err);
            }
        });
    },
    googleLogout() {
        GoogleSignin.signOut();
    },
    appleLogin() {
        return new Promise(async (resolve, reject) => {
            try {
                const appleAuthRequestResponse = await appleAuth.performRequest({
                    requestedOperation: appleAuth.Operation.LOGIN,
                    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
                });

                // get current authentication state for user
                // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
                const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

                // use credentialState response to ensure the user is authenticated
                if (credentialState === appleAuth.State.AUTHORIZED) {
                    // user is authenticated
                    resolve(appleAuthRequestResponse);
                }
            } catch (err) {
                reject(err);
            }
        });
    }
}