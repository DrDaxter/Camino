import React, { useState } from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

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

    return{
        AuthStateChange,
        signWithGoogle
    }
}
