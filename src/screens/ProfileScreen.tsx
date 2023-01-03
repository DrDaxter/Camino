import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect,useState } from 'react'
import { StyleSheet, Text, View, FlatList, Image, Modal, TouchableOpacity } from 'react-native'
import { UserListData } from '../components/UserListData'
import { firebase } from '../hooks/firebase/firebase'
import { Data, DataStructure } from '../utils/AccountItems'
import { AuthHook } from '../hooks/firebase/AuthHook'
import { LoginComponent } from '../components/LoginComponent'
import Icon from 'react-native-vector-icons/Ionicons'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { Colors } from '../theme/Colors'

interface Props extends StackScreenProps<any,any>{}

export const ProfileScreen = ({navigation}:Props) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User|null>();
  const [showLoginModal, setShowLoginModal] = useState(true)
  const {AuthStateChange} = AuthHook()

  useEffect( () => {
    const suscription = AuthStateChange(onAuthStateChanged)
    return suscription
  },[user])

  function onAuthStateChanged(user:FirebaseAuthTypes.User|null) {
    if(user){
      setUser(user);
      setShowLoginModal(false)
    }
    if (initializing) setInitializing(false);
  }

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
    if(user){
      navigation.navigate(component)
    }else{
      setShowLoginModal(true)
    }
  }

  if(initializing) return null
  
  return (
    <View style={styles.mainContent}>
      <Modal
        transparent={true}
        visible={!user && showLoginModal}
      >
        <View style={styles.loginModal}>
          <TouchableOpacity
            style={styles.closeLoginModal}
            onPress={() => setShowLoginModal(false)}
          >
            <Icon 
                name='close'
                color="#000"
                size={35}/>
          </TouchableOpacity>
          <LoginComponent />
        </View>
      </Modal>

      <View style={styles.useInformationContent}>
        <Image 
          source={{uri:"https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg"}}
          style={styles.userPhoto}
        />
        <View style={{justifyContent:'flex-end'}}>
          <Text style={{
            color:"#000",
            opacity:0.5
          }}>Bienvenido</Text>
          <Text style={styles.strongText}>{user?.displayName || 'No hay nombre'}</Text>
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
    backgroundColor:Colors.white2,
  },
  useInformationContent:{
    flexDirection:'row',
    marginTop:15,
    marginBottom:25,
    marginHorizontal:10,
    paddingVertical:50,
    borderTopColor:"gray",
    borderBottomColor:"gray",
    borderTopWidth:0.8,
    borderBottomWidth:0.8
  },
  userPhoto:{
    width:60,
    height:60,
    marginRight:15,
    
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
  },
  loginModal:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0, 0, 0, 0.3)'
  },
  closeLoginModal:{
    position:'absolute',
    backgroundColor:'#E5E5E5',
    top:100,
    right:0,
    margin:10,

    borderRadius:50
  }
})