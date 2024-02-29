import { View, Text } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

import { ProfileDiceCardStyle } from "../../../styles/Styles";
import { OpacityRateProfileDiceCardStyle } from "../../../styles/Styles";

export default function RandomDiceProfileCard() {
    const opacityRate = OpacityRateProfileDiceCardStyle;

    return (
        <View
            style={{
                borderColor: "#d4781a",
                ...ProfileDiceCardStyle,
            }}
        >
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[
                    `"rgba(42, 141, 8, ${opacityRate})"`,
                    `"rgba(242, 231, 19, ${opacityRate})"`,
                    `"rgba(102, 36, 192, ${opacityRate})"`,
                ]}
                style={{ flex: 1, borderRadius: 15 }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <AntDesign name="question" size={28} color="white" />
                </View>
            </LinearGradient>
        </View>
    );
}
