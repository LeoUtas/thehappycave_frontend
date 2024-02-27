import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import ServiceImage from "../../../assets/english_translator/MrGoofalicious.png";
import { ServiceTitleStyle } from "../../styles/Styles";
import { ServiceSubTitleStyle } from "../../styles/Styles";
import { ServiceImageStyle } from "../../styles/Styles";
import { ServiceCardLayoutStyle } from "../../styles/Styles";

export default function TalkativeAgentCard() {
    const navigation = useNavigation(); // to navigate

    return (
        <View style={{ marginHorizontal: 30, marginTop: 0 }}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#53dbf2", "#627af7", "#8578ea"]}
                style={{ borderRadius: 25 }}
            >
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("TalkativeAgentController")
                    }
                >
                    <View style={{ ...ServiceCardLayoutStyle }}>
                        <Image
                            source={ServiceImage}
                            style={{ ...ServiceImageStyle }}
                        />

                        <View style={{ paddingLeft: 20 }}>
                            <Text style={{ ...ServiceTitleStyle }}>
                                Mr. Goofalicious
                            </Text>
                            <Text style={{ ...ServiceSubTitleStyle }}>
                                Your hilarious friend
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
}
