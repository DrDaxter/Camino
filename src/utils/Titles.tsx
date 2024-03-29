import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type fonts = 'Roboto-Medium' | 'Roboto-Bold' | 'Roboto-Regular'
type TextAlign = 'center'|'flex-start'|'flex-end'
interface Props{
    text:string
    color?:string
    size?:number
    marginVertical?:number
    font?:fonts
    align?:TextAlign,
    underLine?:boolean
}
export const Titles = ({
    text,
    font="Roboto-Medium",
    color="#000",
    size=20,
    align="center",
    marginVertical=10,
    underLine = false
}:Props) => {
  return (
    <View
        style={{
            marginVertical,
            alignItems:align
        }}
    >
        <Text
            style={{
                fontFamily:font,
                color:color,
                fontSize:size,
                textDecorationLine: underLine ? "underline" : "none"
            }}
        >
            {text}
        </Text>
    </View>
  )
}

