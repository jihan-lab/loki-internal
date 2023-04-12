import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  PhoneList,
  PhoneInformation,
  Login,
  UserList,
  Splash,
  UserDetail,
  Register,
  ProfileAdmin,
  CategoryStatusPhone,
} from '../pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigator} from '../components';

const Router = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const MainApp = () => {
    return (
      <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
        <Tab.Screen
          name="Phone List"
          component={PhoneList}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="User List"
          component={UserList}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    );
  };

  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileAdmin"
        component={ProfileAdmin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserDetail"
        component={UserDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PhoneInformation"
        component={PhoneInformation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CategoryPhoneStatus"
        component={CategoryStatusPhone}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
