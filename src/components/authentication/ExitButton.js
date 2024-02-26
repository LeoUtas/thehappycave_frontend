import { View, Text, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";
import { AuthButton1Style } from "../../styles/Styles";

const buttonGradient = ["#0b3866", "#4b749f"];

export default function ExitButton({ text }) {
    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <View>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={buttonGradient}
                style={{ ...AuthButton1Style }}
            >
                <Pressable
                    onPress={handleLogout}
                    style={({ pressed }) => ({
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        opacity: pressed ? 0.5 : 1,
                    })}
                >
                    <Ionicons
                        name="exit"
                        size={28}
                        color="white"
                        style={{
                            transform: [{ scaleX: -1 }],
                        }}
                    />
                    <Text
                        style={{
                            marginLeft: 8,
                            color: "white",
                        }}
                    >
                        {text}
                    </Text>
                </Pressable>
            </LinearGradient>
        </View>
    );
}
