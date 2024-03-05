import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, Image, Pressable } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import EnglishTutorCard from "../components/english_tutor/EnglishTutorCard";
import TalkativeAgentCard from "../components/talkative_agent/TalkativeAgentCard";
import BackgroundImage from "../../assets/homeImage.png";
import ExitButton from "../components/authentication/ExitButton";
import { auth } from "../../Firebase/firebase";
import ToSignupButton from "../components/authentication/ToSignupButton";
import { TextGlowingEffect, fontFamilyStyle } from "../styles/Styles";
import ToUpdatePasswordButton from "../components/authentication/ToUpdatePasswordButton";
import HelloUserCard from "../components/authentication/HelloUserCard";
import { REACT_APP_ADMIN_EMAIL } from "@env";

const ADMIN_EMAIL = REACT_APP_ADMIN_EMAIL;
console.log(fontFamilyStyle);

export default function HomeScreen() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        setUserName(auth.currentUser.displayName);
        setUserEmail(auth.currentUser.email);
    }, []);

    ADMIN_EMAIL;

    const navigation = useNavigation(); // to navigate

    return (
        <View style={{ height: "100%", width: "100%" }}>
            <StatusBar style="light" />
            <Image
                source={BackgroundImage}
                resizeMode="cover"
                style={{ height: "100%", width: "100%", position: "absolute" }}
            />

            <HelloUserCard userName={userName} />

            <Pressable
                onPress={() => {
                    navigation.navigate("Profile");
                }}
            >
                <View
                    style={{
                        flexDirection: "row", // Add flexDirection to align items in a row
                        alignItems: "center", // Align items vertically
                        alignSelf: "flex-end",
                        paddingTop: 10,
                    }}
                >
                    <Ionicons
                        name="return-down-forward-outline"
                        size={24}
                        color="white"
                    />
                    <Text
                        style={{
                            fontFamily: fontFamilyStyle,
                            fontSize: 14,
                            color: "white",
                            paddingHorizontal: 5,
                        }}
                    >
                        to your room
                    </Text>

                    <MaterialIcons
                        name="meeting-room"
                        size={24}
                        color="white"
                    />
                </View>
            </Pressable>

            <Text
                style={{
                    fontFamily: fontFamilyStyle,
                    fontWeight: "bold",
                    fontSize: 36,
                    paddingTop: hp(8),
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                    ...TextGlowingEffect,
                }}
            >
                Common room
            </Text>

            <EnglishTutorCard />
            <TalkativeAgentCard />

            {/* Buttons */}
            <View
                style={{
                    position: "absolute", // Added for absolute positioning
                    bottom: 25, // Distance from bottom of the screen
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 10,
                    marginRight: 10,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ExitButton text={"Exit"} />
                </View>

                {userEmail === ADMIN_EMAIL ? (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <ToSignupButton text={"Signup"} />
                    </View>
                ) : (
                    <View style={{ flex: 1 }} /> // Invisible placeholder
                )}

                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ToUpdatePasswordButton text={"Password"} />
                </View>
            </View>
        </View>
    );
}
