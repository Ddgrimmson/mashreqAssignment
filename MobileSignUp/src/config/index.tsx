import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screen/HomeScreen';
import StatusScreen from '../screen/StatusScreen';

const Stack = createStackNavigator();

const AppRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Default"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Default" component={HomeScreen} />
      <Stack.Screen name="Status" component={StatusScreen} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
