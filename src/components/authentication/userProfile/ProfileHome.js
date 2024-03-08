import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, Image, Pressable } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import EnglishtutorProfileCard from "./EnglishtutorProfileCard";
import TalkativeAgentProfileCard from "./TalkativeAgentProfileCard";
import RandomDiceProfileCard from "./RandomDiceProfileCard";
import BackgroundImage from "../../../../assets/profileHomeImage.png";
import Avatar from "../../../../assets/icon.png";
import { auth } from "../../../../Firebase/firebase";
import { TextGlowingEffect, fontFamilyStyle } from "../../../styles/Styles";
import HomeButton from "../HomeButton";
import HelloUserCard from "../HelloUserCard";

export default function ProfileHome() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        setUserName(auth.currentUser.displayName);
        setUserEmail(auth.currentUser.email);
    }, []);

    return (
        <View style={{ height: "100%", width: "100%" }}>
            <StatusBar style="light" />
            <Image
                source={BackgroundImage}
                resizeMode="cover"
                style={{ height: "100%", width: "100%", position: "absolute" }}
            />

            <HelloUserCard userName={userName} />
            <Image
                source={Avatar}
                style={{
                    height: hp(8),
                    width: hp(8),
                    marginTop: 5,
                    alignSelf: "flex-end",
                    marginRight: 40,
                }}
            />

            <Text
                style={{
                    fontFamily: fontFamilyStyle,
                    fontSize: 32,
                    paddingTop: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                    ...TextGlowingEffect,
                }}
            >
                {userName}'s room
            </Text>

            <View
                style={{
                    marginTop: hp(6),
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                }}
            >
                <View
                    style={{
                        marginLeft: wp("30%"),
                        marginBottom: 10,
                    }}
                >
                    <EnglishtutorProfileCard />
                </View>
                <View
                    style={{
                        marginRight: wp("15%"),
                    }}
                >
                    <RandomDiceProfileCard />
                </View>

                <View
                    style={{
                        marginLeft: wp("30%"),
                    }}
                >
                    <RandomDiceProfileCard />
                </View>
                <View
                    style={{
                        marginRight: wp("15%"),
                    }}
                >
                    <TalkativeAgentProfileCard />
                </View>
            </View>

            <View
                style={{
                    position: "absolute",
                    bottom: 25,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    left: 0,
                    right: 0,
                }}
            >
                <HomeButton />
            </View>
        </View>
    );
}
