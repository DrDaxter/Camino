import React from 'react'
import {StyleSheet,View,Text} from 'react-native'

export const UserComunidad = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>COMUNIDAD</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    title:{
        color:'#000',
        fontSize:20,
        fontWeight:'bold'
    }
})