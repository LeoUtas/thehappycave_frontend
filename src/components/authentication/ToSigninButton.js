import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { AuthButtonStyle, TextGlowingEffect } from "../../styles/Styles";

export default function ToSigninButton({ text }) {
    const navigation = useNavigation();

    return (
        <View
            style={{
                alignItems: "center",
            }}
        >
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Signin");
                }}
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
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
