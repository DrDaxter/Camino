import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


export const Inventory = () => {
  return (
        <View>
            <Text style={styles.text}>Inventory</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        color:'#000',
        fontSize:20
    }
})