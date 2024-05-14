import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingScreen from "./app/screens/OnboardingScreen";
import GetStartedScreen from "./app/screens/GetStartedScreen";
import LoginScreen from "./app/screens/LoginScreen";
import Dashboard from "./app/screens/Dashboard";
import SubjectDetails from "./app/screens/SubjectDetails";
import Quiz from "./app/screens/Quiz";
import VideoScreen from "./app/screens/VideoScreen";
import S from "./app/S";
import Lot from "./app/Lot";
import TutorialScreen from "./app/screens/TutorialScreen";
import QuestionScreen from "./app/screens/QuestionScreen";
import ClassSelectionScreen from "./app/screens/ClassSelectionScreen";
import TopicsScreen from "./app/screens/TopicsScreen";
import SubTopicsScreen from "./app/screens/SubTopicsScreen";
import MathScreen from "./app/screens/MathScreen";
import TutorialList from "./app/screens/TutorialList";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="OnboardingScreen">
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen}/>
        <Stack.Screen name="GetStartedScreen" component={GetStartedScreen}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="DashboardScreen" component={Dashboard}/>
        <Stack.Screen name="SubjectDetailsScreen" component={SubjectDetails} options={{headerShown: true, title: "Subject"}}/>
        <Stack.Screen name="QuizScreen" component={Quiz} options={{headerShown: true, title: "Attempt Quiz"}}/>
        <Stack.Screen name="VideoScreen" component={VideoScreen} options={{headerShown: true}}/>
        <Stack.Screen name="Quiz" component={Lot}/>
        <Stack.Screen name="S" component={S} />
        <Stack.Screen name="TutorialScreen" component={TutorialScreen} />
        <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
        <Stack.Screen name="ClassSelectScreen" component={ClassSelectionScreen} />
        <Stack.Screen name="TopicsScreen" component={TopicsScreen} />
        <Stack.Screen name="SubTopicsScreen" component={SubTopicsScreen} />
        <Stack.Screen name="MathScreen" component={MathScreen} />
        {/* <Stack.Screen name="TutorialListScreen" component={TutorialList} /> */}
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