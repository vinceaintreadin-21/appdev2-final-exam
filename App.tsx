import { ConvexProvider, ConvexReactClient } from "convex/react";
import TodoScreen from "./screens/TodoScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignupScreen";

import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Login',
  screens: {
    Login: LoginScreen,
    SignUp: SignUpScreen,
    Todo: TodoScreen,
  }
})

const Navigation = createStaticNavigation(RootStack)

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <Navigation />
    </ConvexProvider>
  );
}