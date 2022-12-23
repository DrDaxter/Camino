import React from 'react'
import {Dimensions, StyleSheet, Text, View, Image, Button, TouchableOpacity} from 'react-native'
import { AuthHook } from '../hooks/firebase/AuthHook'
import { SignSocialNetworksComponent } from './SignSocialNetworksComponent'

const screenWidth = Dimensions.get('screen').width
export const LoginComponent = () => {
  const {signWithGoogle} = AuthHook()

  const googleAuthAction = () => {
    signWithGoogle().then(data => {
      console.log(data)
    }).catch(error => {
      throw new Error(`Error found in loginComponent ${error}`);
    })
  }
    
  return (
    <View style={styles.mainContent}>
        <View style={styles.logoContent}>
          <Image 
            source={require('../assets/images/truck_gps.png')}
            style={{ width:300, height:300}}
          />
        </View>
        <View style={styles.bodyContainer}>
            <Text style={styles.loginTitle}>
              Inicia Sesión
            </Text>
            <Text style={styles.loginSubtitle}>
              ¡Accede a nuestro servicios registrandote ahora!
            </Text>
            <SignSocialNetworksComponent 
              imagePath={require('../assets/images/google_icon.png')}
              title="Iniciar Sesión con GOOGLE"
              btnColor="#4285f4"
              authFunction={googleAuthAction}
            />
            {/* <SignSocialNetworksComponent 
              imagePath={require('../assets/images/google_icon.png')}
              title="Iniciar Sesión con Twitter"
              btnColor="#1da1f2"
              onPress={signWithGoogle}
            /> */}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mainContent:{
      flexDirection:'column',
      width:400,
      height:500,
      backgroundColor:'white',
      borderRadius:10,
      paddingHorizontal:5
    },
    logoContent:{
      justifyContent:'center',
      alignItems:'center'
    },
    bodyContainer:{
      height:100,
    },
    loginTitle:{
      fontSize:30,
      color:'#000',
      fontFamily:'Roboto-Medium'
    },
    loginSubtitle:{
      color:'#000',
      fontFamily:'Roboto-Regular',
      fontSize:19
    }
})