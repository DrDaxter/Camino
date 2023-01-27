import React from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Colors } from '../../theme/Colors'

export type formProps = {
    email:'email',
    password:'password'
}
export const LoginForm = () => {

  return (
    <ScrollView style={styles.formContent}>
        <View style={styles.inputContentGeneral}>

        </View>
        
        <View style={styles.inputContentGeneral}>
            
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    formContent:{
        
    },
    inputContentGeneral:{
        marginVertical:15,
    },
    input: {
        color:Colors.black1,
        borderBottomWidth:1,
        borderColor: Colors.black2,
        height: 40,
        padding: 10,
        borderRadius: 4,
    },
})