import React from 'react'
import {StyleSheet,View,Text} from 'react-native'

export const UserPoliticas = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>POLITICAS</Text>
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