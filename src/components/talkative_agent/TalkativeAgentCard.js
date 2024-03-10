import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import ServiceImage from "../../../assets/talkative_agent/TalkativeAgent.png";
import { ServiceCardLayoutStyle, ServiceImageStyle } from "../../styles/Styles";
import { TextStyles } from "../../styles/FontStyles";

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
                            <Text style={TextStyles.ServiceTitle}>
                                Mr. Guffawlius
                            </Text>
                            <Text style={TextStyles.ServiceSubtitle}>
                                Your hilarious friend
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
}
