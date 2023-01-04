import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import React from 'react'
import { Colors } from '../theme/Colors'
import Icon from 'react-native-vector-icons/Ionicons';
import { ProfileScreen } from '../screens/ProfileScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { Inventory } from '../screens/Inventory';
import { UserStackNavigation } from './UserStackNavigation';

const BottomTabAndroid = createMaterialBottomTabNavigator()

export const TabNavigation = () => {
  return (
    <AndroidTab />
  )
}

const AndroidTab = () => {
    return(
        <BottomTabAndroid.Navigator
            sceneAnimationEnabled={true}
            barStyle={{
                backgroundColor:Colors.primary_light
            }}
            screenOptions={({route}) => ({
                tabBarIcon: ({color}) => {
                    let iconName:string
                    switch (route.name) {
                        case 'HomeScreen':
                            iconName = 'earth-outline'
                            break;
                        case 'UserStackNavigation':
                            iconName = 'person-outline';
                            break;
                        case 'Inventory':
                            iconName = 'book-outline'
                            break;
                    
                        default:
                            break;
                    }
                    return <Icon name={iconName!} size={20} color={Colors.white1} />
                }
            })}
            initialRouteName='HomeScreen'
        >
            <BottomTabAndroid.Screen  name='UserStackNavigation' options={{title:"Perfil"}} component={UserStackNavigation}/>
            <BottomTabAndroid.Screen name='HomeScreen' options={{title:"Encontrar"}} component={HomeScreen}/>
            <BottomTabAndroid.Screen  name='Inventory' options={{title:"Historial"}} component={Inventory}/>

        </BottomTabAndroid.Navigator>
    )
}
