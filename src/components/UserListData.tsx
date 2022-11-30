import React from 'react'
import { StyleSheet, Text, View, Dimensions,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

interface Props{
    iconName:string,
    title:string,
    onPress:()=>void
}
const screenWidth = Dimensions.get('screen').width

export const UserListData = ({
    iconName,
    title,
    onPress
}:Props) => {
  return (
    <TouchableOpacity 
        style={styles.mainContent}
        onPress={onPress}
    >
        
        <View>
            <Icon 
                name={iconName}
                size={25}
                color="#000"
                
            />
        </View>
        <View
            style={{left:20}}
        >
            <Text style={styles.title}>
                {title}
            </Text>
        </View>
       
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    mainContent:{
        justifyContent:'flex-start',
        flexDirection:'row',
        alignItems:'center',
        width:screenWidth,
        height:60,
        paddingHorizontal:20,
        marginVertical:15
    },
    itemContent:{
        flexDirection:'row',
        width:'60%',
    },
    title:{
        fontSize:20,
        color:"#000",
    }
})
