import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

import {
    ProfileDiceCardStyle,
    OpacityRateProfileDiceCardStyle,
} from "../../../styles/Styles";
import { TextStyles } from "../../../styles/FontStyles";

export default function EnglishtutorProfileCard() {
    const opacityRate = OpacityRateProfileDiceCardStyle;
    const navigation = useNavigation();

    return (
        <View
            style={{
                borderColor: "#8364e8",
                ...ProfileDiceCardStyle,
            }}
        >
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[
                    `"rgba(102, 36, 192, ${opacityRate})"`,
                    `"rgba(197, 174, 242, ${opacityRate})"`,
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
                            navigation.navigate("EnglishConversationRecords");
                        }}
                        style={{ paddingHorizontal: 5, paddingVertical: 35 }}
                    >
                        <Text style={TextStyles.ServiceSubtitle}>
                            Records with Ms. PunsAlot
                        </Text>
                    </Pressable>
                </View>
            </LinearGradient>
        </View>
    );
}
