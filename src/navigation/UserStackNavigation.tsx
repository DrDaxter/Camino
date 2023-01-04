import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProfileScreen } from '../screens/ProfileScreen';
import { UserComunidad } from '../screens/userAccount/UserComunidad';
import { UserPoliticas } from '../screens/userAccount/UserPoliticas';
import { UserRutas } from '../screens/userAccount/UserRutas';
import Icon from 'react-native-vector-icons/Ionicons'
import { HeaderContentComponent } from '../components/HeaderContentComponent';
import { Colors } from '../theme/Colors';

const Stack = createStackNavigator();

export const UserStackNavigation = () =>{
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <HeaderContentComponent />,
        cardStyle:{
          backgroundColor:Colors.white2
        }
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