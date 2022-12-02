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
                backgroundColor:Colors.primary
            }}
            screenOptions={({route}) => ({
                tabBarIcon: ({color}) => {
                    let iconName:string
                    switch (route.name) {
                        case 'HomeScreen':
                            iconName = 'earth'
                            break;
                        case 'UserStackNavigation':
                            iconName = 'person';
                            break;
                        case 'Inventory':
                            iconName = 'book'
                            break;
                    
                        default:
                            break;
                    }
                    return <Icon name={iconName!} size={20} color="#fff" />
                }
            })}
            initialRouteName='HomeScreen'
        >
            <BottomTabAndroid.Screen  name='UserStackNavigation' component={UserStackNavigation}/>
            <BottomTabAndroid.Screen name='HomeScreen' component={HomeScreen}/>
            <BottomTabAndroid.Screen  name='Inventory' component={Inventory}/>

        </BottomTabAndroid.Navigator>
    )
}
