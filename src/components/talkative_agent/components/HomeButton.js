import { View, Text, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const buttonGradient = ["#0b3866", "#4b749f"];

export default function HomeButton() {
    const navigation = useNavigation();

    return (
        <View>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={buttonGradient}
                style={{
                    width: 120,
                    height: 45,
                    borderRadius: 20,
                }}
            >
                <Pressable
                    onPress={() => navigation.navigate("Home")}
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
                        Home
                    </Text>

                    <Ionicons name="home" size={24} color="white" />
                </Pressable>
            </LinearGradient>
        </View>
    );
}
