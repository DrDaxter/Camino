import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import { UserListData } from '../components/UserListData'
import { firebase } from '../hooks/firebase/firebase'
import { Data, DataStructure } from '../utils/AccountItems'

interface Props extends StackScreenProps<any,any>{}

export const ProfileScreen = ({navigation}:Props) => {
  const servicios = firebase()

  const RenderItem = (item:DataStructure) => {
    return(
      <UserListData 
        iconName={item.icon} 
        title={item.title} 
        onPress={()=> FlatPressHandler(item.component)}
      />
    )
  }

  const FlatPressHandler = (component:string) => {
    navigation.navigate(component)
  }
  
  return (
    <View style={styles.mainContent}>
      <View style={styles.useInformationContent}>
        <Image 
          source={{uri:"https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg"}}
          style={styles.userPhoto}
        />
        <View style={{justifyContent:'flex-end'}}>
          <Text style={styles.strongText}>Bienvenido</Text>
          <Text style={styles.strongText}>Guillermo Ramirez</Text>
        </View>
      </View>
      <View style={styles.itemsContent}>
        <FlatList 
          data={Data}
          renderItem={(item)=>RenderItem(item.item)}
          keyExtractor={item => item.title}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContent:{
    flex:1,
  },
  useInformationContent:{
    flexDirection:'row',
    marginTop:15,
    marginBottom:25,
    paddingHorizontal:20
  },
  userPhoto:{
    width:60,
    height:60,
    marginRight:10,
    borderRadius:50
  },
  itemsContent:{
    flex:1,
    alignItems:'center',
  },
  strongText:{
    fontWeight:'bold',
    color:'#000',
    fontSize:15
  }
})