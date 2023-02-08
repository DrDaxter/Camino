import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

interface AuthProps{
    onAoutStateChange: (user:any) => void
}

export const AuthHook = () => {
    
    const AuthStateChange = (
        onAoutStateChange: (user:FirebaseAuthTypes.User|null) => void
    ) => 
    {
        const authSubscription = auth().onAuthStateChanged((user) => onAoutStateChange(user))
        return authSubscription
    }

    const signWithGoogle = async() => {
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog:true})
        const { idToken } = await GoogleSignin.signIn()
        const googleCredential = auth.GoogleAuthProvider.credential(idToken)
        return auth().signInWithCredential(googleCredential)
    }

    const signWithFacebook = async() => {
        const result = await LoginManager.logInWithPermissions(['public_profile','email'])

        if(result.isCancelled){
            throw "Cancel the  process"
        }

        const data = await AccessToken.getCurrentAccessToken()

        if(!data){
            throw "Something went wrong obtaining access token"
        }

        const facebookCredentials = auth.FacebookAuthProvider.credential(data.accessToken)

        return auth().signInWithCredential(facebookCredentials)
    }

    return{
        AuthStateChange,
        signWithGoogle,
        signWithFacebook
    }
}
