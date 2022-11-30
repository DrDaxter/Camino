import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const screenWidth = Dimensions.get('screen').width
interface Props{
    image:string,
    name:string,
    description:string
}
export const ServiceDetails = ({
    image,
    name,
    description
}:Props) => {
  return (
    <View style={styles.mainContent}>
        <View style={styles.boxDetail}>    
            <View>
                <Image 
                    source={{uri:image}}
                    style={styles.detailImage}
                />
            </View>
            <View style={styles.textContent}>
                <Text style={{color:'#000'}}>
                    {name}
                </Text>
            </View>
        </View>
        <TouchableOpacity
            style={styles.closeDetailBtn}
        >
            <Icon 
                name='close'
                color="#000"
                size={30}
            />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    mainContent:{
        flex:1,
        position:'absolute',
        bottom:190,
        width:screenWidth,
        height:140,
    },
    boxDetail:{
        position:'absolute',
        flexDirection:'row',
        backgroundColor:'#FAFAFA',
        paddingHorizontal:5,
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        marginRight:10,
        bottom:0
    },
    textContent:{
        flex:1,
        padding:5
    },
    detailImage:{
        width:100,
        height:100
    },
    closeDetailBtn:{
        position:'absolute',
        backgroundColor:'#E5E5E5',
        right:0,
        marginHorizontal:10,
        borderRadius:50
    }
})
