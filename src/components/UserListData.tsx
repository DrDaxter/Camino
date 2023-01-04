import React from 'react'
import { StyleSheet, Text, View, Dimensions,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from '../theme/Colors'

interface Props{
    iconName:string,
    title:string,
    selected:any,
    
    onPress:()=>void
}
const screenWidth = Dimensions.get('screen').width

export const UserListData = ({
    iconName,
    title,
    selected,
    onPress
}:Props) => {
  return (
    <TouchableOpacity 
        style={styles.mainContent}
        onPress={onPress}
    >
        <View >
            <Icon 
                name={selected === title || title === "Perfil" ? iconName.split('-outline').join('') : iconName}
                size={25}
                color={selected === title ? Colors.primary : Colors.black1}
                
            />
        </View>
        <View
            style={{left:20}}
        >
            <Text style={styles.title}>
                {title}
            </Text>
        </View>
        <View style={styles.arrowIcon}>
            <Icon 
                name='chevron-forward-outline'
                size={20}
                color="gray"
            />
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
        fontSize:15,
        color:"#000",
        fontWeight:'400'
    },
    arrowIcon:{
        position:"absolute",
        right:0,
        marginRight:15
    }
})
