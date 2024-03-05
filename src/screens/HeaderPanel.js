import { View, Text } from "react-native";
import React from "react";

import { TextGlowingEffect, fontFamilyStyle } from "../styles/Styles";

export default function HeaderPanel() {
    return (
        <View
            style={{
                alignItems: "center",
            }}
        >
            <Text
                style={{
                    fontFamily: fontFamilyStyle,
                    fontWeight: "bold",
                    color: "white",
                    textAlign: "center",
                    fontSize: 22,
                }}
            >
                Welcome to
            </Text>

            <Text
                style={{
                    fontFamily: fontFamilyStyle,
                    fontWeight: "bold",
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
