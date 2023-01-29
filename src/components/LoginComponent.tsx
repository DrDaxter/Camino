import React, { useState } from 'react'
import {Dimensions, StatusBar, StyleSheet, View} from 'react-native'
import { AuthHook } from '../hooks/firebase/AuthHook'
import { SignSocialNetworksComponent } from './SignSocialNetworksComponent'
import { Titles } from '../utils/Titles'
import { firebase } from '../hooks/firebase/firebase'
import { SimpleLoader } from '../utils/SimpleLoader'
import { Colors } from '../theme/Colors'
import { LoginForm } from './forms/LoginForm'

export const LoginComponent = () => {
  const [showLoader, setShowLoader] = useState(false)
  const {saveData} = firebase()
  const {signWithGoogle} = AuthHook()

  const googleAuthAction = () => {
    setShowLoader(true)
    signWithGoogle().then(data => {
      const {user} = data
      saveData(
        {
          "Nombre":user.displayName,
          "email":user.email,
          "phone_number":user.phoneNumber,
          "photo":user.photoURL,
          "uid":user.uid
        }
      ).finally(()=> setShowLoader(false))
    }).catch(error => {
      setShowLoader(false)
      throw new Error(`Error found in loginComponent ${error}`);
    })
  }
    
  return (
    <View style={styles.mainContent}>
      <StatusBar
       hidden={true}
       
      />

      <SimpleLoader 
        visible={showLoader}
        color={Colors.primary}
      />
      <View style={styles.headersContainer}>
        <Titles 
          text="Inicia Sesion"
          color={Colors.white1}
          size={35}
          font="Roboto-Bold"
        />
        <Titles 
          text="Disfruta de nuestro servicios"
          color={Colors.white1}
          font="Roboto-Medium"
          marginVertical={0}
        />
      </View>
      <View style={styles.formsLoginContent}>
        <LoginForm />

        <View>
          <SignSocialNetworksComponent 
            imagePath={require('../assets/images/google_icon.png')}
            title="Iniciar Sesión con GOOGLE"
            btnColor="#4285f4"
            authFunction={googleAuthAction}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mainContent:{
      flex:1,
      flexDirection:'column',
      backgroundColor:Colors.primary,
    },
    logoContent:{
      justifyContent:'center',
      alignItems:'center'
    },
    headersContainer:{
      alignItems:'flex-start',
      height:'50%',
      marginVertical:15,
      paddingHorizontal:10
    },
    loginSubtitle:{
      color:'#000',
      fontFamily:'Roboto-Regular',
      fontSize:19,
      marginVertical:5
    },
    formsLoginContent:{
      flex:1,
      justifyContent:"center",
      backgroundColor:Colors.white2,
      borderTopRightRadius:10,
      borderTopLeftRadius:10,
      paddingHorizontal:10,
    }
})