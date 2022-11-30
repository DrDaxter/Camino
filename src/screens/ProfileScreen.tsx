import React, { useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import { UserListData } from '../components/UserListData'
import { firebase } from '../hooks/firebase/firebase'
import { Data, DataStructure } from '../utils/AccountItems'

export const ProfileScreen = () => {
  const servicios = firebase()

  const RenderItem = (item:DataStructure) => {
    return(
      <UserListData 
        iconName={item.icon} 
        title={item.title} 
        onPress={FlatPressHandler}
      />
    )
  }

  const FlatPressHandler = () => {
    console.log("CLICK AQUI")
  }
  
  return (
    <View style={styles.mainContent}>
      <View style={styles.useInformationContent}>
        <Image 
          source={{uri:"https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg"}}
          style={{width:30,height:30}}
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
    flexDirection:'row'
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