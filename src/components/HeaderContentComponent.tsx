import React, { useState } from 'react'
import { Dimensions, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from '../theme/Colors'

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
                    color={Colors.white1}
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
                        multiline={false}
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
        backgroundColor:Colors.primary_dark,
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
        color:Colors.white1,
        borderColor:Colors.white1,
        borderBottomWidth:1,
        marginBottom:10
    }
})