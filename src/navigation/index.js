import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignupScreen from "../components/authentication/Signup";
import SigninScreen from "../components/authentication/Signin";
import ResetPassword from "../components/authentication/ResetPassword";
import UpdatePassword from "../components/authentication/UpdatePassword";
import EnglishTutorController from "../components/english_tutor/components/Controller";
import TalkativeAgentController from "../components/talkative_agent/components/Controller";
import useAuth from "../components/authentication/hooks/useAuth";
import { REACT_APP_ADMIN_EMAIL } from "@env";

const ADMIN_EMAIL = REACT_APP_ADMIN_EMAIL;

const Stack = createNativeStackNavigator();

function AppNavigation() {
    const { user } = useAuth();

    if (user && user.email === ADMIN_EMAIL) {
        ADMIN_EMAIL;

        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{ headerShown: false }} // to hide the header
                    initialRouteName="Home"
                >
                    <Stack.Screen
                        name="Home"
                        screenOptions={{ headerShown: false }}
                        component={HomeScreen}
                    />
                    <Stack.Screen
                        name="Signup"
                        screenOptions={{ headerShown: false }}
                        component={SignupScreen}
                    />
                    <Stack.Screen
                        name="UpdatePassword"
                        screenOptions={{ headerShown: false }}
                        component={UpdatePassword}
                    />
                    <Stack.Screen
                        name="EnglishTutorController"
                        screenOptions={{ headerShown: false }}
                        component={EnglishTutorController}
                    />
                    <Stack.Screen
                        name="TalkativeAgentController"
                        screenOptions={{ headerShown: false }}
                        component={TalkativeAgentController}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    } else if (user && user.email !== ADMIN_EMAIL) {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{ headerShown: false }} // to hide the header
                    initialRouteName="Home"
                >
                    <Stack.Screen
                        name="Home"
                        screenOptions={{ headerShown: false }}
                        component={HomeScreen}
                    />
                    <Stack.Screen
                        name="EnglishTutorController"
                        screenOptions={{ headerShown: false }}
                        component={EnglishTutorController}
                    />
                    <Stack.Screen
                        name="UpdatePassword"
                        screenOptions={{ headerShown: false }}
                        component={UpdatePassword}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{ headerShown: false }} // to hide the header
                    initialRouteName="Welcome"
                >
                    <Stack.Screen
                        screenOptions={{ headerShown: false }}
                        name="Welcome"
                        component={WelcomeScreen}
                    />
                    <Stack.Screen
                        screenOptions={{ headerShown: false }}
                        name="Signin"
                        component={SigninScreen}
                    />
                    <Stack.Screen
                        name="ResetPassword"
                        screenOptions={{ headerShown: false }}
                        component={ResetPassword}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default AppNavigation;
