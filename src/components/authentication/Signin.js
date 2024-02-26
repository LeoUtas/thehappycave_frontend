import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";

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
        <View style={{ alignItems: "center" }}>
            {/* Sign In Text */}
            <View style={{ marginBottom: 30 }}>
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

            {/* Sign In Button */}
            <TouchableOpacity
                onPress={handleSignin}
                style={{ ...AuthButtonStyle }}
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
        </View>
    );
}
