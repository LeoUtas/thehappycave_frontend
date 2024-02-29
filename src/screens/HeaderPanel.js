import { View, Text } from "react-native";
import React from "react";

import { TextGlowingEffect } from "../styles/Styles";

export default function HeaderPanel() {
    return (
        <View
            style={{
                alignItems: "center",
            }}
        >
            <Text
                style={{
                    fontFamily: "Fuzzy Bubbles Bold",
                    color: "white",
                    textAlign: "center",
                    fontSize: 22,
                }}
            >
                Welcome to
            </Text>

            <Text
                style={{
                    fontFamily: "Fuzzy Bubbles Bold",
                    fontSize: 36,
                    color: "white",
                    marginTop: 20,
                    ...TextGlowingEffect,
                }}
            >
                The Happy Cave
            </Text>
        </View>
    );
}
