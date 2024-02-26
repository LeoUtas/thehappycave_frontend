import { View } from "react-native";
import React from "react";
import LoadingDots from "react-native-loading-dots";

export default function LoadingDotComponent() {
    return (
        <View
            style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <View style={{ width: 100 }}>
                <LoadingDots dots={5} size={15} />
            </View>
        </View>
    );
}
