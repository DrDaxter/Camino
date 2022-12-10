import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from '../screens/ProfileScreen';
import { UserComunidad } from '../screens/userAccount/UserComunidad';
import { UserPoliticas } from '../screens/userAccount/UserPoliticas';
import { UserRutas } from '../screens/userAccount/UserRutas';

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
      <Stack.Screen name="UserRutas" component={UserRutas} />
      <Stack.Screen name="UserComunidad" component={UserComunidad} />
      <Stack.Screen name="UserPoliticas" component={UserPoliticas} />
    </Stack.Navigator>
  );
}