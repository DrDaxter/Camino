import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type fonts = 'Roboto-Medium' | 'Roboto-Bold'
interface Props{
    text:string
    font:fonts
    color:string
    size:number
}
export const Titles = ({
    text,
    font,
    color,
    size,
}:Props) => {
  return (
    <View>
        <Text
            style={{
                ...styles.title,
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

const styles = StyleSheet.create({
    title:{
        fontFamily:'Roboto-Medium',
        color:"#000",
        fontSize:20
    }
})