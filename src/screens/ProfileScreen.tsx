import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { firebase } from '../hooks/firebase/firebase'

export const ProfileScreen = () => {
  const servicios = firebase()

  
  return (
    <View>
        <Text style={styles.text}>Profile</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    text:{
        color:'#000',
        fontSize:20
    }
})