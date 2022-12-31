import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type fonts = 'Roboto-Medium' | 'Roboto-Bold'
type TextAlign = 'center'|'flex-start'|'flex-end'
interface Props{
    text:string
    font?:fonts
    color?:string
    size?:number,
    align?:TextAlign
}
export const Titles = ({
    text,
    font="Roboto-Medium",
    color="#000",
    size=20,
    align="center"
}:Props) => {
  return (
    <View
        style={{
            marginVertical:10,
            alignItems:align
        }}
    >
        <Text
            style={{
                fontFamily:font,
                color:color,
                fontSize:size
            }}
        >
            {text}
        </Text>
    </View>
  )
}

