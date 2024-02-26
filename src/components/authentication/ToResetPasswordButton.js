import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { AuthButtonStyle, TextGlowingEffect } from "../../styles/Styles";

export default function ToResetPasswordButton() {
    const navigation = useNavigation();

    return (
        <View
            style={{
                alignItems: "center",
            }}
        >
            <View style={{ marginTop: 10 }}>
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
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("ResetPassword");
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
                    tap to reset password
                </Text>
            </TouchableOpacity>
        </View>
    );
}
