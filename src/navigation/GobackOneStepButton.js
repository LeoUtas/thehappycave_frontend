import React from "react";
import { View, Text, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthButton1Style } from "../styles/Styles";

const buttonGradient = ["#0b3866", "#4b749f"];

export default function GoBackOneStepButton({ text }) {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack(); // Use goBack method to navigate back
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
                    onPress={handleGoBack} // Use handleGoBack to navigate back
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
