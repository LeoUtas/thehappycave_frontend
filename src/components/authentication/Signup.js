import {
    View,
    Text,
    Image,
    StatusBar,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { auth } from "../../../Firebase/firebase";
import { useNavigation } from "@react-navigation/native";

import BackgroundImage from "../../../assets/homeImage.png";
import ExitButton from "../authentication/ExitButton";
import HomeButton from "../authentication/HomeButton";
import {
    AuthFormFormat,
    AuthButtonStyle,
    TextGlowingEffect,
    AuthTitleStyle,
    fontFamilyStyle,
} from "../../styles/Styles";
import HeaderPanel from "../../screens/HeaderPanel";
import HelloUserCard from "./HelloUserCard";
import {
    REACT_APP_THEHAPPYCAVE_AUTH_ENDPOINT_DEV,
    REACT_APP_THEHAPPYCAVE_AUTH_ENDPOINT_PRODUCTION,
} from "@env";

// const THEHAPPYCAVE_AUTH_ENDPOINT = REACT_APP_THEHAPPYCAVE_AUTH_ENDPOINT_DEV;
const THEHAPPYCAVE_AUTH_ENDPOINT =
    REACT_APP_THEHAPPYCAVE_AUTH_ENDPOINT_PRODUCTION;

export default function SignupScreen() {
    THEHAPPYCAVE_AUTH_ENDPOINT;

    const navigation = useNavigation();

    const [userName, setUserName] = useState("");

    useEffect(() => {
        setUserName(auth.currentUser.displayName);
    }, []);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = async () => {
        if (name && email && password && password === confirmPassword) {
            try {
                const response = await fetch(THEHAPPYCAVE_AUTH_ENDPOINT, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Server responded with an error");
                }

                const data = await response.json();
                console.error("User created:", data);
                alert("User created successfully");
                navigation.navigate("Home");
            } catch (error) {
                console.error("Error during signup: ", error.message);
            }
        } else {
            alert("Please check: Name, Email, Password and Confirmed Password");
        }
    };

    return (
        <View style={{ height: "100%", width: "100%" }}>
            <StatusBar style="light" />
            <Image
                source={BackgroundImage}
                resizeMode="cover"
                style={{ height: "100%", width: "100%", position: "absolute" }}
            />

            <HelloUserCard userName={userName} />

            {/* title */}
            <View style={{ marginTop: hp(10), marginBottom: 25 }}>
                <HeaderPanel />
            </View>
            <View style={{ alignItems: "center", marginBottom: hp(20) }}>
                {/* Sign Up Title */}
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ ...AuthTitleStyle, ...TextGlowingEffect }}>
                        Sign up
                    </Text>
                </View>

                {/* Name Input */}
                <View style={{ ...AuthFormFormat }}>
                    <TextInput
                        placeholder="Name"
                        placeholderTextColor={"grey"}
                        style={{ height: "100%" }}
                        value={name}
                        onChangeText={(value) => setName(value)}
                    />
                </View>

                {/* Email */}
                <View style={{ ...AuthFormFormat }}>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor={"grey"}
                        style={{ height: "100%" }}
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                    />
                </View>

                {/* Password Input */}
                <View style={{ ...AuthFormFormat }}>
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor={"grey"}
                        secureTextEntry
                        style={{ height: "100%" }}
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                    />
                </View>

                {/* Confirm password */}
                <View style={{ ...AuthFormFormat }}>
                    <TextInput
                        placeholder="Confirm password"
                        placeholderTextColor={"grey"}
                        secureTextEntry
                        style={{ height: "100%" }}
                        value={confirmPassword}
                        onChangeText={(value) => setConfirmPassword(value)}
                    />
                </View>

                {/* Sign Up Button */}
                <TouchableOpacity
                    onPress={handleSignup}
                    style={{ ...AuthButtonStyle }}
                >
                    <Text
                        style={{
                            fontFamily: fontFamilyStyle,
                            fontSize: 20,
                            color: "white",
                            ...TextGlowingEffect,
                        }}
                    >
                        tap to sign up
                    </Text>
                </TouchableOpacity>
            </View>

            <View
                style={{
                    position: "absolute",
                    bottom: 25,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <View
                    style={{
                        flex: 1,
                        marginLeft: 20,
                    }}
                >
                    <ExitButton text={"Exit"} />
                </View>

                <View
                    style={{
                        marginRight: 20,
                    }}
                >
                    <HomeButton />
                </View>
            </View>
        </View>
    );
}
