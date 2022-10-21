import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { constStyles } from '../theme/Const'

interface Props{
    text:string,
    iconName:string,
    action?: ()=>void
}

export const SimpleButtonIconText = ({text,iconName,action}:Props) => {
  return (
    <TouchableOpacity onPress={action}>
        <View style={styles.buttonContent}>
        <Icon 
            name={iconName}
            size={30}
            color="#000"
        />
        <Text style={{...constStyles.simpleteText,textAlign:'center'}}>
            {text}
        </Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    buttonContent:{
        alignItems:'center'
    }
})