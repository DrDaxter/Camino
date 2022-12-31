import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Props{
    imagePath:any,
    title:string,
    btnColor:string,
    authFunction: ()=> void
}
export const SignSocialNetworksComponent = ({
    imagePath,
    title,
    btnColor,
    authFunction
}:Props) => {
  return (
    <TouchableOpacity
        onPress={authFunction}
        style={{marginVertical:10}}
    >
        <View style={{...styles.btnContent,backgroundColor:btnColor}}>
            <View style={styles.imageSeccion}>
                <Image 
                    source={imagePath}
                    style={{width:40, height:40}}
                />
            </View>
            <View
                style={styles.textSeccion}
            >
            <Text style={styles.title}>
                {title}
            </Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btnContent:{
        flexDirection:'row',
        width:'100%',
        height:50,
        backgroundColor:'white'
    },
    imageSeccion:{
        width:60,
        justifyContent:'center',
        alignItems:'center'
    },
    textSeccion:{
        flex:1,
        justifyContent:'center',
        alignItems:'flex-start',
        paddingHorizontal:10
    },
    title:{
        fontSize:15,
        fontFamily:'Roboto-Regular',
        fontWeight:'bold'
    }
})