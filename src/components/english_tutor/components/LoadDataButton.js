import { View, Text, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { AuthButton1Style } from "../../../styles/Styles";

const buttonGradient = ["#0b3866", "#4b749f"];

export default function LoadDataButton({ handleFetchData, text }) {
    return (
        <View>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={buttonGradient}
                style={{ ...AuthButton1Style }}
            >
                <Pressable
                    onPress={() => {
                        handleFetchData();
                    }}
                    style={({ pressed }) => ({
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        opacity: pressed ? 0.5 : 1,
                    })}
                >
                    <Text
                        style={{
                            marginRight: 10,
                            color: "white",
                        }}
                    >
                        {text}
                    </Text>

                    <FontAwesome
                        name="cloud-download"
                        size={24}
                        color="white"
                    />
                </Pressable>
            </LinearGradient>
        </View>
    );
}
