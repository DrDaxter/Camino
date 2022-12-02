import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from '../screens/ProfileScreen';

const Stack = createStackNavigator();

export const UserStackNavigation = () =>{
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false
      }}
      initialRouteName='ProfileScreen'
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}