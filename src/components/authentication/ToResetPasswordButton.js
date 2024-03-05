import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import {
    AuthButtonStyle,
    TextGlowingEffect,
    fontFamilyStyle,
} from "../../styles/Styles";

export default function ToResetPasswordButton({ text }) {
    const navigation = useNavigation();

    return (
        <View
            style={{
                alignItems: "center",
            }}
        >
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("ResetPassword");
                }}
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
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
