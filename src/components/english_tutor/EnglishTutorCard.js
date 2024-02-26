import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import MsPunsAlotImage from "../../../assets/english_tutor/MsPunsalot.png";
import { ServiceTitleStyle } from "../../styles/Styles";
import { ServiceSubTitleStyle } from "../../styles/Styles";
import { ServiceImageStyle } from "../../styles/Styles";
import { ServiceCardLayoutStyle } from "../../styles/Styles";

export default function EnglishTutorCard() {
    const navigation = useNavigation(); // to navigate

    return (
        <View style={{ margin: 30, marginTop: 30 }}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#6624c0", "#c5aef2", "#8578ea"]}
                style={{ borderRadius: 25 }}
            >
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("EnglishTutorController")
                    }
                >
                    <View style={{ ...ServiceCardLayoutStyle }}>
                        <Image
                            source={MsPunsAlotImage}
                            style={{ ...ServiceImageStyle }}
                        />

                        <View style={{ paddingLeft: 20 }}>
                            <Text style={{ ...ServiceTitleStyle }}>
                                Ms. PunsAlot
                            </Text>
                            <Text style={{ ...ServiceSubTitleStyle }}>
                                English tutor
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
}
