import * as React from 'react';
import Finder from './Components/Finder'
import Map from './Components/Map'
import { View, Text } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function App() {
  const Stack = createStackNavigator();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      card: '#9430C2',
      text: '#ffffff',
      backgroundColor: '#ffffff'
    },
  };

    return (
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName="MY PLACES">
          <Stack.Screen name="MY PLACES" component={Finder} />
          <Stack.Screen name="LOCATION" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  export default App;