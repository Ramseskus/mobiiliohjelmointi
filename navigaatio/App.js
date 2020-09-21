import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import calculatorHome from "./calculator";
import calculatorHistory from "./history";
import React from "react";

//const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={calculatorHome} />
        <Stack.Screen name="History" component={calculatorHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
