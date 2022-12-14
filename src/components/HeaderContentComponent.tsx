import React from 'react'
import { Dimensions, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const screenWidth = Dimensions.get('screen').width
export const HeaderContentComponent = () => {
  return (
    <View style={styles.mainContent}>
        <TouchableOpacity style={styles.buttonContent}>
            <View style={styles.iconContent}>
                <Icon 
                    name="search-outline"
                    size={25}
                    color="#000"
                />
            </View>
            <View>
                <TextInput
                    placeholder="useless placeholder"
                    keyboardType="default"
                    style={{
                        color:"#000",
                        borderColor:"#000"
                    }}
                />
            </View>
          </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    mainContent:{
        backgroundColor:"#fff",
        width:screenWidth,
        height:60
    },
    buttonContent:{
        flex:1,
        justifyContent:'center',
        marginLeft:10
    },
    iconContent:{
        width:50
    }
})