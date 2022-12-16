import React, { useState } from 'react'
import { Dimensions, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const screenWidth = Dimensions.get('screen').width
export const HeaderContentComponent = () => {
    const [searchBar, setSearchBar] = useState(false)
  return (
    <View style={styles.mainContent}>
        <TouchableOpacity 
            onPress={()=> setSearchBar(!searchBar)}
            style={styles.buttonContent}>
            <View style={styles.iconContent}>
                <Icon 
                    name="search-outline"
                    size={25}
                    color="#000"
                />
            </View>
        </TouchableOpacity>
        <View style={{flex:1}}>
            {
                searchBar && (
                    <TextInput
                        placeholder="useless placeholder"
                        keyboardType="default"
                        style={styles.inputStyle}
                    />
                )
            }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mainContent:{
        flexDirection:'row',
        backgroundColor:"#fff",
        width:screenWidth,
        height:60,
        paddingHorizontal:10,
        paddingTop:10
    },
    buttonContent:{
        justifyContent:'center',
    },
    iconContent:{
        width:50
    },
    inputStyle:{
        color:"#000",
        borderColor:"#303030",
        borderWidth:1,
        borderRadius:10
    }
})