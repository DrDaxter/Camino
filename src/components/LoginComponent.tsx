import React, { useState, useEffect, useRef } from 'react'
import 
{
  Dimensions, 
  StyleSheet, 
  TouchableOpacity, 
  View, 
  Animated as ReactAnimated, 
  KeyboardAvoidingView
} from 'react-native'
import Animated from 'react-native-reanimated'
import { AuthHook } from '../hooks/firebase/AuthHook'
import { SignSocialNetworksComponent } from './SignSocialNetworksComponent'
import { Titles } from '../utils/Titles'
import { firebase } from '../hooks/firebase/firebase'
import { SimpleLoader } from '../utils/SimpleLoader'
import { Colors } from '../theme/Colors'
import Icon from 'react-native-vector-icons/Ionicons'
import { LoginForm } from './forms/LoginForm'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { CreateAccountComponent } from './forms/CreateAccountComponent'
import { moderateVerticalScale } from 'react-native-size-matters'
import { AnimationsHook } from '../hooks/AnimationsHook'

const top = Dimensions.get('screen').height*0.8
interface Props{
  onHidden:(hide:boolean) => void
}
export const LoginComponent = ({onHidden}:Props) => {
  const [showLoader, setShowLoader] = useState(false)
  const [newUser, setNewUser] = useState(false)
  const positionAnimation = useRef(new ReactAnimated.Value(-top)).current
  const opacity = useRef(new ReactAnimated.Value(0)).current
  const formOpacity = useRef(new ReactAnimated.Value(0)).current
  const inputOpacity = useRef(new ReactAnimated.Value(1)).current
  const {saveData} = firebase()
  const {signWithGoogle,signWithFacebook} = AuthHook()
  const {animationStyle,formContentResizeAnimation} = AnimationsHook()

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
    ReactAnimated.timing(
      positionAnimation,
      {
        toValue:0,
        duration:900,
        useNativeDriver:true
      }
    ).start(() => fadeForm())

    ReactAnimated.timing(
      opacity,
      {
        toValue:1,
        duration:520,
        useNativeDriver:true
      }
    ).start()
  }, [])

  const fadeForm = () => {
    ReactAnimated.timing(
      formOpacity,
      {
        toValue:1,
        duration:400,
        useNativeDriver:true
      }
    ).start()
  }

  const inputFade = (areTheInputs:boolean,value:number) => {
    ReactAnimated.timing(
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
    <ReactAnimated.ScrollView style={{
        ...styles.mainContent,
        opacity,
        transform: [{
          translateY: positionAnimation
        }]
      }}
      contentContainerStyle={{flexGrow:1}}
      keyboardShouldPersistTaps="handled" 
      bounces={false}
    >
      <KeyboardAvoidingView style={{ flex: 1}} behavior="height" enabled 
        keyboardVerticalOffset={moderateVerticalScale(-45)}>
        <View style={styles.subHeaderContent}>
          <TouchableOpacity
            onPress={() => onHidden(false)}>
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
        <ReactAnimated.View style={{opacity:formOpacity,flex:1}}>

          <Animated.View style={[styles.headersContainer,animationStyle]}>
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
          </Animated.View>
          <View style={styles.formsLoginContent}>
            {
              newUser 
              ?  (
                  <ReactAnimated.View style={{opacity:inputOpacity}}>
                    <CreateAccountComponent />
                  </ReactAnimated.View>
                )
              : (
                  <ReactAnimated.View style={{opacity:inputOpacity}}>
                    <LoginForm 
                      newUserAnimation={inputFade}
                      resizeFormContentsIn={() => formContentResizeAnimation(0)}
                      resizeFormContentsOut={() => formContentResizeAnimation(200)}
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
                  </ReactAnimated.View>
              )
            }
          </View>
        </ReactAnimated.View>
      </KeyboardAvoidingView> 
    </ReactAnimated.ScrollView>
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