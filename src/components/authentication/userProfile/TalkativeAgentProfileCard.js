import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

import {
    TextGlowingEffect,
    ProfileDiceCardStyle,
    OpacityRateProfileDiceCardStyle,
    fontFamilyStyle,
} from "../../../styles/Styles";

export default function TalkativeAgentProfileCard() {
    const navigation = useNavigation(); // to navigate
    const opacityRate = OpacityRateProfileDiceCardStyle;

    return (
        <View
            style={{
                borderColor: "#0f68a9",
                ...ProfileDiceCardStyle,
            }}
        >
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[
                    `"rgba(83, 219, 242, ${opacityRate})"`,
                    `"rgba(98, 122, 247, ${opacityRate})"`,
                    `"rgba(133, 120, 234, ${opacityRate})"`,
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
                    <Pressable
                        onPress={() => {
                            // navigation.navigate("EnglishConversationRecords");
                            console.log(
                                "Memories with Mr. Goodalicious pressed"
                            );
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontFamily: fontFamilyStyle,
                                textAlign: "center",
                                padding: 5,
                                ...TextGlowingEffect,
                            }}
                        >
                            Memories with Mr. Goofalicious
                        </Text>
                    </Pressable>
                </View>
            </LinearGradient>
        </View>
    );
}
