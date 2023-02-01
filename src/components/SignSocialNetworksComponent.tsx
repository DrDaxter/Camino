import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Props{
    imagePath:any,
    title?:string,
    btnColor?:string,
    authFunction: ()=> void
}
export const SignSocialNetworksComponent = ({
    imagePath,
    btnColor = "white",
    authFunction
}:Props) => {
  return (
    <TouchableOpacity
        onPress={authFunction}
        style={{margin:10, width:100}}
    >
        <View style={{...styles.btnContent,borderColor:btnColor}}>
            <Image 
                source={imagePath}
                style={{width:30, height:30}}
            />
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btnContent:{
        flexDirection:'row',
        padding:10,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1.5,
        borderRadius:3,
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
})