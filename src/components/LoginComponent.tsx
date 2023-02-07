import React, { useState } from 'react'
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native'
import { AuthHook } from '../hooks/firebase/AuthHook'
import { SignSocialNetworksComponent } from './SignSocialNetworksComponent'
import { Titles } from '../utils/Titles'
import { firebase } from '../hooks/firebase/firebase'
import { SimpleLoader } from '../utils/SimpleLoader'
import { Colors } from '../theme/Colors'
import Icon from 'react-native-vector-icons/Ionicons'
import { LoginForm } from './forms/LoginForm'

const top = Dimensions.get('screen').height*0.8
interface Props{
  onHidden:(hide:boolean) => void
}
export const LoginComponent = ({onHidden}:Props) => {
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
      <SimpleLoader 
        visible={showLoader}
        color={Colors.primary}
      />
      <View style={styles.subHeaderContent}>
        <TouchableOpacity
          onPress={() => onHidden(false)}
        >
          <View style={{flexDirection:"row",alignItems:"center"}}>
            <Icon 
              name="arrow-back-outline"
              color={Colors.white1}
              size={35}
            />
            <Titles
              text="Quiza Luego"
              color={Colors.white1}
              font="Roboto-Medium"
            />
          </View>
        </TouchableOpacity>
      </View>
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
        <View style={styles.socialLoginContent}>
          <SignSocialNetworksComponent 
            imagePath={require('../assets/images/google_black_icon.png')}
            btnColor="#D0021B"
            authFunction={googleAuthAction}
          />

          <SignSocialNetworksComponent 
            imagePath={require('../assets/images/facebook_black_logo.png')}
            btnColor="#475993"
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
      backgroundColor:Colors.primary_dark,
      paddingTop:5
    },
    subHeaderContent:{
      width:"100%",
      height:90,
      justifyContent:"flex-end"
    },
    logoContent:{
      justifyContent:'center',
      alignItems:'center'
    },
    headersContainer:{
      alignItems:'flex-start',
      justifyContent:'center',
      height:'30%',
      paddingHorizontal:15,
    },
    loginSubtitle:{
      color:Colors.white1,
      fontFamily:'Roboto-Regular',
      fontSize:19,
      marginVertical:5
    },
    formsLoginContent:{
      flex:1,
      justifyContent:"center",
      backgroundColor:Colors.white2,
      
      borderTopLeftRadius:100,
      paddingHorizontal:10,
    },
    socialLoginContent:{
      flexDirection:"row",
      justifyContent:'center',
      marginVertical:15
    }
})