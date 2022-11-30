import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'

interface Props{
    iconName:string,
    title:string
}
const screenWidth = Dimensions.get('screen').width

export const UserListData = ({iconName,title}:Props) => {
  return (
    <TouchableOpacity 
        style={styles.mainContent}
        onPress={()=>console.log("click")}
    >
            <Icon 
                name={iconName}
                size={20}
                color="#000"
                
            />
            
            <Text style={styles.title}>
                {title}
            </Text>
       
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    mainContent:{
        backgroundColor:'yellow',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        width:screenWidth,
        height:60,
        paddingHorizontal:20
    },
    title:{
        fontSize:20,
        color:"#000"
    }
})
