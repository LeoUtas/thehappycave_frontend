import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StatusBar,
} from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import LinearGradient from "react-native-linear-gradient";

import HeaderPanel from "../../screens/HeaderPanel";
import ToResetPasswordButton from "./ToResetPasswordButton";

import {
    AuthFormFormat,
    AuthButtonStyle,
    TextGlowingEffect,
    AuthTitleStyle,
} from "../../styles/Styles";

export default function Signin() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const handleSignin = async () => {
        if (email && password) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                console.log("error when signing in: ", error.message);
            }
        } else {
            alert("It is required to enter email & password");
        }
    };

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
            }}
        >
            <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                colors={["#5612d6", "#61cef2", "#392d69", "#074170"]}
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                }}
            ></LinearGradient>
            <StatusBar style="light" />

            {/* title */}
            <View style={{ marginTop: hp(15) }}>
                <HeaderPanel />
            </View>

            {/* Sign In Text */}
            <View style={{ marginTop: hp(8), marginBottom: 20 }}>
                <Text style={{ ...AuthTitleStyle, ...TextGlowingEffect }}>
                    Sign in
                </Text>
            </View>

            {/* Email Input */}
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
                    onChangeText={(value) => setPassword(value)}
                    value={password}
                />
            </View>

            {/* Sign In & Reset Password Buttons */}
            <TouchableOpacity
                onPress={handleSignin}
                style={{ ...AuthButtonStyle, marginTop: 10 }}
            >
                <Text
                    style={{
                        fontFamily: "Fuzzy Bubbles Bold",
                        fontSize: 20,
                        color: "white",
                        ...TextGlowingEffect,
                    }}
                >
                    tap to sign in
                </Text>
            </TouchableOpacity>

            <View
                style={{
                    marginVertical: 10,
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        fontFamily: "Fuzzy Bubbles Bold",
                        fontSize: 16,
                        color: "white",
                        ...TextGlowingEffect,
                    }}
                >
                    or
                </Text>
            </View>
            <ToResetPasswordButton text={"go to reset password"} />
        </View>
    );
}
