import React, { useState, useEffect, useRef } from 'react'
import {Dimensions, StyleSheet, TouchableOpacity, View, Animated, ScrollView} from 'react-native'
import { AuthHook } from '../hooks/firebase/AuthHook'
import { SignSocialNetworksComponent } from './SignSocialNetworksComponent'
import { Titles } from '../utils/Titles'
import { firebase } from '../hooks/firebase/firebase'
import { SimpleLoader } from '../utils/SimpleLoader'
import { Colors } from '../theme/Colors'
import Icon from 'react-native-vector-icons/Ionicons'
import { LoginForm } from './forms/LoginForm'
import { MainUserInformation } from '../interfaces/MainUserInformation'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { CreateAccountComponent } from './forms/CreateAccountComponent'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const top = Dimensions.get('screen').height*0.8
interface Props{
  onHidden:(hide:boolean) => void
}
export const LoginComponent = ({onHidden}:Props) => {
  const [showLoader, setShowLoader] = useState(false)
 /*  const [userState, setUserState] = useState<MainUserInformation>() */
 const [newUser, setNewUser] = useState(false)
  const positionAnimation = useRef(new Animated.Value(-top)).current
  const opacity = useRef(new Animated.Value(0)).current
  const formOpacity = useRef(new Animated.Value(0)).current
  const inputOpacity = useRef(new Animated.Value(1)).current
  const {saveData} = firebase()
  const {signWithGoogle,signWithFacebook} = AuthHook()

  const handleSocialLogin = async(social:string) => {
    setShowLoader(true)
    try{
      let userCredentials: FirebaseAuthTypes.UserCredential
      switch (social) {
        case 'google':
          userCredentials = await signWithGoogle()
          break;
        case 'facebook':
          userCredentials = await signWithFacebook()
          break;
      
        default:
          break;
      }
      console.log("USER DATA",userCredentials!.user)
      const {user} = userCredentials!
      saveData({
        "Nombre":user.displayName,
        "email":user.email,
        "phone_number":user.phoneNumber,
        "photo":user.photoURL,
        "uid":user.uid
      })
    }catch(error) {
      setShowLoader(false)
      throw new Error(`Error found in loginComponent ${error}`);
    }
    finally{
      setShowLoader(false)
    }
  }

  useEffect(() => {
    Animated.timing(
      positionAnimation,
      {
        toValue:0,
        duration:900,
        useNativeDriver:true
      }
    ).start(() => fadeForm())

    Animated.timing(
      opacity,
      {
        toValue:1,
        duration:520,
        useNativeDriver:true
      }
    ).start()
  }, [])

  const fadeForm = () => {
    Animated.timing(
      formOpacity,
      {
        toValue:1,
        duration:400,
        useNativeDriver:true
      }
    ).start()
  }

  const inputFade = (areTheInputs:boolean,value:number) => {
    Animated.timing(
      inputOpacity,
      {
        toValue:value,
        duration:400,
        useNativeDriver:true
      }
    ).start(() => {
      if(areTheInputs){
        inputFade(false,1)
        setNewUser(true)
      }
    })
  }
    
  return (
    <Animated.ScrollView style={{
          ...styles.mainContent,
          opacity,
          transform: [{
            translateY: positionAnimation
          }]
        }}
        contentContainerStyle={{flexGrow:1}}
      >
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
      <Animated.View style={{opacity:formOpacity,flex:1}}>
        <View style={styles.headersContainer}>
          <Titles 
            text="Inicia Sesion"
            color={Colors.white1}
            size={35}
            font="Roboto-Bold"
          />
          <Titles 
            text="Disfruta de nuestros servicios"
            color={Colors.white1}
            font="Roboto-Medium"
            marginVertical={0}
          />
        </View>
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
        contentContainerStyle={{flexGrow:1}}>
          <View style={styles.formsLoginContent}>
            {
              newUser 
              ?  (
                  <Animated.View style={{opacity:inputOpacity}}>
                    <CreateAccountComponent />
                  </Animated.View>
                )
              : (
                <Animated.View style={{opacity:inputOpacity}}>
                  <LoginForm 
                    newUserAnimation={inputFade}
                  />
                  <View style={styles.socialLoginContent}>
                    <SignSocialNetworksComponent 
                      imagePath={require('../assets/images/google_black_icon.png')}
                      btnColor="#D0021B"
                      authFunction={() => handleSocialLogin("google")}
                    />

                    <SignSocialNetworksComponent 
                      imagePath={require('../assets/images/facebook_black_logo.png')}
                      btnColor="#475993"
                      authFunction={() => handleSocialLogin("facebook")}
                    />
                  </View>
                </Animated.View>
              )
            }
          </View>
        </KeyboardAwareScrollView>
      </Animated.View>
    </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
    mainContent:{
      flex:1,
      flexDirection:'column',
      backgroundColor:Colors.primary_dark,
      paddingTop:5,
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