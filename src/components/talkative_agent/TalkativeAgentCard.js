import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import MsPunsAlotImage from "../../../assets/english_translator/MrGoofalicious.png";
import { TextGlowingEffect } from "../../styles/Styles";

export default function TalkativeAgentCard() {
    const navigation = useNavigation(); // to navigate

    return (
        <View style={{ marginLeft: 30, marginRight: 30, marginTop: 0 }}>
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
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                        }}
                    >
                        <Image
                            source={MsPunsAlotImage}
                            style={{
                                height: hp(12),
                                width: hp(12),
                                margin: 0,
                                borderRadius: 25,
                            }}
                        />

                        <View style={{ paddingLeft: 20 }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: "white",
                                    fontFamily: "Fuzzy Bubbles Regular",
                                    ...TextGlowingEffect,
                                }}
                            >
                                Mr. Goofalicious
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    color: "white",
                                    fontFamily: "Fuzzy Bubbles Regular",
                                    ...TextGlowingEffect,
                                }}
                            >
                                Greatest assistant of all time
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
}
