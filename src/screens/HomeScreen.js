import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, Image } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import EnglishTutorCard from "../components/english_tutor/EnglishTutorCard";
import TalkativeAgentCard from "../components/talkative_agent/TalkativeAgentCard";
import BackgroundImage from "../../assets/homeImage.png";
import ExitButton from "../components/english_tutor/components/ExitButton";
import { auth } from "../../Firebase/firebase";
import ToSignupButton from "../components/authentication/ToSignupButton";
import { TextGlowingEffect } from "../styles/Styles";
import ToUpdatePasswordButton from "../components/authentication/ToUpdatePasswordButton";
import { REACT_APP_ADMIN_EMAIL } from "@env";

const ADMIN_EMAIL = REACT_APP_ADMIN_EMAIL;

export default function HomeScreen() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        setUserName(auth.currentUser.displayName);
        setUserEmail(auth.currentUser.email);
    }, []);

    ADMIN_EMAIL;

    return (
        <View style={{ height: "100%", width: "100%" }}>
            <StatusBar style="light" />
            <Image
                source={BackgroundImage}
                resizeMode="cover"
                style={{ height: "100%", width: "100%", position: "absolute" }}
            />

            <Text
                style={{
                    fontFamily: "Fuzzy Bubbles Regular",
                    fontSize: 14,
                    color: "white",
                    paddingTop: hp(6),
                    textAlign: "right",
                    marginRight: wp(15),
                    ...TextGlowingEffect,
                }}
            >
                Hello{" "}
                <Text
                    style={{
                        fontFamily: "Fuzzy Bubbles Bold",
                        fontSize: 16,
                        color: "white",
                        paddingTop: hp(6),
                        textAlign: "right",
                        marginRight: wp(15),
                        ...TextGlowingEffect,
                    }}
                >
                    {userName}
                </Text>
            </Text>

            <Text
                style={{
                    fontFamily: "Fuzzy Bubbles Bold",
                    fontSize: 36,
                    paddingTop: hp(10),
                    paddingBottom: 20,
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

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: hp(36),
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
                    <ExitButton text={"Log off"} />
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
