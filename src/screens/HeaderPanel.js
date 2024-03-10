import { View, Text } from "react-native";
import React from "react";

import { TextStyles } from "../styles/FontStyles";

export default function HeaderPanel() {
    return (
        <View
            style={{
                alignItems: "center",
            }}
        >
            <Text style={[TextStyles.HeaderPanelSubtitle, { marginTop: 10 }]}>
                Welcome to
            </Text>

            <Text style={[TextStyles.HeaderPanelTitle, { marginTop: 20 }]}>
                The Happy Cave
            </Text>
        </View>
    );
}
