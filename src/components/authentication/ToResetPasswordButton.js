import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { AuthButtonStyle } from "../../styles/Styles";
import { TextStyles } from "../../styles/FontStyles";

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
                <Text style={TextStyles.AuthTextButton}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
}
