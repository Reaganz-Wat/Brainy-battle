import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import BrainyButton from "./app/components/BrainyButton";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingScreen from "./app/screens/OnboardingScreen";
import GetStartedScreen from "./app/screens/GetStartedScreen";
import LoginScreen from "./app/screens/LoginScreen";
import Dashboard from "./app/screens/Dashboard";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen}/>
        <Stack.Screen name="GetStartedScreen" component={GetStartedScreen}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="DashboardScreen" component={Dashboard}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
